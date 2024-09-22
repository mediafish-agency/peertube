import { TagsHtml } from './tags-html.js';
export class CommonEmbedHtml {
    static buildEmptyEmbedHTML(options) {
        const { html, playlist, video } = options;
        let htmlResult = TagsHtml.addTitleTag(html);
        htmlResult = TagsHtml.addDescriptionTag(htmlResult);
        return TagsHtml.addTags(htmlResult, { indexationPolicy: 'never' }, { playlist, video });
    }
}
//# sourceMappingURL=common-embed-html.js.map