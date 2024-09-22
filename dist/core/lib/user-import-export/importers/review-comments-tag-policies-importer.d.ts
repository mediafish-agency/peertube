import { AutoTagPoliciesJSON } from '@peertube/peertube-models';
import { AbstractUserImporter } from './abstract-user-importer.js';
type SanitizedObject = AutoTagPoliciesJSON['reviewComments'];
export declare class ReviewCommentsTagPoliciesImporter extends AbstractUserImporter<AutoTagPoliciesJSON, AutoTagPoliciesJSON['reviewComments'] & {
    archiveFiles?: never;
}, SanitizedObject> {
    protected getImportObjects(json: AutoTagPoliciesJSON): {
        name: string;
    }[][];
    protected sanitize(data: AutoTagPoliciesJSON['reviewComments']): {
        name: string;
    }[];
    protected importObject(data: SanitizedObject): Promise<{
        duplicate: boolean;
    }>;
}
export {};
//# sourceMappingURL=review-comments-tag-policies-importer.d.ts.map