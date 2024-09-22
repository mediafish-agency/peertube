import { VideoObject } from '@peertube/peertube-models';
import { LoggerTagsFn } from '../../../../helpers/logger.js';
import { MVideoFullLight } from '../../../../types/models/index.js';
import { APVideoAbstractBuilder } from './abstract-builder.js';
export declare class APVideoCreator extends APVideoAbstractBuilder {
    protected readonly videoObject: VideoObject;
    protected lTags: LoggerTagsFn;
    constructor(videoObject: VideoObject);
    create(): Promise<{
        autoBlacklisted: boolean;
        videoCreated: MVideoFullLight;
    }>;
}
//# sourceMappingURL=creator.d.ts.map