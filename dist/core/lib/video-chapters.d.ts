import { VideoChapter } from '@peertube/peertube-models';
import { MVideoImmutable } from '../types/models/index.js';
import { Transaction } from 'sequelize';
export declare function replaceChapters(options: {
    video: MVideoImmutable;
    chapters: VideoChapter[];
    transaction: Transaction;
}): Promise<void>;
export declare function replaceChaptersIfNotExist(options: {
    video: MVideoImmutable;
    chapters: VideoChapter[];
    transaction: Transaction;
}): Promise<void>;
export declare function replaceChaptersFromDescriptionIfNeeded(options: {
    oldDescription?: string;
    newDescription: string;
    video: MVideoImmutable;
    transaction: Transaction;
}): Promise<boolean>;
//# sourceMappingURL=video-chapters.d.ts.map