import { WatchedWordsListsJSON } from '@peertube/peertube-models';
import { AbstractUserExporter } from './abstract-user-exporter.js';
export declare class WatchedWordsListsExporter extends AbstractUserExporter<WatchedWordsListsJSON> {
    export(): Promise<{
        json: WatchedWordsListsJSON;
        staticFiles: any[];
    }>;
}
//# sourceMappingURL=watched-words-lists-exporter.d.ts.map