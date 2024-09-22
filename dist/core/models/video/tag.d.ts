import { MTag } from '../../types/models/video/tag.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from './video.js';
export declare class TagModel extends SequelizeModel<TagModel> {
    name: string;
    Videos: Awaited<VideoModel>[];
    static getRandomSamples(threshold: number, count: number): Promise<string[]>;
    static findOrCreateMultiple(options: {
        tags: string[];
        transaction?: Transaction;
    }): Promise<MTag[]>;
}
//# sourceMappingURL=tag.d.ts.map