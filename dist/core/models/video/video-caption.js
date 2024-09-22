var VideoCaptionModel_1;
import { __decorate, __metadata } from "tslib";
import { buildUUID } from '@peertube/peertube-node-utils';
import { remove } from 'fs-extra/esm';
import { join } from 'path';
import { Op } from 'sequelize';
import { AllowNull, BeforeDestroy, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Is, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { isVideoCaptionLanguageValid } from '../../helpers/custom-validators/video-captions.js';
import { logger } from '../../helpers/logger.js';
import { CONFIG } from '../../initializers/config.js';
import { CONSTRAINTS_FIELDS, LAZY_STATIC_PATHS, VIDEO_LANGUAGES, WEBSERVER } from '../../initializers/constants.js';
import { SequelizeModel, buildWhereIdOrUUID, throwIfNotValid } from '../shared/index.js';
import { VideoModel } from './video.js';
export var ScopeNames;
(function (ScopeNames) {
    ScopeNames["WITH_VIDEO_UUID_AND_REMOTE"] = "WITH_VIDEO_UUID_AND_REMOTE";
})(ScopeNames || (ScopeNames = {}));
let VideoCaptionModel = VideoCaptionModel_1 = class VideoCaptionModel extends SequelizeModel {
    static async removeFiles(instance, options) {
        if (!instance.Video) {
            instance.Video = await instance.$get('Video', { transaction: options.transaction });
        }
        if (instance.isOwned()) {
            logger.info('Removing caption %s.', instance.filename);
            try {
                await instance.removeCaptionFile();
            }
            catch (err) {
                logger.error('Cannot remove caption file %s.', instance.filename);
            }
        }
        return undefined;
    }
    static async insertOrReplaceLanguage(caption, transaction) {
        const existing = await VideoCaptionModel_1.loadByVideoIdAndLanguage(caption.videoId, caption.language, transaction);
        if (existing)
            await existing.destroy({ transaction });
        return caption.save({ transaction });
    }
    static loadByVideoIdAndLanguage(videoId, language, transaction) {
        const videoInclude = {
            model: VideoModel.unscoped(),
            attributes: ['id', 'name', 'remote', 'uuid', 'url'],
            where: buildWhereIdOrUUID(videoId)
        };
        const query = {
            where: {
                language
            },
            include: [
                videoInclude
            ],
            transaction
        };
        return VideoCaptionModel_1.findOne(query);
    }
    static loadWithVideoByFilename(filename) {
        const query = {
            where: {
                filename
            },
            include: [
                {
                    model: VideoModel.unscoped(),
                    attributes: ['id', 'remote', 'uuid']
                }
            ]
        };
        return VideoCaptionModel_1.findOne(query);
    }
    static async hasVideoCaption(videoId) {
        const query = {
            where: {
                videoId
            }
        };
        const result = await VideoCaptionModel_1.unscoped().findOne(query);
        return !!result;
    }
    static listVideoCaptions(videoId, transaction) {
        const query = {
            order: [['language', 'ASC']],
            where: {
                videoId
            },
            transaction
        };
        return VideoCaptionModel_1.scope(ScopeNames.WITH_VIDEO_UUID_AND_REMOTE).findAll(query);
    }
    static async listCaptionsOfMultipleVideos(videoIds, transaction) {
        const query = {
            order: [['language', 'ASC']],
            where: {
                videoId: {
                    [Op.in]: videoIds
                }
            },
            transaction
        };
        const captions = await VideoCaptionModel_1.scope(ScopeNames.WITH_VIDEO_UUID_AND_REMOTE).findAll(query);
        const result = {};
        for (const id of videoIds) {
            result[id] = [];
        }
        for (const caption of captions) {
            result[caption.videoId].push(caption);
        }
        return result;
    }
    static getLanguageLabel(language) {
        return VIDEO_LANGUAGES[language] || 'Unknown';
    }
    static generateCaptionName(language) {
        return `${buildUUID()}-${language}.vtt`;
    }
    toFormattedJSON() {
        return {
            language: {
                id: this.language,
                label: VideoCaptionModel_1.getLanguageLabel(this.language)
            },
            automaticallyGenerated: this.automaticallyGenerated,
            captionPath: this.getCaptionStaticPath(),
            updatedAt: this.updatedAt.toISOString()
        };
    }
    toActivityPubObject(video) {
        return {
            identifier: this.language,
            name: VideoCaptionModel_1.getLanguageLabel(this.language),
            automaticallyGenerated: this.automaticallyGenerated,
            url: this.getFileUrl(video)
        };
    }
    isOwned() {
        return this.Video.remote === false;
    }
    getCaptionStaticPath() {
        return join(LAZY_STATIC_PATHS.VIDEO_CAPTIONS, this.filename);
    }
    getFSPath() {
        return join(CONFIG.STORAGE.CAPTIONS_DIR, this.filename);
    }
    removeCaptionFile() {
        return remove(this.getFSPath());
    }
    getFileUrl(video) {
        if (video.isOwned())
            return WEBSERVER.URL + this.getCaptionStaticPath();
        return this.fileUrl;
    }
    isEqual(other) {
        if (this.fileUrl)
            return this.fileUrl === other.fileUrl;
        return this.filename === other.filename;
    }
};
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], VideoCaptionModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], VideoCaptionModel.prototype, "updatedAt", void 0);
__decorate([
    AllowNull(false),
    Is('VideoCaptionLanguage', value => throwIfNotValid(value, isVideoCaptionLanguageValid, 'language')),
    Column,
    __metadata("design:type", String)
], VideoCaptionModel.prototype, "language", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", String)
], VideoCaptionModel.prototype, "filename", void 0);
__decorate([
    AllowNull(true),
    Column(DataType.STRING(CONSTRAINTS_FIELDS.COMMONS.URL.max)),
    __metadata("design:type", String)
], VideoCaptionModel.prototype, "fileUrl", void 0);
__decorate([
    AllowNull(false),
    Column,
    __metadata("design:type", Boolean)
], VideoCaptionModel.prototype, "automaticallyGenerated", void 0);
__decorate([
    ForeignKey(() => VideoModel),
    Column,
    __metadata("design:type", Number)
], VideoCaptionModel.prototype, "videoId", void 0);
__decorate([
    BelongsTo(() => VideoModel, {
        foreignKey: {
            allowNull: false
        },
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], VideoCaptionModel.prototype, "Video", void 0);
__decorate([
    BeforeDestroy,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VideoCaptionModel, Object]),
    __metadata("design:returntype", Promise)
], VideoCaptionModel, "removeFiles", null);
VideoCaptionModel = VideoCaptionModel_1 = __decorate([
    Scopes(() => ({
        [ScopeNames.WITH_VIDEO_UUID_AND_REMOTE]: {
            include: [
                {
                    attributes: ['id', 'uuid', 'remote'],
                    model: VideoModel.unscoped(),
                    required: true
                }
            ]
        }
    })),
    Table({
        tableName: 'videoCaption',
        indexes: [
            {
                fields: ['filename'],
                unique: true
            },
            {
                fields: ['videoId']
            },
            {
                fields: ['videoId', 'language'],
                unique: true
            }
        ]
    })
], VideoCaptionModel);
export { VideoCaptionModel };
//# sourceMappingURL=video-caption.js.map