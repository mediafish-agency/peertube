import { ActivitypubFollowPayload, ActivitypubHttpBroadcastPayload, ActivitypubHttpFetcherPayload, ActivitypubHttpUnicastPayload, ActorKeysPayload, AfterVideoChannelImportPayload, CreateUserExportPayload, DeleteResumableUploadMetaFilePayload, EmailPayload, FederateVideoPayload, GenerateStoryboardPayload, ImportUserArchivePayload, JobState, JobType, ManageVideoTorrentPayload, MoveStoragePayload, NotifyPayload, RefreshPayload, TranscodingJobBuilderPayload, VideoChannelImportPayload, VideoFileImportPayload, VideoImportPayload, VideoLiveEndingPayload, VideoRedundancyPayload, VideoStudioEditionPayload, VideoTranscodingPayload, VideoTranscriptionPayload } from '@peertube/peertube-models';
import { Job } from 'bullmq';
export type CreateJobArgument = {
    type: 'activitypub-http-broadcast';
    payload: ActivitypubHttpBroadcastPayload;
} | {
    type: 'activitypub-http-broadcast-parallel';
    payload: ActivitypubHttpBroadcastPayload;
} | {
    type: 'activitypub-http-unicast';
    payload: ActivitypubHttpUnicastPayload;
} | {
    type: 'activitypub-http-fetcher';
    payload: ActivitypubHttpFetcherPayload;
} | {
    type: 'activitypub-cleaner';
    payload: {};
} | {
    type: 'activitypub-follow';
    payload: ActivitypubFollowPayload;
} | {
    type: 'video-file-import';
    payload: VideoFileImportPayload;
} | {
    type: 'video-transcoding';
    payload: VideoTranscodingPayload;
} | {
    type: 'email';
    payload: EmailPayload;
} | {
    type: 'transcoding-job-builder';
    payload: TranscodingJobBuilderPayload;
} | {
    type: 'video-import';
    payload: VideoImportPayload;
} | {
    type: 'activitypub-refresher';
    payload: RefreshPayload;
} | {
    type: 'videos-views-stats';
    payload: {};
} | {
    type: 'video-live-ending';
    payload: VideoLiveEndingPayload;
} | {
    type: 'actor-keys';
    payload: ActorKeysPayload;
} | {
    type: 'video-redundancy';
    payload: VideoRedundancyPayload;
} | {
    type: 'delete-resumable-upload-meta-file';
    payload: DeleteResumableUploadMetaFilePayload;
} | {
    type: 'video-studio-edition';
    payload: VideoStudioEditionPayload;
} | {
    type: 'manage-video-torrent';
    payload: ManageVideoTorrentPayload;
} | {
    type: 'move-to-object-storage';
    payload: MoveStoragePayload;
} | {
    type: 'move-to-file-system';
    payload: MoveStoragePayload;
} | {
    type: 'video-channel-import';
    payload: VideoChannelImportPayload;
} | {
    type: 'after-video-channel-import';
    payload: AfterVideoChannelImportPayload;
} | {
    type: 'notify';
    payload: NotifyPayload;
} | {
    type: 'federate-video';
    payload: FederateVideoPayload;
} | {
    type: 'create-user-export';
    payload: CreateUserExportPayload;
} | {
    type: 'generate-video-storyboard';
    payload: GenerateStoryboardPayload;
} | {
    type: 'import-user-archive';
    payload: ImportUserArchivePayload;
} | {
    type: 'video-transcription';
    payload: VideoTranscriptionPayload;
};
export type CreateJobOptions = {
    delay?: number;
    priority?: number;
    failParentOnFailure?: boolean;
};
declare const jobTypes: JobType[];
declare class JobQueue {
    private static instance;
    private workers;
    private queues;
    private queueEvents;
    private flowProducer;
    private initialized;
    private jobRedisPrefix;
    private constructor();
    init(): void;
    private buildWorker;
    private buildQueue;
    private buildQueueEvent;
    terminate(): Promise<[void, void, void][]>;
    start(): Promise<[void, void][]>;
    pause(): Promise<void>;
    resume(): void;
    createJobAsync(options: CreateJobArgument & CreateJobOptions): void;
    createJob(options: CreateJobArgument & CreateJobOptions | undefined): Promise<Job<any, any, string>>;
    createSequentialJobFlow(...jobs: ((CreateJobArgument & CreateJobOptions) | undefined)[]): Promise<import("bullmq").JobNode>;
    createJobWithChildren(parent: CreateJobArgument & CreateJobOptions, children: (CreateJobArgument & CreateJobOptions)[]): Promise<import("bullmq").JobNode>;
    private buildJobFlowOption;
    private buildJobOptions;
    listForApi(options: {
        state?: JobState;
        start: number;
        count: number;
        asc?: boolean;
        jobType: JobType;
    }): Promise<Job[]>;
    count(state: JobState, jobType?: JobType): Promise<number>;
    private buildStateFilter;
    private buildTypeFilter;
    getStats(): Promise<{
        jobType: JobType;
        counts: {
            [index: string]: number;
        };
    }[]>;
    removeOldJobs(): Promise<void>;
    private addRepeatableJobs;
    private getJobConcurrency;
    private buildJobRemovalOptions;
    static get Instance(): JobQueue;
}
export { JobQueue, jobTypes };
//# sourceMappingURL=job-queue.d.ts.map