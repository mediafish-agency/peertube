declare const consoleLoggerFormat: import("logform").Format;
declare const jsonLoggerFormat: import("logform").Format;
declare const timestampFormatter: import("logform").Format;
declare const labelFormatter: (suffix?: string) => import("logform").Format;
declare function buildLogger(labelSuffix?: string): import("winston").Logger;
declare const logger: import("winston").Logger;
declare const bunyanLogger: {
    level: () => void;
    trace: (...params: any[]) => void;
    debug: (...params: any[]) => void;
    verbose: (...params: any[]) => void;
    info: (...params: any[]) => void;
    warn: (...params: any[]) => void;
    error: (...params: any[]) => void;
    fatal: (...params: any[]) => void;
};
type LoggerTags = {
    tags: (string | number)[];
};
type LoggerTagsFn = (...tags: (string | number)[]) => LoggerTags;
declare function loggerTagsFactory(...defaultTags: (string | number)[]): LoggerTagsFn;
declare function mtimeSortFilesDesc(files: string[], basePath: string): Promise<{
    file: string;
    mtime: number;
}[]>;
export { buildLogger, bunyanLogger, consoleLoggerFormat, jsonLoggerFormat, labelFormatter, logger, loggerTagsFactory, mtimeSortFilesDesc, timestampFormatter, type LoggerTags, type LoggerTagsFn };
//# sourceMappingURL=logger.d.ts.map