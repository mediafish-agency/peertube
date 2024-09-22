import { Sequelize } from 'sequelize';
import { MUserAccountId } from '../../../../../types/models/index.js';
import { AbstractRunQuery } from '../../../../shared/abstract-run-query.js';
import { VideoTableAttributes } from './video-table-attributes.js';
export declare class AbstractVideoQueryBuilder extends AbstractRunQuery {
    protected readonly sequelize: Sequelize;
    protected readonly mode: 'list' | 'get';
    protected attributes: {
        [key: string]: string;
    };
    protected joins: string;
    protected where: string;
    protected tables: VideoTableAttributes;
    constructor(sequelize: Sequelize, mode: 'list' | 'get');
    protected buildSelect(): string;
    protected includeChannels(): void;
    protected includeAccounts(): void;
    protected includeOwnerUser(): void;
    protected includeThumbnails(): void;
    protected includeWebVideoFiles(): void;
    protected includeStreamingPlaylistFiles(): void;
    protected includeUserHistory(userId: number): void;
    protected includePlaylist(playlistId: number): void;
    protected includeTags(): void;
    protected includeBlacklisted(): void;
    protected includeBlockedOwnerAndServer(serverAccountId: number, user?: MUserAccountId): void;
    protected includeScheduleUpdate(): void;
    protected includeLive(): void;
    protected includeVideoSource(): void;
    protected includeAutomaticTags(autoTagOfAccountId: number): void;
    protected includeTrackers(): void;
    protected includeWebVideoRedundancies(): void;
    protected includeStreamingPlaylistRedundancies(): void;
    protected buildActorInclude(prefixKey: string): {
        [id: string]: string;
    };
    protected buildAvatarInclude(prefixKey: string): {
        [id: string]: string;
    };
    protected buildServerInclude(prefixKey: string): {
        [id: string]: string;
    };
    protected buildAttributesObject(prefixKey: string, attributeKeys: string[]): {
        [id: string]: string;
    };
    protected whereId(options: {
        ids?: number[];
        id?: string | number;
        url?: string;
    }): void;
    protected addJoin(join: string): void;
}
//# sourceMappingURL=abstract-video-query-builder.d.ts.map