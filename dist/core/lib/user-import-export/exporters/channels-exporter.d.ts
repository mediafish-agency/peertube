import { ChannelExportJSON } from '@peertube/peertube-models';
import { ActorExporter } from './actor-exporter.js';
export declare class ChannelsExporter extends ActorExporter<ChannelExportJSON> {
    export(): Promise<{
        json: {
            channels: {
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
        };
        staticFiles: {
            archivePath: string;
            readStreamFactory: () => Promise<import("stream").Readable>;
        }[];
    }>;
    private exportChannel;
    private exportChannelJSON;
}
//# sourceMappingURL=channels-exporter.d.ts.map