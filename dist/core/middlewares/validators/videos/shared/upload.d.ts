import express from 'express';
export declare function addDurationToVideoFileIfNeeded(options: {
    res: express.Response;
    videoFile: {
        path: string;
        duration?: number;
    };
    middlewareName: string;
}): Promise<boolean>;
//# sourceMappingURL=upload.d.ts.map