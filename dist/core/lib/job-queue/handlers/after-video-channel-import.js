import { logger } from '../../../helpers/logger.js';
import { VideoChannelSyncModel } from '../../../models/video/video-channel-sync.js';
import { VideoChannelSyncState } from '@peertube/peertube-models';
export async function processAfterVideoChannelImport(job) {
    const payload = job.data;
    if (!payload.channelSyncId)
        return;
    logger.info('Processing after video channel import in job %s.', job.id);
    const sync = await VideoChannelSyncModel.loadWithChannel(payload.channelSyncId);
    if (!sync) {
        logger.error('Unknown sync id %d.', payload.channelSyncId);
        return;
    }
    const childrenValues = await job.getChildrenValues();
    let errors = 0;
    let successes = 0;
    for (const value of Object.values(childrenValues)) {
        if (value.resultType === 'success')
            successes++;
        else if (value.resultType === 'error')
            errors++;
    }
    if (errors > 0) {
        sync.state = VideoChannelSyncState.FAILED;
        logger.error(`Finished synchronizing "${sync.VideoChannel.Actor.preferredUsername}" with failures.`, { errors, successes });
    }
    else {
        sync.state = VideoChannelSyncState.SYNCED;
        logger.info(`Finished synchronizing "${sync.VideoChannel.Actor.preferredUsername}" successfully.`, { successes });
    }
    await sync.save();
}
//# sourceMappingURL=after-video-channel-import.js.map