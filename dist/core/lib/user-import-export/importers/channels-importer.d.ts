import { ChannelExportJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = Pick<ChannelExportJSON['channels'][0], 'name' | 'displayName' | 'description' | 'support' | 'archiveFiles'>;
export declare class ChannelsImporter extends AbstractUserImporter<ChannelExportJSON, ChannelExportJSON['channels'][0], SanitizedObject> {
    protected getImportObjects(json: ChannelExportJSON): {
        url: string;
        name: string;
        displayName: string;
        description: string;
        support: string;
        updatedAt: string;
        createdAt: string;
        avatars: import("@peertube/peertube-models").UserActorImageJSON[];
        banners: import("@peertube/peertube-models").UserActorImageJSON[];
        archiveFiles: {
            avatar: string | null;
            banner: string | null;
        };
    }[];
    protected sanitize(channelImportData: ChannelExportJSON['channels'][0]): Pick<{
        url: string;
        name: string;
        displayName: string;
        description: string;
        support: string;
        updatedAt: string;
        createdAt: string;
        avatars: import("@peertube/peertube-models").UserActorImageJSON[];
        banners: import("@peertube/peertube-models").UserActorImageJSON[];
        archiveFiles: {
            avatar: string | null;
            banner: string | null;
        };
    }, "name" | "displayName" | "description" | "support" | "archiveFiles">;
    protected importObject(channelImportData: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
}
export {};
//# sourceMappingURL=channels-importer.d.ts.map