import { ConstantManager } from '@peertube/peertube-models';
type AlterableVideoConstant = 'language' | 'licence' | 'category' | 'privacy' | 'playlistPrivacy';
export declare class VideoConstantManagerFactory {
    private readonly npmName;
    private readonly updatedVideoConstants;
    constructor(npmName: string);
    resetVideoConstants(npmName: string): void;
    private resetConstants;
    createVideoConstantManager<K extends number | string>(type: AlterableVideoConstant): ConstantManager<K>;
    private addConstant;
    private deleteConstant;
}
export {};
//# sourceMappingURL=video-constant-manager-factory.d.ts.map