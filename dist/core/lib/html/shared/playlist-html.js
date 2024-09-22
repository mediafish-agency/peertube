import { __decorate, __metadata } from "tslib";
import { addQueryParams, escapeHTML } from '@peertube/peertube-core-utils';
import { HttpStatusCode, VideoPlaylistPrivacy } from '@peertube/peertube-models';
import { toCompleteUUID } from '../../../helpers/custom-validators/misc.js';
import { Memoize } from '../../../helpers/memoize.js';
import { VideoPlaylistModel } from '../../../models/video/video-playlist.js';
import validator from 'validator';
import { CONFIG } from '../../../initializers/config.js';
import { MEMOIZE_TTL, WEBSERVER } from '../../../initializers/constants.js';
import { CommonEmbedHtml } from './common-embed-html.js';
import { PageHtml } from './page-html.js';
import { TagsHtml } from './tags-html.js';
export class PlaylistHtml {
    static async getWatchPlaylistHTML(videoPlaylistIdArg, req, res) {
        const videoPlaylistId = toCompleteUUID(videoPlaylistIdArg);
        if (!validator.default.isInt(videoPlaylistId) && !validator.default.isUUID(videoPlaylistId, 4)) {
            res.status(HttpStatusCode.NOT_FOUND_404);
            return PageHtml.getIndexHTML(req, res);
        }
        const [html, videoPlaylist] = await Promise.all([
            PageHtml.getIndexHTML(req, res),
            VideoPlaylistModel.loadWithAccountAndChannel(videoPlaylistId, null)
        ]);
        if (!videoPlaylist || videoPlaylist.privacy === VideoPlaylistPrivacy.PRIVATE) {
            res.status(HttpStatusCode.NOT_FOUND_404);
            return html;
        }
        return this.buildPlaylistHTML({
            html,
            playlist: videoPlaylist,
            addEmbedInfo: true,
            addOG: true,
            addTwitterCard: true,
            currentQuery: req.query
        });
    }
    static async getEmbedPlaylistHTML(playlistIdArg) {
        const playlistId = toCompleteUUID(playlistIdArg);
        const playlistPromise = validator.default.isInt(playlistId) || validator.default.isUUID(playlistId, 4)
            ? VideoPlaylistModel.loadWithAccountAndChannel(playlistId, null)
            : Promise.resolve(undefined);
        const [html, playlist] = await Promise.all([PageHtml.getEmbedHTML(), playlistPromise]);
        if (!playlist || playlist.privacy === VideoPlaylistPrivacy.PRIVATE) {
            return CommonEmbedHtml.buildEmptyEmbedHTML({ html, playlist });
        }
        return this.buildPlaylistHTML({
            html,
            playlist,
            addEmbedInfo: true,
            addOG: false,
            addTwitterCard: false,
            currentQuery: {}
        });
    }
    static buildPlaylistHTML(options) {
        const { html, playlist, addEmbedInfo, addOG, addTwitterCard, currentQuery = {} } = options;
        const escapedTruncatedDescription = TagsHtml.buildEscapedTruncatedDescription(playlist.description);
        let htmlResult = TagsHtml.addTitleTag(html, playlist.name);
        htmlResult = TagsHtml.addDescriptionTag(htmlResult, escapedTruncatedDescription);
        const list = { numberOfItems: playlist.get('videosLength') };
        const schemaType = 'ItemList';
        const twitterCard = addTwitterCard
            ? 'player'
            : undefined;
        const ogType = addOG
            ? 'video'
            : undefined;
        const embed = addEmbedInfo
            ? { url: WEBSERVER.URL + playlist.getEmbedStaticPath(), createdAt: playlist.createdAt.toISOString() }
            : undefined;
        return TagsHtml.addTags(htmlResult, {
            url: WEBSERVER.URL + playlist.getWatchStaticPath(),
            escapedSiteName: escapeHTML(CONFIG.INSTANCE.NAME),
            escapedTitle: escapeHTML(playlist.name),
            escapedTruncatedDescription,
            indexationPolicy: !playlist.isOwned() || playlist.privacy !== VideoPlaylistPrivacy.PUBLIC
                ? 'never'
                : 'always',
            image: { url: playlist.getThumbnailUrl() },
            list,
            schemaType,
            ogType,
            twitterCard,
            embed,
            oembedUrl: this.getOEmbedUrl(playlist, currentQuery)
        }, { playlist });
    }
    static getOEmbedUrl(playlist, currentQuery) {
        const base = WEBSERVER.URL + playlist.getWatchStaticPath();
        const additionalQuery = {};
        const allowedParams = new Set(['playlistPosition']);
        for (const [key, value] of Object.entries(currentQuery)) {
            if (allowedParams.has(key))
                additionalQuery[key] = value;
        }
        return addQueryParams(base, additionalQuery);
    }
}
__decorate([
    Memoize({ maxAge: MEMOIZE_TTL.EMBED_HTML }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlaylistHtml, "getEmbedPlaylistHTML", null);
//# sourceMappingURL=playlist-html.js.map