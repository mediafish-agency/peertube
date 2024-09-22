declare function downloadImage(options: {
    url: string;
    destDir: string;
    destName: string;
    size?: {
        width: number;
        height: number;
    };
}): Promise<string>;
export default downloadImage;
//# sourceMappingURL=image-downloader.d.ts.map