import { readdir } from 'fs/promises';
import { join } from 'path';
import { omit, wait } from '@peertube/peertube-core-utils';
import { HttpStatusCode, VideoPrivacy, VideoState } from '@peertube/peertube-models';
import { unwrapBody } from '../requests/index.js';
import { AbstractCommand } from '../shared/index.js';
import { sendRTMPStream, testFfmpegStreamError } from './live.js';
export class LiveCommand extends AbstractCommand {
    get(options) {
        const path = '/api/v1/videos/live';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path: path + '/' + options.videoId, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listSessions(options) {
        const path = `/api/v1/videos/live/${options.videoId}/sessions`;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async findLatestSession(options) {
        const { data: sessions } = await this.listSessions(options);
        return sessions[sessions.length - 1];
    }
    getReplaySession(options) {
        const path = `/api/v1/videos/${options.videoId}/live-session`;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    update(options) {
        const { videoId, fields } = options;
        const path = '/api/v1/videos/live';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path: path + '/' + videoId, fields, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    async create(options) {
        const { fields } = options;
        const path = '/api/v1/videos/live';
        const attaches = {};
        if (fields.thumbnailfile)
            attaches.thumbnailfile = fields.thumbnailfile;
        if (fields.previewfile)
            attaches.previewfile = fields.previewfile;
        const body = await unwrapBody(this.postUploadRequest(Object.assign(Object.assign({}, options), { path,
            attaches, fields: omit(fields, ['thumbnailfile', 'previewfile']), implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 })));
        return body.video;
    }
    async quickCreate(options) {
        const { name = 'live', saveReplay, permanentLive, privacy = VideoPrivacy.PUBLIC, videoPasswords } = options;
        const replaySettings = privacy === VideoPrivacy.PASSWORD_PROTECTED
            ? { privacy: VideoPrivacy.PRIVATE }
            : { privacy };
        const { uuid } = await this.create(Object.assign(Object.assign({}, options), { fields: {
                name,
                permanentLive,
                saveReplay,
                replaySettings,
                channelId: this.server.store.channel.id,
                privacy,
                videoPasswords
            } }));
        const video = await this.server.videos.getWithToken({ id: uuid });
        const live = await this.get({ videoId: uuid });
        return { video, live };
    }
    async sendRTMPStreamInVideo(options) {
        const { videoId, fixtureName, copyCodecs } = options;
        const videoLive = await this.get({ videoId });
        return sendRTMPStream({ rtmpBaseUrl: videoLive.rtmpUrl, streamKey: videoLive.streamKey, fixtureName, copyCodecs });
    }
    async runAndTestStreamError(options) {
        const command = await this.sendRTMPStreamInVideo(options);
        return testFfmpegStreamError(command, options.shouldHaveError);
    }
    waitUntilPublished(options) {
        const { videoId } = options;
        return this.waitUntilState({ videoId, state: VideoState.PUBLISHED });
    }
    waitUntilWaiting(options) {
        const { videoId } = options;
        return this.waitUntilState({ videoId, state: VideoState.WAITING_FOR_LIVE });
    }
    waitUntilEnded(options) {
        const { videoId } = options;
        return this.waitUntilState({ videoId, state: VideoState.LIVE_ENDED });
    }
    async waitUntilSegmentGeneration(options) {
        const { server, objectStorage, playlistNumber, segment, videoUUID, objectStorageBaseUrl } = options;
        const segmentName = `${playlistNumber}-00000${segment}.ts`;
        const baseUrl = objectStorage
            ? join(objectStorageBaseUrl || objectStorage.getMockPlaylistBaseUrl(), 'hls')
            : server.url + '/static/streaming-playlists/hls';
        let error = true;
        while (error) {
            try {
                await this.getRawRequest(Object.assign(Object.assign({}, options), { url: `${baseUrl}/${videoUUID}/${segmentName}`, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
                const video = await server.videos.get({ id: videoUUID });
                const hlsPlaylist = video.streamingPlaylists[0];
                const shaBody = await server.streamingPlaylists.getSegmentSha256({ url: hlsPlaylist.segmentsSha256Url, withRetry: !!objectStorage });
                if (!shaBody[segmentName]) {
                    throw new Error('Segment SHA does not exist');
                }
                const subPlaylist = await server.streamingPlaylists.get({ url: `${baseUrl}/${video.uuid}/${playlistNumber}.m3u8` });
                if (!subPlaylist.includes(segmentName))
                    throw new Error('Fragment does not exist in playlist');
                error = false;
            }
            catch (_a) {
                error = true;
                await wait(100);
            }
        }
    }
    async waitUntilReplacedByReplay(options) {
        let video;
        do {
            video = await this.server.videos.getWithToken({ token: options.token, id: options.videoId });
            await wait(500);
        } while (video.isLive === true || video.state.id !== VideoState.PUBLISHED);
    }
    getSegmentFile(options) {
        const { playlistNumber, segment, videoUUID, objectStorage } = options;
        const segmentName = `${playlistNumber}-00000${segment}.ts`;
        const baseUrl = objectStorage
            ? objectStorage.getMockPlaylistBaseUrl()
            : `${this.server.url}/static/streaming-playlists/hls`;
        const url = `${baseUrl}/${videoUUID}/${segmentName}`;
        return this.getRawRequest(Object.assign(Object.assign({}, options), { url, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getPlaylistFile(options) {
        const { playlistName, videoUUID, objectStorage } = options;
        const baseUrl = objectStorage
            ? objectStorage.getMockPlaylistBaseUrl()
            : `${this.server.url}/static/streaming-playlists/hls`;
        const url = `${baseUrl}/${videoUUID}/${playlistName}`;
        return this.getRawRequest(Object.assign(Object.assign({}, options), { url, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    async countPlaylists(options) {
        const basePath = this.server.servers.buildDirectory('streaming-playlists');
        const hlsPath = join(basePath, 'hls', options.videoUUID);
        const files = await readdir(hlsPath);
        return files.filter(f => f.endsWith('.m3u8')).length;
    }
    async waitUntilState(options) {
        let video;
        do {
            video = await this.server.videos.getWithToken({ token: options.token, id: options.videoId });
            await wait(500);
        } while (video.state.id !== options.state);
    }
}
//# sourceMappingURL=live-command.js.map