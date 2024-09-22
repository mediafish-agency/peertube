import { AbstractUserExporter } from './abstract-user-exporter.js';
import { MActor, MActorDefaultBanner, MActorImage } from '../../../types/models/index.js';
export declare abstract class ActorExporter<T> extends AbstractUserExporter<T> {
    protected exportActorJSON(actor: MActorDefaultBanner): {
        url: string;
        name: string;
        avatars: {
            width: number;
            url: string;
            createdAt: string;
            updatedAt: string;
        }[];
        banners: {
            width: number;
            url: string;
            createdAt: string;
            updatedAt: string;
        }[];
    };
    protected exportActorImageJSON(images: MActorImage[]): {
        width: number;
        url: string;
        createdAt: string;
        updatedAt: string;
    }[];
    protected exportActorFiles(actor: MActorDefaultBanner): {
        staticFiles: {
            archivePath: string;
            readStreamFactory: () => Promise<import("stream").Readable>;
        }[];
        relativePathsFromJSON: {
            avatar: string;
            banner: string;
        };
    };
    protected getAvatarPath(actor: MActor, filename: string): string;
    protected getBannerPath(actor: MActor, filename: string): string;
}
//# sourceMappingURL=actor-exporter.d.ts.map