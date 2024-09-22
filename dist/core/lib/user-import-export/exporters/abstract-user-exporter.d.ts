import { Activity, ActivityPubActor, ActivityPubOrderedCollection } from '@peertube/peertube-models';
import { Awaitable } from '@peertube/peertube-typescript-utils';
import { MUserDefault } from '../../../types/models/user/user.js';
import { Readable } from 'stream';
export type ExportResult<T> = {
    json: T[] | T;
    staticFiles: {
        archivePath: string;
        readStreamFactory: () => Promise<Readable>;
    }[];
    activityPub?: ActivityPubActor | ActivityPubOrderedCollection<string>;
    activityPubOutbox?: Omit<Activity, '@context'>[];
};
type ActivityPubFilenames = {
    likes: string;
    dislikes: string;
    outbox: string;
    following: string;
    account: string;
};
export declare abstract class AbstractUserExporter<T> {
    protected user: MUserDefault;
    protected activityPubFilenames: ActivityPubFilenames;
    protected relativeStaticDirPath: string;
    constructor(options: {
        user: MUserDefault;
        activityPubFilenames: ActivityPubFilenames;
        relativeStaticDirPath?: string;
    });
    getActivityPubFilename(): any;
    abstract export(): Awaitable<ExportResult<T>>;
}
export {};
//# sourceMappingURL=abstract-user-exporter.d.ts.map