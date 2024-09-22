import 'multer';
import { UploadFilesForCheck } from 'express';
export declare function exists(value: any): boolean;
export declare function isSafePath(p: string): boolean;
export declare function isSafeFilename(filename: string, extension?: string): boolean;
export declare function isSafePeerTubeFilenameWithoutExtension(filename: string): RegExpMatchArray;
export declare function isArray(value: any): value is any[];
export declare function isNotEmptyIntArray(value: any): boolean;
export declare function isNotEmptyStringArray(value: any): boolean;
export declare function hasArrayLength(value: unknown[], options: {
    min?: number;
    max?: number;
}): boolean;
export declare function isArrayOf(value: any, validator: (value: any) => boolean): boolean;
export declare function isDateValid(value: string): boolean;
export declare function isIdValid(value: string): boolean;
export declare function isUUIDValid(value: string): boolean;
export declare function areUUIDsValid(values: string[]): boolean;
export declare function isIdOrUUIDValid(value: string): boolean;
export declare function isBooleanValid(value: any): boolean;
export declare function isIntOrNull(value: any): boolean;
export declare function isFileValid(options: {
    files: UploadFilesForCheck;
    maxSize: number | null;
    mimeTypeRegex: string | null;
    field?: string;
    optional?: boolean;
}): boolean;
export declare function checkMimetypeRegex(fileMimeType: string, mimeTypeRegex: string): boolean;
export declare function toCompleteUUID(value: string): string;
export declare function toCompleteUUIDs(values: string[]): string[];
export declare function toIntOrNull(value: string): string | number;
export declare function toBooleanOrNull(value: any): string | boolean;
export declare function toValueOrNull(value: string): string;
export declare function toIntArray(value: any): number[];
//# sourceMappingURL=misc.d.ts.map