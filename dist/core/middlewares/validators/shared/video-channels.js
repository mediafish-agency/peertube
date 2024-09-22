import { VideoChannelModel } from '../../../models/video/video-channel.js';
import { HttpStatusCode } from '@peertube/peertube-models';
async function doesVideoChannelIdExist(id, res) {
    const videoChannel = await VideoChannelModel.loadAndPopulateAccount(+id);
    return processVideoChannelExist(videoChannel, res);
}
async function doesVideoChannelNameWithHostExist(nameWithDomain, res) {
    const videoChannel = await VideoChannelModel.loadByNameWithHostAndPopulateAccount(nameWithDomain);
    return processVideoChannelExist(videoChannel, res);
}
export { doesVideoChannelIdExist, doesVideoChannelNameWithHostExist };
function processVideoChannelExist(videoChannel, res) {
    if (!videoChannel) {
        res.fail({
            status: HttpStatusCode.NOT_FOUND_404,
            message: 'Video channel not found'
        });
        return false;
    }
    res.locals.videoChannel = videoChannel;
    return true;
}
//# sourceMappingURL=video-channels.js.map