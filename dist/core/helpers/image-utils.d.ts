export declare function generateImageFilename(extension?: string): string;
export declare function processImage(options: {
    path: string;
    destination: string;
    newSize?: {
        width: number;
        height: number;
    };
    keepOriginal?: boolean;
}): Promise<void>;
export declare function getImageSize(path: string): Promise<{
    width: number;
    height: number;
}>;
//# sourceMappingURL=image-utils.d.ts.map