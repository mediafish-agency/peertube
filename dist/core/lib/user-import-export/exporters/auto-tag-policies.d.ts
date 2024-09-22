import { AutoTagPoliciesJSON } from '@peertube/peertube-models';
import { AbstractUserExporter } from './abstract-user-exporter.js';
export declare class AutoTagPoliciesExporter extends AbstractUserExporter<AutoTagPoliciesJSON> {
    export(): Promise<{
        json: AutoTagPoliciesJSON;
        staticFiles: any[];
    }>;
}
//# sourceMappingURL=auto-tag-policies.d.ts.map