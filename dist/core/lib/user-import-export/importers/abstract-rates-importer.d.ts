import { AbstractUserImporter } from './abstract-user-importer.js';
import { VideoRateType } from '@peertube/peertube-models';
export type SanitizedRateObject = {
    videoUrl: string;
};
export declare abstract class AbstractRatesImporter<ROOT_OBJECT, OBJECT> extends AbstractUserImporter<ROOT_OBJECT, OBJECT, SanitizedRateObject> {
    protected sanitizeRate<O extends {
        videoUrl: string;
    }>(data: O): Pick<O, "videoUrl">;
    protected importRate(data: SanitizedRateObject, rateType: VideoRateType): Promise<{
        duplicate: boolean;
    }>;
}
//# sourceMappingURL=abstract-rates-importer.d.ts.map