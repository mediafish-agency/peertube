import { AccountVideoRate, type VideoRateType } from '@peertube/peertube-models';
import { MAccountVideoRate, MAccountVideoRateAccountUrl, MAccountVideoRateAccountVideo, MAccountVideoRateFormattable, MAccountVideoRateVideoUrl } from '../../types/models/index.js';
import { Transaction } from 'sequelize';
import { SequelizeModel } from '../shared/index.js';
import { VideoModel } from '../video/video.js';
import { AccountModel } from './account.js';
export declare class AccountVideoRateModel extends SequelizeModel<AccountVideoRateModel> {
    type: VideoRateType;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    videoId: number;
    Video: Awaited<VideoModel>;
    accountId: number;
    Account: Awaited<AccountModel>;
    static load(accountId: number, videoId: number, transaction?: Transaction): Promise<MAccountVideoRate>;
    static loadByAccountAndVideoOrUrl(accountId: number, videoId: number, url: string, t?: Transaction): Promise<MAccountVideoRate>;
    static loadLocalAndPopulateVideo(rateType: VideoRateType, accountName: string, videoId: number, t?: Transaction): Promise<MAccountVideoRateAccountVideo>;
    static loadByUrl(url: string, transaction: Transaction): Promise<AccountVideoRateModel>;
    static listByAccountForApi(options: {
        start: number;
        count: number;
        sort: string;
        type?: string;
        accountId: number;
    }): Promise<{
        total: number;
        data: AccountVideoRateModel[];
    }>;
    static listRemoteRateUrlsOfLocalVideos(): Promise<string[]>;
    static listAndCountAccountUrlsByVideoId(rateType: VideoRateType, videoId: number, start: number, count: number, t?: Transaction): Promise<{
        total: number;
        data: MAccountVideoRateAccountUrl[];
    }>;
    static listRatesOfAccountIdForExport(accountId: number, rateType: VideoRateType): Promise<MAccountVideoRateVideoUrl[]>;
    toFormattedJSON(this: MAccountVideoRateFormattable): AccountVideoRate;
}
//# sourceMappingURL=account-video-rate.d.ts.map