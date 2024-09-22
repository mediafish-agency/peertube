import { Account, AccountSummary } from '@peertube/peertube-models';
import { Transaction, WhereOptions } from 'sequelize';
import { MAccount, MAccountAP, MAccountDefault, MAccountFormattable, MAccountHost, MAccountSummaryFormattable, MChannelHost } from '../../types/models/index.js';
import { ActorModel } from '../actor/actor.js';
import { ApplicationModel } from '../application/application.js';
import { AccountAutomaticTagPolicyModel } from '../automatic-tag/account-automatic-tag-policy.js';
import { CommentAutomaticTagModel } from '../automatic-tag/comment-automatic-tag.js';
import { VideoAutomaticTagModel } from '../automatic-tag/video-automatic-tag.js';
import { SequelizeModel } from '../shared/index.js';
import { UserModel } from '../user/user.js';
import { VideoChannelModel } from '../video/video-channel.js';
import { VideoCommentModel } from '../video/video-comment.js';
import { VideoPlaylistModel } from '../video/video-playlist.js';
import { AccountBlocklistModel } from './account-blocklist.js';
export declare enum ScopeNames {
    SUMMARY = "SUMMARY"
}
export type SummaryOptions = {
    actorRequired?: boolean;
    whereActor?: WhereOptions;
    whereServer?: WhereOptions;
    withAccountBlockerIds?: number[];
    forCount?: boolean;
};
export declare class AccountModel extends SequelizeModel<AccountModel> {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    actorId: number;
    Actor: Awaited<ActorModel>;
    userId: number;
    User: Awaited<UserModel>;
    applicationId: number;
    Application: Awaited<ApplicationModel>;
    VideoChannels: Awaited<VideoChannelModel>[];
    VideoPlaylists: Awaited<VideoPlaylistModel>[];
    VideoComments: Awaited<VideoCommentModel>[];
    BlockedBy: Awaited<AccountBlocklistModel>[];
    AccountAutomaticTagPolicies: Awaited<AccountAutomaticTagPolicyModel>[];
    CommentAutomaticTags: Awaited<CommentAutomaticTagModel>[];
    VideoAutomaticTags: Awaited<VideoAutomaticTagModel>[];
    static sendDeleteIfOwned(instance: AccountModel, options: any): Promise<any>;
    static deleteActorIfRemote(instance: AccountModel, options: any): Promise<void>;
    static getSQLAttributes(tableName: string, aliasPrefix?: string): string[];
    static load(id: number, transaction?: Transaction): Promise<MAccountDefault>;
    static loadByNameWithHost(nameWithHost: string): Promise<MAccountDefault>;
    static loadLocalByName(name: string): Promise<MAccountDefault>;
    static loadByNameAndHost(name: string, host: string): Promise<MAccountDefault>;
    static loadByUrl(url: string, transaction?: Transaction): Promise<MAccountDefault>;
    static listForApi(start: number, count: number, sort: string): Promise<{
        total: number;
        data: AccountModel[];
    }>;
    static loadAccountIdFromVideo(videoId: number): Promise<MAccount>;
    static listLocalsForSitemap(sort: string): Promise<MAccountHost[]>;
    toFormattedJSON(this: MAccountFormattable): Account;
    toFormattedSummaryJSON(this: MAccountSummaryFormattable): AccountSummary;
    toActivityPubObject(this: MAccountAP): Promise<{
        '@context': (string | {
            [id: string]: string;
        })[];
    } & {
        type: import("@peertube/peertube-models").ActivityPubActorType;
        id: string;
        following: string;
        followers: string;
        playlists: string;
        inbox: string;
        outbox: string;
        preferredUsername: string;
        url: string;
        name: string;
        endpoints: {
            sharedInbox: string;
        };
        publicKey: {
            id: string;
            owner: string;
            publicKeyPem: string;
        };
        published: string;
        icon: import("@peertube/peertube-models").ActivityIconObject[];
        image: import("@peertube/peertube-models").ActivityIconObject[];
    } & {
        summary: string;
    }>;
    isOwned(): boolean;
    isOutdated(): boolean;
    getDisplayName(): string;
    getClientUrl(this: MAccountHost | MChannelHost): string;
    isBlocked(): boolean;
}
//# sourceMappingURL=account.d.ts.map