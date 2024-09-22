import Bluebird from 'bluebird';
import { ResultList } from '@peertube/peertube-models';
type ActivityPubCollectionPaginationHandler = (start: number, count: number) => Bluebird<ResultList<any>> | Promise<ResultList<any>>;
export declare function activityPubCollectionPagination(baseUrl: string, handler: ActivityPubCollectionPaginationHandler, page?: any, size?: number): Promise<{
    id: string;
    type: string;
    totalItems: number;
    first: string;
    prev?: undefined;
    next?: undefined;
    partOf?: undefined;
    orderedItems?: undefined;
} | {
    id: string;
    type: string;
    prev: string;
    next: string;
    partOf: string;
    orderedItems: any[];
    totalItems: number;
    first?: undefined;
}>;
export declare function activityPubCollection<T>(baseUrl: string, items: T[]): {
    id: string;
    type: "OrderedCollection";
    totalItems: number;
    orderedItems: T[];
};
export {};
//# sourceMappingURL=collection.d.ts.map