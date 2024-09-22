import { WatchedWordsListsJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = Pick<WatchedWordsListsJSON['watchedWordLists'][0], 'listName' | 'words'>;
export declare class WatchedWordsListsImporter extends AbstractUserImporter<WatchedWordsListsJSON, WatchedWordsListsJSON['watchedWordLists'][0], SanitizedObject> {
    protected getImportObjects(json: WatchedWordsListsJSON): {
        createdAt: string;
        updatedAt: string;
        listName: string;
        words: string[];
        archiveFiles?: never;
    }[];
    protected sanitize(data: WatchedWordsListsJSON['watchedWordLists'][0]): Pick<{
        createdAt: string;
        updatedAt: string;
        listName: string;
        words: string[];
        archiveFiles?: never;
    }, "listName" | "words">;
    protected importObject(data: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
}
export {};
//# sourceMappingURL=watched-words-lists-importer.d.ts.map