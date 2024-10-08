import { logger } from '../../../../helpers/logger.js';
import { WEBSERVER } from '../../../../initializers/constants.js';
import { isBlockedByServerOrAccount } from '../../../blocklist.js';
import { UserModel } from '../../../../models/user/user.js';
import { UserNotificationModel } from '../../../../models/user/user-notification.js';
import { UserNotificationType, UserRight } from '@peertube/peertube-models';
import { AbstractNotification } from '../common/abstract-notification.js';
export class FollowForInstance extends AbstractNotification {
    async prepare() {
        this.admins = await UserModel.listWithRight(UserRight.MANAGE_SERVER_FOLLOW);
    }
    isDisabled() {
        const follower = Object.assign(this.actorFollow.ActorFollower.Account, { Actor: this.actorFollow.ActorFollower });
        return isBlockedByServerOrAccount(follower);
    }
    log() {
        logger.info('Notifying %d administrators of new instance follower: %s.', this.admins.length, this.actorFollow.ActorFollower.url);
    }
    getSetting(user) {
        return user.NotificationSetting.newInstanceFollower;
    }
    getTargetUsers() {
        return this.admins;
    }
    createNotification(user) {
        const notification = UserNotificationModel.build({
            type: UserNotificationType.NEW_INSTANCE_FOLLOWER,
            userId: user.id,
            actorFollowId: this.actorFollow.id
        });
        notification.ActorFollow = this.actorFollow;
        return notification;
    }
    createEmail(to) {
        const awaitingApproval = this.actorFollow.state === 'pending'
            ? ' awaiting manual approval.'
            : '';
        return {
            to,
            subject: 'New instance follower',
            text: `Your instance has a new follower: ${this.actorFollow.ActorFollower.url}${awaitingApproval}.`,
            locals: {
                title: 'New instance follower',
                action: {
                    text: 'Review followers',
                    url: WEBSERVER.URL + '/admin/follows/followers-list'
                }
            }
        };
    }
    get actorFollow() {
        return this.payload;
    }
}
//# sourceMappingURL=follow-for-instance.js.map