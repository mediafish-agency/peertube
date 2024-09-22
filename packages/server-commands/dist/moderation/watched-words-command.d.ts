import { ResultList, WatchedWordsList } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class WatchedWordsCommand extends AbstractCommand {
    listWordsLists(options: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        accountName?: string;
    }): Promise<ResultList<WatchedWordsList>>;
    createList(options: OverrideCommandOptions & {
        listName: string;
        words: string[];
        accountName?: string;
    }): Promise<{
        watchedWordsList: {
            id: number;
        };
    }>;
    updateList(options: OverrideCommandOptions & {
        listId: number;
        accountName?: string;
        listName?: string;
        words?: string[];
    }): import("supertest").Test;
    deleteList(options: OverrideCommandOptions & {
        listId: number;
        accountName?: string;
    }): import("supertest").Test;
    private buildAPIBasePath;
}
//# sourceMappingURL=watched-words-command.d.ts.map