import { ResultList, UserNotification, UserNotificationSetting } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class NotificationsCommand extends AbstractCommand {
    updateMySettings(options: OverrideCommandOptions & {
        settings: UserNotificationSetting;
    }): import("supertest").Test;
    list(options: OverrideCommandOptions & {
        start?: number;
        count?: number;
        unread?: boolean;
        sort?: string;
    }): Promise<ResultList<UserNotification>>;
    markAsRead(options: OverrideCommandOptions & {
        ids: number[];
    }): import("supertest").Test;
    markAsReadAll(options: OverrideCommandOptions): import("supertest").Test;
    getLatest(options?: OverrideCommandOptions): Promise<UserNotification>;
}
//# sourceMappingURL=notifications-command.d.ts.map