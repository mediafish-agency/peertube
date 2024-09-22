import { MVideo } from '../../../types/models/video/video.js';
import { MVideoPlaylist } from '../../../types/models/video/video-playlist.js';
export declare class CommonEmbedHtml {
    static buildEmptyEmbedHTML(options: {
        html: string;
        playlist?: MVideoPlaylist;
        video?: MVideo;
    }): Promise<string>;
}
//# sourceMappingURL=common-embed-html.d.ts.map