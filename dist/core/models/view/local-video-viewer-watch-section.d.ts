import { MLocalVideoViewerWatchSection } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { LocalVideoViewerModel } from './local-video-viewer.js';
export declare class LocalVideoViewerWatchSectionModel extends SequelizeModel<LocalVideoViewerWatchSectionModel> {
    createdAt: Date;
    watchStart: number;
    watchEnd: number;
    localVideoViewerId: number;
    LocalVideoViewer: Awaited<LocalVideoViewerModel>;
    static bulkCreateSections(options: {
        localVideoViewerId: number;
        watchSections: {
            start: number;
            end: number;
        }[];
        transaction?: Transaction;
    }): Promise<MLocalVideoViewerWatchSection[]>;
}
//# sourceMappingURL=local-video-viewer-watch-section.d.ts.map