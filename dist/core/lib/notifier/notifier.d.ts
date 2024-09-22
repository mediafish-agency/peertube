import { MRegistration, MUserDefault } from '../../types/models/user/index.js';
import { MVideoBlacklistLightVideo, MVideoBlacklistVideo } from '../../types/models/video/video-blacklist.js';
import { MAbuseFull, MAbuseMessage, MActorFollowFull, MApplication, MCommentOwnerVideo, MPlugin, MVideoAccountLight, MVideoCaptionVideo, MVideoFullLight } from '../../types/models/index.js';
import { ImportFinishedForOwnerPayload, NewAbusePayload } from './shared/index.js';
declare class Notifier {
    private readonly notificationModels;
    private static instance;
    private constructor();
    notifyOnNewVideoOrLiveIfNeeded(video: MVideoAccountLight): void;
    notifyOnVideoPublishedAfterTranscoding(video: MVideoFullLight): void;
    notifyOnVideoPublishedAfterScheduledUpdate(video: MVideoFullLight): void;
    notifyOnVideoPublishedAfterRemovedFromAutoBlacklist(video: MVideoFullLight): void;
    notifyOnNewComment(comment: MCommentOwnerVideo): void;
    notifyOnNewCommentApproval(comment: MCommentOwnerVideo): void;
    notifyOnNewAbuse(payload: NewAbusePayload): void;
    notifyOnVideoAutoBlacklist(videoBlacklist: MVideoBlacklistLightVideo): void;
    notifyOnVideoBlacklist(videoBlacklist: MVideoBlacklistVideo): void;
    notifyOnVideoUnblacklist(video: MVideoFullLight): void;
    notifyOnFinishedVideoImport(payload: ImportFinishedForOwnerPayload): void;
    notifyOnNewDirectRegistration(user: MUserDefault): void;
    notifyOnNewRegistrationRequest(registration: MRegistration): void;
    notifyOfNewUserFollow(actorFollow: MActorFollowFull): void;
    notifyOfNewInstanceFollow(actorFollow: MActorFollowFull): void;
    notifyOfAutoInstanceFollowing(actorFollow: MActorFollowFull): void;
    notifyOnAbuseStateChange(abuse: MAbuseFull): void;
    notifyOnAbuseMessage(abuse: MAbuseFull, message: MAbuseMessage): void;
    notifyOfNewPeerTubeVersion(application: MApplication, latestVersion: string): void;
    notifyOfNewPluginVersion(plugin: MPlugin): void;
    notifyOfFinishedVideoStudioEdition(video: MVideoFullLight): void;
    notifyOfGeneratedVideoTranscription(caption: MVideoCaptionVideo): void;
    private notify;
    private isEmailEnabled;
    private isWebNotificationEnabled;
    private sendNotifications;
    static get Instance(): Notifier;
}
export { Notifier };
//# sourceMappingURL=notifier.d.ts.map