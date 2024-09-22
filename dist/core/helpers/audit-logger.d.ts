import { AdminAbuse, CustomConfig, User, VideoChannel, VideoChannelSync, VideoComment, VideoDetails, VideoImport } from '@peertube/peertube-models';
import express from 'express';
declare function getAuditIdFromRes(res: express.Response): string;
declare function auditLoggerFactory(domain: string): {
    create(user: string, entity: EntityAuditView): void;
    update(user: string, entity: EntityAuditView, oldEntity: EntityAuditView): void;
    delete(user: string, entity: EntityAuditView): void;
};
declare abstract class EntityAuditView {
    private readonly keysToKeep;
    private readonly prefix;
    private readonly entityInfos;
    constructor(keysToKeep: Set<string>, prefix: string, entityInfos: object);
    toLogKeys(): object;
}
declare class VideoAuditView extends EntityAuditView {
    constructor(video: VideoDetails);
}
declare class VideoImportAuditView extends EntityAuditView {
    constructor(videoImport: VideoImport);
}
declare class CommentAuditView extends EntityAuditView {
    constructor(comment: VideoComment);
}
declare class UserAuditView extends EntityAuditView {
    constructor(user: User);
}
declare class VideoChannelAuditView extends EntityAuditView {
    constructor(channel: VideoChannel);
}
declare class AbuseAuditView extends EntityAuditView {
    constructor(abuse: AdminAbuse);
}
declare class CustomConfigAuditView extends EntityAuditView {
    constructor(customConfig: CustomConfig);
}
declare class VideoChannelSyncAuditView extends EntityAuditView {
    constructor(channelSync: VideoChannelSync);
}
export { getAuditIdFromRes, auditLoggerFactory, VideoImportAuditView, VideoChannelAuditView, CommentAuditView, UserAuditView, VideoAuditView, AbuseAuditView, CustomConfigAuditView, VideoChannelSyncAuditView };
//# sourceMappingURL=audit-logger.d.ts.map