import { wait } from '@peertube/peertube-core-utils';
import { VideoInclude, VideoPrivacy } from '@peertube/peertube-models';
import { buildAbsoluteFixturePath } from '@peertube/peertube-node-utils';
import ffmpeg from 'fluent-ffmpeg';
import truncate from 'lodash-es/truncate.js';
export function sendRTMPStream(options) {
    const { rtmpBaseUrl, streamKey, fixtureName = 'video_short.mp4', copyCodecs = false } = options;
    const fixture = buildAbsoluteFixturePath(fixtureName);
    const command = ffmpeg(fixture);
    command.inputOption('-stream_loop -1');
    command.inputOption('-re');
    if (copyCodecs) {
        command.outputOption('-c copy');
    }
    else {
        command.outputOption('-c:v libx264');
        command.outputOption('-g 120');
        command.outputOption('-x264-params "no-scenecut=1"');
        command.outputOption('-r 60');
    }
    command.outputOption('-f flv');
    const rtmpUrl = rtmpBaseUrl + '/' + streamKey;
    command.output(rtmpUrl);
    command.on('error', err => {
        var _a;
        if ((_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes('Exiting normally'))
            return;
        if (process.env.DEBUG)
            console.error(err);
    });
    if (process.env.DEBUG) {
        command.on('stderr', data => console.log(data));
    }
    command.run();
    return command;
}
export function waitFfmpegUntilError(command, successAfterMS = 10000) {
    return new Promise((res, rej) => {
        command.on('error', err => {
            return rej(err);
        });
        setTimeout(() => {
            res();
        }, successAfterMS);
    });
}
export async function testFfmpegStreamError(command, shouldHaveError) {
    let error;
    try {
        await waitFfmpegUntilError(command, 45000);
    }
    catch (err) {
        error = err;
    }
    await stopFfmpeg(command);
    if (shouldHaveError && !error)
        throw new Error('Ffmpeg did not have an error');
    if (!shouldHaveError && error)
        throw error;
}
export async function stopFfmpeg(command) {
    command.kill('SIGINT');
    await wait(500);
}
export async function waitUntilLivePublishedOnAllServers(servers, videoId) {
    for (const server of servers) {
        await server.live.waitUntilPublished({ videoId });
    }
}
export async function waitUntilLiveWaitingOnAllServers(servers, videoId) {
    for (const server of servers) {
        await server.live.waitUntilWaiting({ videoId });
    }
}
export async function waitUntilLiveReplacedByReplayOnAllServers(servers, videoId) {
    for (const server of servers) {
        await server.live.waitUntilReplacedByReplay({ videoId });
    }
}
export async function findExternalSavedVideo(server, liveVideoUUID) {
    let liveDetails;
    try {
        liveDetails = await server.videos.getWithToken({ id: liveVideoUUID });
    }
    catch (_a) {
        return undefined;
    }
    const include = VideoInclude.BLACKLISTED;
    const privacyOneOf = [VideoPrivacy.INTERNAL, VideoPrivacy.PRIVATE, VideoPrivacy.PUBLIC, VideoPrivacy.UNLISTED];
    const { data } = await server.videos.list({ token: server.accessToken, sort: '-publishedAt', include, privacyOneOf });
    const videoNameSuffix = ` - ${new Date(liveDetails.publishedAt).toLocaleString()}`;
    const truncatedVideoName = truncate(liveDetails.name, {
        length: 120 - videoNameSuffix.length
    });
    const toFind = truncatedVideoName + videoNameSuffix;
    return data.find(v => v.name === toFind);
}
//# sourceMappingURL=live.js.map