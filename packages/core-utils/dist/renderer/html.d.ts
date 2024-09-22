export declare function getDefaultSanitizedTags(): string[];
export declare function getDefaultSanitizedSchemes(): string[];
export declare function getDefaultSanitizedHrefAttributes(): string[];
export declare function getDefaultSanitizeOptions(): {
    allowedTags: string[];
    allowedSchemes: string[];
    allowedAttributes: {
        a: string[];
        '*': string[];
    };
    transformTags: {
        a: (tagName: string, attribs: any) => {
            tagName: string;
            attribs: any;
        };
    };
};
export declare function getTextOnlySanitizeOptions(): {
    allowedTags: string[];
};
export declare function escapeHTML(stringParam: string): string;
export declare function escapeAttribute(value: string): string;
//# sourceMappingURL=html.d.ts.map