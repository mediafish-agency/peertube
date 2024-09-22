import { Instance as ParseTorrent } from 'parse-torrent';
import { ResultList } from '@peertube/peertube-models';
declare function deleteFileAndCatch(path: string): void;
declare function generateRandomString(size: number): Promise<string>;
interface FormattableToJSON<U, V> {
    toFormattedJSON(args?: U): V;
}
declare function getFormattedObjects<U, V, T extends FormattableToJSON<U, V>>(objects: T[], objectsTotal: number, formattedArg?: U): ResultList<V>;
declare function generateVideoImportTmpPath(target: string | ParseTorrent, extension?: string): string;
declare function getSecureTorrentName(originalName: string): string;
declare function getUUIDFromFilename(filename: string): string;
export { deleteFileAndCatch, generateRandomString, getFormattedObjects, getSecureTorrentName, generateVideoImportTmpPath, getUUIDFromFilename };
//# sourceMappingURL=utils.d.ts.map