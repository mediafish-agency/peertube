import { escapeAttribute, escapeHTML } from '@peertube/peertube-core-utils';
import { CONFIG } from '../../../initializers/config.js';
import { CUSTOM_HTML_TAG_COMMENTS, EMBED_SIZE, WEBSERVER } from '../../../initializers/constants.js';
import { Hooks } from '../../plugins/hooks.js';
import truncate from 'lodash-es/truncate.js';
import { mdToOneLinePlainText } from '../../../helpers/markdown.js';
export class TagsHtml {
    static addTitleTag(htmlStringPage, title) {
        let text = title || CONFIG.INSTANCE.NAME;
        if (title)
            text += ` - ${CONFIG.INSTANCE.NAME}`;
        const titleTag = `<title>${escapeHTML(text)}</title>`;
        return htmlStringPage.replace(CUSTOM_HTML_TAG_COMMENTS.TITLE, titleTag);
    }
    static addDescriptionTag(htmlStringPage, escapedTruncatedDescription) {
        const content = escapedTruncatedDescription || escapeHTML(CONFIG.INSTANCE.SHORT_DESCRIPTION);
        const descriptionTag = `<meta name="description" content="${escapeAttribute(content)}" />`;
        return htmlStringPage.replace(CUSTOM_HTML_TAG_COMMENTS.DESCRIPTION, descriptionTag);
    }
    static async addTags(htmlStringPage, tagsValues, context) {
        const openGraphMetaTags = this.generateOpenGraphMetaTagsOptions(tagsValues);
        const standardMetaTags = this.generateStandardMetaTagsOptions(tagsValues);
        const twitterCardMetaTags = this.generateTwitterCardMetaTagsOptions(tagsValues);
        const schemaTags = await this.generateSchemaTagsOptions(tagsValues, context);
        const { url, escapedTitle, oembedUrl, indexationPolicy } = tagsValues;
        const oembedLinkTags = [];
        if (oembedUrl) {
            oembedLinkTags.push({
                type: 'application/json+oembed',
                href: WEBSERVER.URL + '/services/oembed?url=' + encodeURIComponent(oembedUrl),
                escapedTitle
            });
        }
        let tagsStr = '';
        Object.keys(openGraphMetaTags).forEach(tagName => {
            const tagValue = openGraphMetaTags[tagName];
            if (!tagValue)
                return;
            tagsStr += `<meta property="${tagName}" content="${escapeAttribute(tagValue)}" />`;
        });
        Object.keys(standardMetaTags).forEach(tagName => {
            const tagValue = standardMetaTags[tagName];
            if (!tagValue)
                return;
            tagsStr += `<meta property="${tagName}" content="${escapeAttribute(tagValue)}" />`;
        });
        Object.keys(twitterCardMetaTags).forEach(tagName => {
            const tagValue = twitterCardMetaTags[tagName];
            if (!tagValue)
                return;
            tagsStr += `<meta property="${tagName}" content="${escapeAttribute(tagValue)}" />`;
        });
        for (const oembedLinkTag of oembedLinkTags) {
            tagsStr += `<link rel="alternate" type="${oembedLinkTag.type}" href="${oembedLinkTag.href}" title="${escapeAttribute(oembedLinkTag.escapedTitle)}" />`;
        }
        if (schemaTags) {
            tagsStr += `<script type="application/ld+json">${JSON.stringify(schemaTags)}</script>`;
        }
        if (indexationPolicy !== 'never' && url) {
            tagsStr += `<link rel="canonical" href="${url}" />`;
        }
        if (indexationPolicy === 'never') {
            tagsStr += `<meta name="robots" content="noindex" />`;
        }
        return htmlStringPage.replace(CUSTOM_HTML_TAG_COMMENTS.META_TAGS, tagsStr);
    }
    static generateOpenGraphMetaTagsOptions(tags) {
        if (!tags.ogType)
            return {};
        const metaTags = {
            'og:type': tags.ogType,
            'og:site_name': tags.escapedSiteName,
            'og:title': tags.escapedTitle,
            'og:image': tags.image.url
        };
        if (tags.image.width && tags.image.height) {
            metaTags['og:image:width'] = tags.image.width;
            metaTags['og:image:height'] = tags.image.height;
        }
        metaTags['og:url'] = tags.url;
        metaTags['og:description'] = tags.escapedTruncatedDescription;
        if (tags.embed) {
            metaTags['og:video:url'] = tags.embed.url;
            metaTags['og:video:secure_url'] = tags.embed.url;
            metaTags['og:video:type'] = 'text/html';
            metaTags['og:video:width'] = EMBED_SIZE.width;
            metaTags['og:video:height'] = EMBED_SIZE.height;
        }
        return metaTags;
    }
    static generateStandardMetaTagsOptions(tags) {
        var _a;
        return {
            name: tags.escapedTitle,
            description: tags.escapedTruncatedDescription,
            image: (_a = tags.image) === null || _a === void 0 ? void 0 : _a.url
        };
    }
    static generateTwitterCardMetaTagsOptions(tags) {
        if (!tags.twitterCard)
            return {};
        const metaTags = {
            'twitter:card': tags.twitterCard,
            'twitter:site': CONFIG.SERVICES.TWITTER.USERNAME,
            'twitter:title': tags.escapedTitle,
            'twitter:description': tags.escapedTruncatedDescription,
            'twitter:image': tags.image.url
        };
        if (tags.image.width && tags.image.height) {
            metaTags['twitter:image:width'] = tags.image.width;
            metaTags['twitter:image:height'] = tags.image.height;
        }
        if (tags.twitterCard === 'player') {
            metaTags['twitter:player'] = tags.embed.url;
            metaTags['twitter:player:width'] = EMBED_SIZE.width;
            metaTags['twitter:player:height'] = EMBED_SIZE.height;
        }
        return metaTags;
    }
    static generateSchemaTagsOptions(tags, context) {
        if (!tags.schemaType)
            return;
        if (tags.schemaType === 'ProfilePage') {
            if (!tags.jsonldProfile)
                throw new Error('Missing `jsonldProfile` with ProfilePage schema type');
            const profilePageSchema = {
                '@context': 'http://schema.org',
                '@type': tags.schemaType,
                'dateCreated': tags.jsonldProfile.createdAt.toISOString(),
                'dateModified': tags.jsonldProfile.updatedAt.toISOString(),
                'mainEntity': {
                    '@id': '#main-author',
                    '@type': 'Person',
                    'name': tags.escapedTitle,
                    'description': tags.escapedTruncatedDescription,
                    'image': tags.image.url
                }
            };
            return Hooks.wrapObject(profilePageSchema, 'filter:html.client.json-ld.result', context);
        }
        const schema = {
            '@context': 'http://schema.org',
            '@type': tags.schemaType,
            'name': tags.escapedTitle,
            'description': tags.escapedTruncatedDescription,
            'image': tags.image.url,
            'url': tags.url
        };
        if (tags.list) {
            schema['numberOfItems'] = tags.list.numberOfItems;
            schema['thumbnailUrl'] = tags.image.url;
        }
        if (tags.embed) {
            schema['embedUrl'] = tags.embed.url;
            schema['uploadDate'] = tags.embed.createdAt;
            if (tags.embed.duration)
                schema['duration'] = tags.embed.duration;
            schema['thumbnailUrl'] = tags.image.url;
        }
        return Hooks.wrapObject(schema, 'filter:html.client.json-ld.result', context);
    }
    static buildEscapedTruncatedDescription(description) {
        return truncate(mdToOneLinePlainText(description), { length: 200 });
    }
}
//# sourceMappingURL=tags-html.js.map