var VideoRedundancyModel_1;
import { __decorate, __metadata } from "tslib";
import { VideoPrivacy } from '@peertube/peertube-models';
import { isTestInstance } from '@peertube/peertube-node-utils';
import { getVideoFileMimeType } from '../../lib/video-file.js';
import { getServerActor } from '../application/application.js';
import sample from 'lodash-es/sample.js';
import { literal, Op, QueryTypes } from 'sequelize';
import { AllowNull, BeforeDestroy, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Is, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { isActivityPubUrlValid } from '../../helpers/custom-validators/activitypub/misc.js';
import { logger } from '../../helpers/logger.js';
import { CONFIG } from '../../initializers/config.js';
import { CONSTRAINTS_FIELDS } from '../../initializers/constants.js';
import { ActorModel } from '../actor/actor.js';
import { ServerModel } from '../server/server.js';
import { getSort, getVideoSort, parseAggregateResult, SequelizeModel, throwIfNotValid } from '../shared/index.js';
import { ScheduleVideoUpdateModel } from '../video/schedule-video-update.js';
import { VideoChannelModel } from '../video/video-channel.js';
import { VideoFileModel } from '../video/video-file.js';
import { VideoStreamingPlaylistModel } from '../video/video-streaming-playlist.js';
import { VideoModel } from '../video/video.js';
export var ScopeNames;
(function (ScopeNames) {
    ScopeNames["WITH_VIDEO"] = "WITH_VIDEO";
})(ScopeNames || (ScopeNames = {}));
let VideoRedundancyModel = VideoRedundancyModel_1 = class VideoRedundancyModel extends SequelizeModel {
    static async removeFile(instance) {
        if (!instance.isOwned())
            return;
        if (instance.videoFileId) {
            const videoFile = await VideoFileModel.loadWithVideo(instance.videoFileId);
            const logIdentifier = `${videoFile.Video.uuid}-${videoFile.resolution}`;
            logger.info('Removing duplicated video file %s.', logIdentifier);
            videoFile.Video.removeWebVideoFile(videoFile, true)
                .catch(err => logger.error('Cannot delete %s files.', logIdentifier, { err }));
        }
        if (instance.videoStreamingPlaylistId) {
            const videoStreamingPlaylist = await VideoStreamingPlaylistModel.loadWithVideo(instance.videoStreamingPlaylistId);
            const videoUUID = videoStreamingPlaylist.Video.uuid;
            logger.info('Removing duplicated video streaming playlist %s.', videoUUID);
            videoStreamingPlaylist.Video.removeStreamingPlaylistFiles(videoStreamingPlaylist, true)
                .catch(err => logger.error('Cannot delete video streaming playlist files of %s.', videoUUID, { err }));
        }
        return undefined;
    }
    static async loadLocalByFileId(videoFileId) {
        const actor = await getServerActor();
        const query = {
            where: {
                actorId: actor.id,
                videoFileId
            }
        };
        return VideoRedundancyModel_1.scope(ScopeNames.WITH_VIDEO).findOne(query);
    }
    static async listLocalByVideoId(videoId) {
        const actor = await getServerActor();
        const queryStreamingPlaylist = {
            where: {
                actorId: actor.id
            },
            include: [
                {
                    model: VideoStreamingPlaylistModel.unscoped(),
                    required: true,
                    include: [
                        {
                            model: VideoModel.unscoped(),
                            required: true,
                            where: {
                                id: videoId
                            }
                        }
                    ]
                }
            ]
        };
        const queryFiles = {
            where: {
                actorId: actor.id
            },
            include: [
                {
                    model: VideoFileModel,
                    required: true,
                    include: [
                        {
                            model: VideoModel,
                            required: true,
                            where: {
                                id: videoId
                            }
                        }
                    ]
                }
            ]
        };
        return Promise.all([
            VideoRedundancyModel_1.findAll(queryStreamingPlaylist),
            VideoRedundancyModel_1.findAll(queryFiles)
        ]).then(([r1, r2]) => r1.concat(r2));
    }
    static async loadLocalByStreamingPlaylistId(videoStreamingPlaylistId) {
        const actor = await getServerActor();
        const query = {
            where: {
                actorId: actor.id,
                videoStreamingPlaylistId
            }
        };
        return VideoRedundancyModel_1.scope(ScopeNames.WITH_VIDEO).findOne(query);
    }
    static loadByIdWithVideo(id, transaction) {
        const query = {
            where: { id },
            transaction
        };
        return VideoRedundancyModel_1.scope(ScopeNames.WITH_VIDEO).findOne(query);
    }
    static loadByUrl(url, transaction) {
        const query = {
            where: {
                url
            },
            transaction
        };
        return VideoRedundancyModel_1.findOne(query);
    }
    static async isLocalByVideoUUIDExists(uuid) {
        const actor = await getServerActor();
        const query = {
            raw: true,
            attributes: ['id'],
            where: {
                actorId: actor.id
            },
            include: [
                {
                    attributes: [],
                    model: VideoFileModel,
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: VideoModel,
                            required: true,
                            where: {
                                uuid
                            }
                        }
                    ]
                }
            ]
        };
        return VideoRedundancyModel_1.findOne(query)
            .then(r => !!r);
    }
    static async getVideoSample(p) {
        const rows = await p;
        if (rows.length === 0)
            return undefined;
        const ids = rows.map(r => r.id);
        const id = sample(ids);
        return VideoModel.loadWithFiles(id, undefined, !isTestInstance());
    }
    static async findMostViewToDuplicate(randomizedFactor) {
        const peertubeActor = await getServerActor();
        const query = {
            attributes: ['id', 'views'],
            limit: randomizedFactor,
            order: getVideoSort('-views'),
            where: Object.assign({ privacy: VideoPrivacy.PUBLIC, isLive: false }, this.buildVideoIdsForDuplication(peertubeActor)),
            include: [
                VideoRedundancyModel_1.buildServerRedundancyInclude()
            ]
        };
        return VideoRedundancyModel_1.getVideoSample(VideoModel.unscoped().findAll(query));
    }
    static async findTrendingToDuplicate(randomizedFactor) {
        const peertubeActor = await getServerActor();
        const query = {
            attributes: ['id', 'views'],
            subQuery: false,
            group: 'VideoModel.id',
            limit: randomizedFactor,
            order: getVideoSort('-trending'),
            where: Object.assign({ privacy: VideoPrivacy.PUBLIC, isLive: false }, this.buildVideoIdsForDuplication(peertubeActor)),
            include: [
                VideoRedundancyModel_1.buildServerRedundancyInclude(),
                VideoModel.buildTrendingQuery(CONFIG.TRENDING.VIDEOS.INTERVAL_DAYS)
            ]
        };
        return VideoRedundancyModel_1.getVideoSample(VideoModel.unscoped().findAll(query));
    }
    static async findRecentlyAddedToDuplicate(randomizedFactor, minViews) {
        const peertubeActor = await getServerActor();
        const query = {
            attributes: ['id', 'publishedAt'],
            limit: randomizedFactor,
            order: getVideoSort('-publishedAt'),
            where: Object.assign({ privacy: VideoPrivacy.PUBLIC, isLive: false, views: {
                    [Op.gte]: minViews
                } }, this.buildVideoIdsForDuplication(peertubeActor)),
            include: [
                VideoRedundancyModel_1.buildServerRedundancyInclude(),
                {
                    model: ScheduleVideoUpdateModel.unscoped(),
                    required: false
                }
            ]
        };
        return VideoRedundancyModel_1.getVideoSample(VideoModel.unscoped().findAll(query));
    }
    static async loadOldestLocalExpired(strategy, expiresAfterMs) {
        const expiredDate = new Date();
        expiredDate.setMilliseconds(expiredDate.getMilliseconds() - expiresAfterMs);
        const actor = await getServerActor();
        const query = {
            where: {
                actorId: actor.id,
                strategy,
                createdAt: {
                    [Op.lt]: expiredDate
                }
            }
        };
        return VideoRedundancyModel_1.scope([ScopeNames.WITH_VIDEO]).findOne(query);
    }
    static async listLocalExpired() {
        const actor = await getServerActor();
        const query = {
            where: {
                actorId: actor.id,
                expiresOn: {
                    [Op.lt]: new Date()
                }
            }
        };
        return VideoRedundancyModel_1.scope([ScopeNames.WITH_VIDEO]).findAll(query);
    }
    static async listRemoteExpired() {
        const actor = await getServerActor();
        const query = {
            where: {
                actorId: {
                    [Op.ne]: actor.id
                },
                expiresOn: {
                    [Op.lt]: new Date(),
                    [Op.ne]: null
                }
            }
        };
        return VideoRedundancyModel_1.scope([ScopeNames.WITH_VIDEO]).findAll(query);
    }
    static async listLocalOfServer(serverId) {
        const actor = await getServerActor();
        const buildVideoInclude = () => ({
            model: VideoModel,
            required: true,
            include: [
                {
                    attributes: [],
                    model: VideoChannelModel.unscoped(),
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: ActorModel.unscoped(),
                            required: true,
                            where: {
                                serverId
                            }
                        }
                    ]
                }
            ]
        });
        const query = {
            where: {
                [Op.and]: [
                    {
                        actorId: actor.id
                    },
                    {
                        [Op.or]: [
                            {
                                '$VideoStreamingPlaylist.id$': {
                                    [Op.ne]: null
                                }
                            },
                            {
                                '$VideoFile.id$': {
                                    [Op.ne]: null
                                }
                            }
                        ]
                    }
                ]
            },
            include: [
                {
                    model: VideoFileModel.unscoped(),
                    required: false,
                    include: [buildVideoInclude()]
                },
                {
                    model: VideoStreamingPlaylistModel.unscoped(),
                    required: false,
                    include: [buildVideoInclude()]
                }
            ]
        };
        return VideoRedundancyModel_1.findAll(query);
    }
    static listForApi(options) {
        const { start, count, sort, target, strategy } = options;
        const redundancyWhere = {};
        const videosWhere = {};
        let redundancySqlSuffix = '';
        if (target === 'my-videos') {
            Object.assign(videosWhere, { remote: false });
        }
        else if (target === 'remote-videos') {
            Object.assign(videosWhere, { remote: true });
            Object.assign(redundancyWhere, { strategy: { [Op.ne]: null } });
            redundancySqlSuffix = ' AND "videoRedundancy"."strategy" IS NOT NULL';
        }
        if (strategy) {
            Object.assign(redundancyWhere, { strategy });
        }
        const videoFilterWhere = {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            id: {
                                [Op.in]: literal('(' +
                                    'SELECT "videoId" FROM "videoFile" ' +
                                    'INNER JOIN "videoRedundancy" ON "videoRedundancy"."videoFileId" = "videoFile".id' +
                                    redundancySqlSuffix +
                                    ')')
                            }
                        },
                        {
                            id: {
                                [Op.in]: literal('(' +
                                    'select "videoId" FROM "videoStreamingPlaylist" ' +
                                    'INNER JOIN "videoRedundancy" ON "videoRedundancy"."videoStreamingPlaylistId" = "videoStreamingPlaylist".id' +
                                    redundancySqlSuffix +
                                    ')')
                            }
                        }
                    ]
                },
                videosWhere
            ]
        };
        const findOptions = {
            offset: start,
            limit: count,
            order: getSort(sort),
            include: [
                {
                    required: false,
                    model: VideoFileModel,
                    include: [
                        {
                            model: VideoRedundancyModel_1.unscoped(),
                            required: false,
                            where: redundancyWhere
                        }
                    ]
                },
                {
                    required: false,
                    model: VideoStreamingPlaylistModel.unscoped(),
                    include: [
                        {
                            model: VideoRedundancyModel_1.unscoped(),
                            required: false,
                            where: redundancyWhere
                        },
                        {
                            model: VideoFileModel,
                            required: false
                        }
                    ]
                }
            ],
            where: videoFilterWhere
        };
        const countOptions = {
            where: videoFilterWhere
        };
        return Promise.all([
            VideoModel.findAll(findOptions),
            VideoModel.count(countOptions)
        ]).then(([data, total]) => ({ total, data }));
    }
    static async getStats(strategy) {
        const actor = await getServerActor();
        const sql = `WITH "tmp" AS ` +
            `(` +
            `SELECT "videoFile"."size" AS "videoFileSize", "videoStreamingFile"."size" AS "videoStreamingFileSize", ` +
            `"videoFile"."videoId" AS "videoFileVideoId", "videoStreamingPlaylist"."videoId" AS "videoStreamingVideoId"` +
            `FROM "videoRedundancy" AS "videoRedundancy" ` +
            `LEFT JOIN "videoFile" AS "videoFile" ON "videoRedundancy"."videoFileId" = "videoFile"."id" ` +
            `LEFT JOIN "videoStreamingPlaylist" ON "videoRedundancy"."videoStreamingPlaylistId" = "videoStreamingPlaylist"."id" ` +
            `LEFT JOIN "videoFile" AS "videoStreamingFile" ` +
            `ON "videoStreamingPlaylist"."id" = "videoStreamingFile"."videoStreamingPlaylistId" ` +
            `WHERE "videoRedundancy"."strategy" = :strategy AND "videoRedundancy"."actorId" = :actorId` +
            `), ` +
            `"videoIds" AS (` +
            `SELECT "videoFileVideoId" AS "videoId" FROM "tmp" ` +
            `UNION SELECT "videoStreamingVideoId" AS "videoId" FROM "tmp" ` +
            `) ` +
            `SELECT ` +
            `COALESCE(SUM("videoFileSize"), '0') + COALESCE(SUM("videoStreamingFileSize"), '0') AS "totalUsed", ` +
            `(SELECT COUNT("videoIds"."videoId") FROM "videoIds") AS "totalVideos", ` +
            `COUNT(*) AS "totalVideoFiles" ` +
            `FROM "tmp"`;
        return VideoRedundancyModel_1.sequelize.query(sql, {
            replacements: { strategy, actorId: actor.id },
            type: QueryTypes.SELECT
        }).then(([row]) => ({
            totalUsed: parseAggregateResult(row.totalUsed),
            totalVideos: row.totalVideos,
            totalVideoFiles: row.totalVideoFiles
        }));
    }
    static toFormattedJSONStatic(video) {
        const filesRedundancies = [];
        const streamingPlaylistsRedundancies = [];
        for (const file of video.VideoFiles) {
            for (const redundancy of file.RedundancyVideos) {
                filesRedundancies.push({
                    id: redundancy.id,
                    fileUrl: redundancy.fileUrl,
                    strategy: redundancy.strategy,
                    createdAt: redundancy.createdAt,
                    updatedAt: redundancy.updatedAt,
                    expiresOn: redundancy.expiresOn,
                    size: file.size
                });
            }
        }
        for (const playlist of video.VideoStreamingPlaylists) {
            const size = playlist.VideoFiles.reduce((a, b) => a + b.size, 0);
            for (const redundancy of playlist.RedundancyVideos) {
                streamingPlaylistsRedundancies.push({
                    id: redundancy.id,
                    fileUrl: redundancy.fileUrl,
                    strategy: redundancy.strategy,
                    createdAt: redundancy.createdAt,
                    updatedAt: redundancy.updatedAt,
                    expiresOn: redundancy.expiresOn,
                    size
                });
            }
        }
        return {
            id: video.id,
            name: video.name,
            url: video.url,
            uuid: video.uuid,
            redundancies: {
                files: filesRedundancies,
                streamingPlaylists: streamingPlaylistsRedundancies
            }
        };
    }
    getVideo() {
        var _a, _b;
        if ((_a = this.VideoFile) === null || _a === void 0 ? void 0 : _a.Video)
            return this.VideoFile.Video;
        if ((_b = this.VideoStreamingPlaylist) === null || _b === void 0 ? void 0 : _b.Video)
            return this.VideoStreamingPlaylist.Video;
        return undefined;
    }
    getVideoUUID() {
        const video = this.getVideo();
        if (!video)
            return undefined;
        return video.uuid;
    }
    isOwned() {
        return !!this.strategy;
    }
    toActivityPubObject() {
        if (this.VideoStreamingPlaylist) {
            return {
                id: this.url,
                type: 'CacheFile',
                object: this.VideoStreamingPlaylist.Video.url,
                expires: this.expiresOn ? this.expiresOn.toISOString() : null,
                url: {
                    type: 'Link',
                    mediaType: 'application/x-mpegURL',
                    href: this.fileUrl
                }
            };
        }
        return {
            id: this.url,
            type: 'CacheFile',
            object: this.VideoFile.Video.url,
            expires: this.expiresOn
                ? this.expiresOn.toISOString()
                : null,
            url: {
                type: 'Link',
                mediaType: getVideoFileMimeType(this.VideoFile.extname, this.VideoFile.isAudio()),
                href: this.fileUrl,
                height: this.VideoFile.resolution,
                size: this.VideoFile.size,
                fps: this.VideoFile.fps
            }
        };
    }
    static buildVideoIdsForDuplication(peertubeActor) {
        const notIn = literal('(' +
            `SELECT "videoFile"."videoId" AS "videoId" FROM "videoRedundancy" ` +
            `INNER JOIN "videoFile" ON "videoFile"."id" = "videoRedundancy"."videoFileId" ` +
            `WHERE "videoRedundancy"."actorId" = ${peertubeActor.id} ` +
            `UNION ` +
            `SELECT "videoStreamingPlaylist"."videoId" AS "videoId" FROM "videoRedundancy" ` +
            `INNER JOIN "videoStreamingPlaylist" ON "videoStreamingPlaylist"."id" = "videoRedundancy"."videoStreamingPlaylistId" ` +
            `WHERE "videoRedundancy"."actorId" = ${peertubeActor.id} ` +
            ')');
        return {
            id: {
                [Op.notIn]: notIn
            }
        };
    }
    static buildServerRedundancyInclude() {
        return {
            attributes: [],
            model: VideoChannelModel.unscoped(),
            required: true,
            include: [
                {
                    attributes: [],
                    model: ActorModel.unscoped(),
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: ServerModel.unscoped(),
                            required: true,
                            where: {
                                redundancyAllowed: true
                            }
                        }
                    ]
                }
            ]
        };
    }
};
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], VideoRedundancyModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], VideoRedundancyModel.prototype, "updatedAt", void 0);
__decorate([
    AllowNull(true),
    Column,
    __metadata("design:type", Date)
], VideoRedundancyModel.prototype, "expiresOn", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.STRING(CONSTRAINTS_FIELDS.VIDEOS_REDUNDANCY.URL.max)),
    __metadata("design:type", String)
], VideoRedundancyModel.prototype, "fileUrl", void 0);
__decorate([
    AllowNull(false),
    Is('VideoRedundancyUrl', value => throwIfNotValid(value, isActivityPubUrlValid, 'url')),
    Column(DataType.STRING(CONSTRAINTS_FIELDS.VIDEOS_REDUNDANCY.URL.max)),
    __metadata("design:type", String)
], VideoRedundancyModel.prototype, "url", void 0);
__decorate([
    AllowNull(true),
    Column,
    __metadata("design:type", String)
], VideoRedundancyModel.prototype, "strategy", void 0);
__decorate([
    ForeignKey(() => VideoFileModel),
    Column,
    __metadata("design:type", Number)
], VideoRedundancyModel.prototype, "videoFileId", void 0);
__decorate([
    BelongsTo(() => VideoFileModel, {
        foreignKey: {
            allowNull: true
        },
        onDelete: 'cascade'
    }),
    __metadata("design:type", Object)
], VideoRedundancyModel.prototype, "VideoFile", void 0);
__decorate([
    ForeignKey(() => VideoStreamingPlaylistModel),
    Column,
    __metadata("design:type", Number)
], VideoRedundancyModel.prototype, "videoStreamingPlaylistId", void 0);
__decorate([
    BelongsTo(() => VideoStreamingPlaylistModel, {
        foreignKey: {
            allowNull: true
        },
        onDelete: 'cascade'
    }),
    __metadata("design:type", Object)
], VideoRedundancyModel.prototype, "VideoStreamingPlaylist", void 0);
__decorate([
    ForeignKey(() => ActorModel),
    Column,
    __metadata("design:type", Number)
], VideoRedundancyModel.prototype, "actorId", void 0);
__decorate([
    BelongsTo(() => ActorModel, {
        foreignKey: {
            allowNull: false
        },
        onDelete: 'cascade'
    }),
    __metadata("design:type", Object)
], VideoRedundancyModel.prototype, "Actor", void 0);
__decorate([
    BeforeDestroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VideoRedundancyModel]),
    __metadata("design:returntype", Promise)
], VideoRedundancyModel, "removeFile", null);
VideoRedundancyModel = VideoRedundancyModel_1 = __decorate([
    Scopes(() => ({
        [ScopeNames.WITH_VIDEO]: {
            include: [
                {
                    model: VideoFileModel,
                    required: false,
                    include: [
                        {
                            model: VideoModel,
                            required: true
                        }
                    ]
                },
                {
                    model: VideoStreamingPlaylistModel,
                    required: false,
                    include: [
                        {
                            model: VideoModel,
                            required: true
                        }
                    ]
                }
            ]
        }
    })),
    Table({
        tableName: 'videoRedundancy',
        indexes: [
            {
                fields: ['videoFileId']
            },
            {
                fields: ['actorId']
            },
            {
                fields: ['expiresOn']
            },
            {
                fields: ['url'],
                unique: true
            }
        ]
    })
], VideoRedundancyModel);
export { VideoRedundancyModel };
//# sourceMappingURL=video-redundancy.js.map