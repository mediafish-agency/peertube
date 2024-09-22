import { AbuseStateType, ActivityPubActorType, ActorImageType_Type, FollowState, JobType, NSFWPolicyType, RunnerJobStateType, UserExportStateType, UserImportStateType, UserRegistrationStateType, VideoChannelSyncStateType, VideoCommentPolicyType, VideoImportStateType, VideoPlaylistPrivacyType, VideoPlaylistType_Type, VideoPrivacyType, VideoRateType, VideoStateType } from '@peertube/peertube-models';
import { RepeatOptions } from 'bullmq';
import { Encoding } from 'crypto';
export declare const LAST_MIGRATION_VERSION = 865;
export declare const API_VERSION = "v1";
export declare const PEERTUBE_VERSION: string;
export declare const PAGINATION: {
    GLOBAL: {
        COUNT: {
            DEFAULT: number;
            MAX: number;
        };
    };
    OUTBOX: {
        COUNT: {
            MAX: number;
        };
    };
};
export declare const WEBSERVER: {
    URL: string;
    HOST: string;
    SCHEME: string;
    WS: string;
    HOSTNAME: string;
    PORT: number;
    RTMP_URL: string;
    RTMPS_URL: string;
    RTMP_BASE_LIVE_URL: string;
    RTMPS_BASE_LIVE_URL: string;
};
export declare const SORTABLE_COLUMNS: {
    ADMIN_USERS: string[];
    USER_SUBSCRIPTIONS: string[];
    ACCOUNTS: string[];
    JOBS: string[];
    VIDEO_CHANNELS: string[];
    VIDEO_IMPORTS: string[];
    VIDEO_CHANNEL_SYNCS: string[];
    VIDEO_COMMENT_THREADS: string[];
    VIDEO_COMMENTS: string[];
    VIDEO_PASSWORDS: string[];
    VIDEO_RATES: string[];
    BLACKLISTS: string[];
    INSTANCE_FOLLOWERS: string[];
    INSTANCE_FOLLOWING: string[];
    ACCOUNT_FOLLOWERS: string[];
    CHANNEL_FOLLOWERS: string[];
    USER_REGISTRATIONS: string[];
    RUNNERS: string[];
    RUNNER_REGISTRATION_TOKENS: string[];
    RUNNER_JOBS: string[];
    VIDEOS: string[];
    VIDEOS_SEARCH: string[];
    VIDEO_CHANNELS_SEARCH: string[];
    VIDEO_PLAYLISTS_SEARCH: string[];
    ABUSES: string[];
    ACCOUNTS_BLOCKLIST: string[];
    SERVERS_BLOCKLIST: string[];
    WATCHED_WORDS_LISTS: string[];
    USER_NOTIFICATIONS: string[];
    VIDEO_PLAYLISTS: string[];
    PLUGINS: string[];
    AVAILABLE_PLUGINS: string[];
    VIDEO_REDUNDANCIES: string[];
};
export declare const ROUTE_CACHE_LIFETIME: {
    FEEDS: string;
    ROBOTS: string;
    SITEMAP: string;
    SECURITYTXT: string;
    NODEINFO: string;
    DNT_POLICY: string;
    ACTIVITY_PUB: {
        VIDEOS: string;
    };
    STATS: string;
    WELL_KNOWN: string;
};
export declare const ACTOR_FOLLOW_SCORE: {
    PENALTY: number;
    BONUS: number;
    BASE: number;
    MAX: number;
};
export declare const FOLLOW_STATES: {
    [id: string]: FollowState;
};
export declare const REMOTE_SCHEME: {
    HTTP: string;
    WS: string;
};
export declare const JOB_ATTEMPTS: {
    [id in JobType]: number;
};
export declare const JOB_CONCURRENCY: {
    [id in Exclude<JobType, 'video-transcoding' | 'video-import'>]: number;
};
export declare const JOB_TTL: {
    [id in JobType]: number;
};
export declare const REPEAT_JOBS: {
    [id in JobType]?: RepeatOptions;
};
export declare const JOB_PRIORITY: {
    TRANSCODING: number;
    VIDEO_STUDIO: number;
    TRANSCRIPTION: number;
};
export declare const JOB_REMOVAL_OPTIONS: {
    COUNT: number;
    SUCCESS: {
        DEFAULT: number;
        'activitypub-http-broadcast-parallel': number;
        'activitypub-http-unicast': number;
        'videos-views-stats': number;
        'activitypub-refresher': number;
    };
    FAILURE: {
        DEFAULT: number;
    };
};
export declare const VIDEO_IMPORT_TIMEOUT: number;
export declare const RUNNER_JOBS: {
    MAX_FAILURES: number;
    LAST_CONTACT_UPDATE_INTERVAL: number;
};
export declare const BROADCAST_CONCURRENCY = 30;
export declare const CRAWL_REQUEST_CONCURRENCY = 1;
export declare const AP_CLEANER: {
    CONCURRENCY: number;
    UNAVAILABLE_TRESHOLD: number;
    PERIOD: number;
};
export declare const REQUEST_TIMEOUTS: {
    DEFAULT: number;
    FILE: number;
    VIDEO_FILE: number;
    REDUNDANCY: number;
};
export declare const SCHEDULER_INTERVALS_MS: {
    RUNNER_JOB_WATCH_DOG: number;
    ACTOR_FOLLOW_SCORES: number;
    REMOVE_OLD_JOBS: number;
    UPDATE_VIDEOS: number;
    YOUTUBE_DL_UPDATE: number;
    GEO_IP_UPDATE: number;
    VIDEO_VIEWS_BUFFER_UPDATE: number;
    CHECK_PLUGINS: number;
    CHECK_PEERTUBE_VERSION: number;
    AUTO_FOLLOW_INDEX_INSTANCES: number;
    REMOVE_OLD_VIEWS: number;
    REMOVE_OLD_HISTORY: number;
    REMOVE_EXPIRED_USER_EXPORTS: number;
    UPDATE_INBOX_STATS: number;
    REMOVE_DANGLING_RESUMABLE_UPLOADS: number;
    CHANNEL_SYNC_CHECK_INTERVAL: number;
};
export declare const CONSTRAINTS_FIELDS: {
    USERS: {
        NAME: {
            min: number;
            max: number;
        };
        DESCRIPTION: {
            min: number;
            max: number;
        };
        USERNAME: {
            min: number;
            max: number;
        };
        PASSWORD: {
            min: number;
            max: number;
        };
        VIDEO_QUOTA: {
            min: number;
        };
        VIDEO_QUOTA_DAILY: {
            min: number;
        };
        VIDEO_LANGUAGES: {
            max: number;
        };
        BLOCKED_REASON: {
            min: number;
            max: number;
        };
    };
    ABUSES: {
        REASON: {
            min: number;
            max: number;
        };
        MODERATION_COMMENT: {
            min: number;
            max: number;
        };
    };
    ABUSE_MESSAGES: {
        MESSAGE: {
            min: number;
            max: number;
        };
    };
    USER_REGISTRATIONS: {
        REASON_MESSAGE: {
            min: number;
            max: number;
        };
        MODERATOR_MESSAGE: {
            min: number;
            max: number;
        };
    };
    VIDEO_BLACKLIST: {
        REASON: {
            min: number;
            max: number;
        };
    };
    VIDEO_CHANNELS: {
        NAME: {
            min: number;
            max: number;
        };
        DESCRIPTION: {
            min: number;
            max: number;
        };
        SUPPORT: {
            min: number;
            max: number;
        };
        EXTERNAL_CHANNEL_URL: {
            min: number;
            max: number;
        };
        URL: {
            min: number;
            max: number;
        };
    };
    VIDEO_CHANNEL_SYNCS: {
        EXTERNAL_CHANNEL_URL: {
            min: number;
            max: number;
        };
    };
    VIDEO_CAPTIONS: {
        CAPTION_FILE: {
            EXTNAME: string[];
            FILE_SIZE: {
                max: number;
            };
        };
    };
    VIDEO_IMPORTS: {
        URL: {
            min: number;
            max: number;
        };
        TORRENT_NAME: {
            min: number;
            max: number;
        };
        TORRENT_FILE: {
            EXTNAME: string[];
            FILE_SIZE: {
                max: number;
            };
        };
    };
    VIDEOS_REDUNDANCY: {
        URL: {
            min: number;
            max: number;
        };
    };
    VIDEO_RATES: {
        URL: {
            min: number;
            max: number;
        };
    };
    VIDEOS: {
        NAME: {
            min: number;
            max: number;
        };
        LANGUAGE: {
            min: number;
            max: number;
        };
        TRUNCATED_DESCRIPTION: {
            min: number;
            max: number;
        };
        DESCRIPTION: {
            min: number;
            max: number;
        };
        SUPPORT: {
            min: number;
            max: number;
        };
        IMAGE: {
            EXTNAME: string[];
            FILE_SIZE: {
                max: number;
            };
        };
        EXTNAME: string[];
        INFO_HASH: {
            min: number;
            max: number;
        };
        DURATION: {
            min: number;
        };
        TAGS: {
            min: number;
            max: number;
        };
        TAG: {
            min: number;
            max: number;
        };
        VIEWS: {
            min: number;
        };
        LIKES: {
            min: number;
        };
        DISLIKES: {
            min: number;
        };
        FILE_SIZE: {
            min: number;
        };
        PARTIAL_UPLOAD_SIZE: {
            max: number;
        };
        URL: {
            min: number;
            max: number;
        };
    };
    VIDEO_SOURCE: {
        FILENAME: {
            min: number;
            max: number;
        };
    };
    VIDEO_PLAYLISTS: {
        NAME: {
            min: number;
            max: number;
        };
        DESCRIPTION: {
            min: number;
            max: number;
        };
        URL: {
            min: number;
            max: number;
        };
        IMAGE: {
            EXTNAME: string[];
            FILE_SIZE: {
                max: number;
            };
        };
    };
    ACTORS: {
        PUBLIC_KEY: {
            min: number;
            max: number;
        };
        PRIVATE_KEY: {
            min: number;
            max: number;
        };
        URL: {
            min: number;
            max: number;
        };
        IMAGE: {
            EXTNAME: string[];
            FILE_SIZE: {
                max: number;
            };
        };
    };
    VIDEO_EVENTS: {
        COUNT: {
            min: number;
        };
    };
    VIDEO_COMMENTS: {
        TEXT: {
            min: number;
            max: number;
        };
        URL: {
            min: number;
            max: number;
        };
    };
    VIDEO_SHARE: {
        URL: {
            min: number;
            max: number;
        };
    };
    CONTACT_FORM: {
        FROM_NAME: {
            min: number;
            max: number;
        };
        BODY: {
            min: number;
            max: number;
        };
    };
    PLUGINS: {
        NAME: {
            min: number;
            max: number;
        };
        DESCRIPTION: {
            min: number;
            max: number;
        };
    };
    COMMONS: {
        URL: {
            min: number;
            max: number;
        };
    };
    VIDEO_STUDIO: {
        TASKS: {
            min: number;
            max: number;
        };
        CUT_TIME: {
            min: number;
        };
    };
    LOGS: {
        CLIENT_MESSAGE: {
            min: number;
            max: number;
        };
        CLIENT_STACK_TRACE: {
            min: number;
            max: number;
        };
        CLIENT_META: {
            min: number;
            max: number;
        };
        CLIENT_USER_AGENT: {
            min: number;
            max: number;
        };
    };
    RUNNERS: {
        TOKEN: {
            min: number;
            max: number;
        };
        NAME: {
            min: number;
            max: number;
        };
        DESCRIPTION: {
            min: number;
            max: number;
        };
    };
    RUNNER_JOBS: {
        TOKEN: {
            min: number;
            max: number;
        };
        REASON: {
            min: number;
            max: number;
        };
        ERROR_MESSAGE: {
            min: number;
            max: number;
        };
        PROGRESS: {
            min: number;
            max: number;
        };
    };
    VIDEO_PASSWORD: {
        LENGTH: {
            min: number;
            max: number;
        };
    };
    VIDEO_CHAPTERS: {
        TITLE: {
            min: number;
            max: number;
        };
    };
    WATCHED_WORDS: {
        LIST_NAME: {
            min: number;
            max: number;
        };
        WORDS: {
            min: number;
            max: number;
        };
        WORD: {
            min: number;
            max: number;
        };
    };
};
export declare const VIEW_LIFETIME: {
    VIEW: number;
    VIEWER_COUNTER: number;
    VIEWER_STATS: number;
};
export declare let VIEWER_SYNC_REDIS: number;
export declare const MAX_LOCAL_VIEWER_WATCH_SECTIONS = 100;
export declare let CONTACT_FORM_LIFETIME: number;
export declare const DEFAULT_AUDIO_RESOLUTION: 480;
export declare const DEFAULT_AUDIO_MERGE_RESOLUTION = 25;
export declare const VIDEO_RATE_TYPES: {
    [id: string]: VideoRateType;
};
export declare const USER_IMPORT: {
    MAX_PLAYLIST_ELEMENTS: number;
};
export declare const FFMPEG_NICE: {
    LIVE: number;
    THUMBNAIL: number;
    VOD: number;
};
export declare const VIDEO_CATEGORIES: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    13: string;
    14: string;
    15: string;
    16: string;
    17: string;
    18: string;
};
export declare const VIDEO_LICENCES: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
};
export declare const VIDEO_LANGUAGES: {
    [id: string]: string;
};
export declare const VIDEO_PRIVACIES: {
    [id in VideoPrivacyType]: string;
};
export declare const VIDEO_STATES: {
    [id in VideoStateType]: string;
};
export declare const VIDEO_IMPORT_STATES: {
    [id in VideoImportStateType]: string;
};
export declare const VIDEO_CHANNEL_SYNC_STATE: {
    [id in VideoChannelSyncStateType]: string;
};
export declare const ABUSE_STATES: {
    [id in AbuseStateType]: string;
};
export declare const USER_REGISTRATION_STATES: {
    [id in UserRegistrationStateType]: string;
};
export declare const VIDEO_PLAYLIST_PRIVACIES: {
    [id in VideoPlaylistPrivacyType]: string;
};
export declare const VIDEO_PLAYLIST_TYPES: {
    [id in VideoPlaylistType_Type]: string;
};
export declare const RUNNER_JOB_STATES: {
    [id in RunnerJobStateType]: string;
};
export declare const USER_EXPORT_STATES: {
    [id in UserExportStateType]: string;
};
export declare const USER_IMPORT_STATES: {
    [id in UserImportStateType]: string;
};
export declare const VIDEO_COMMENTS_POLICY: {
    [id in VideoCommentPolicyType]: string;
};
export declare const MIMETYPES: {
    AUDIO: {
        MIMETYPE_EXT: {
            'audio/mpeg': string;
            'audio/mp3': string;
            'application/ogg': string;
            'audio/ogg': string;
            'audio/x-ms-wma': string;
            'audio/wav': string;
            'audio/x-wav': string;
            'audio/x-flac': string;
            'audio/flac': string;
            'audio/vnd.dlna.adts': string;
            'audio/aac': string;
            'audio/m4a': string;
            'audio/x-m4a': string;
            'audio/mp4': string;
            'audio/vnd.dolby.dd-raw': string;
            'audio/ac3': string;
        };
        EXT_MIMETYPE: {
            [id: string]: string;
        };
    };
    VIDEO: {
        MIMETYPE_EXT: {
            [id: string]: string | string[];
        };
        MIMETYPES_REGEX: string;
        EXT_MIMETYPE: {
            [id: string]: string;
        };
    };
    IMAGE: {
        MIMETYPE_EXT: {
            'image/png': string;
            'image/gif': string;
            'image/webp': string;
            'image/jpg': string;
            'image/jpeg': string;
        };
        EXT_MIMETYPE: {
            [id: string]: string;
        };
    };
    VIDEO_CAPTIONS: {
        MIMETYPE_EXT: {
            'text/vtt': string;
            'application/x-subrip': string;
            'text/plain': string;
        };
        EXT_MIMETYPE: {
            [id: string]: string;
        };
    };
    TORRENT: {
        MIMETYPE_EXT: {
            'application/x-bittorrent': string;
        };
    };
    M3U8: {
        MIMETYPE_EXT: {
            'application/vnd.apple.mpegurl': string;
        };
    };
    AP_VIDEO: {
        MIMETYPE_EXT: {
            'video/mp4': string;
            'video/ogg': string;
            'video/webm': string;
            'audio/mp4': string;
        };
    };
    AP_TORRENT: {
        MIMETYPE_EXT: {
            'application/x-bittorrent': string;
        };
    };
    AP_MAGNET: {
        MIMETYPE_EXT: {
            'application/x-bittorrent;x-scheme-handler/magnet': string;
        };
    };
};
export declare const BINARY_CONTENT_TYPES: Set<string>;
export declare const OVERVIEWS: {
    VIDEOS: {
        SAMPLE_THRESHOLD: number;
        SAMPLES_COUNT: number;
    };
};
export declare const SERVER_ACTOR_NAME = "peertube";
export declare const ACTIVITY_PUB: {
    POTENTIAL_ACCEPT_HEADERS: string[];
    ACCEPT_HEADER: string;
    COLLECTION_ITEMS_PER_PAGE: number;
    FETCH_PAGE_LIMIT: number;
    MAX_RECURSION_COMMENTS: number;
    ACTOR_REFRESH_INTERVAL: number;
    VIDEO_REFRESH_INTERVAL: number;
    VIDEO_PLAYLIST_REFRESH_INTERVAL: number;
};
export declare const ACTIVITY_PUB_ACTOR_TYPES: {
    [id: string]: ActivityPubActorType;
};
export declare const HTTP_SIGNATURE: {
    HEADER_NAME: string;
    ALGORITHM: string;
    HEADERS_TO_SIGN_WITH_PAYLOAD: string[];
    HEADERS_TO_SIGN_WITHOUT_PAYLOAD: string[];
    CLOCK_SKEW_SECONDS: number;
};
export declare let PRIVATE_RSA_KEY_SIZE: number;
export declare const BCRYPT_SALT_SIZE = 10;
export declare const ENCRYPTION: {
    ALGORITHM: string;
    IV: number;
    SALT: string;
    ENCODING: Encoding;
};
export declare const USER_PASSWORD_RESET_LIFETIME: number;
export declare const USER_PASSWORD_CREATE_LIFETIME: number;
export declare const TWO_FACTOR_AUTH_REQUEST_TOKEN_LIFETIME: number;
export declare let JWT_TOKEN_USER_EXPORT_FILE_LIFETIME: string;
export declare const EMAIL_VERIFY_LIFETIME: number;
export declare const NSFW_POLICY_TYPES: {
    [id: string]: NSFWPolicyType;
};
export declare const USER_EXPORT_MAX_ITEMS = 1000;
export declare const USER_EXPORT_FILE_PREFIX = "user-export-";
export declare const STATIC_PATHS: {
    THUMBNAILS: string;
    LEGACY_WEB_VIDEOS: string;
    WEB_VIDEOS: string;
    LEGACY_PRIVATE_WEB_VIDEOS: string;
    PRIVATE_WEB_VIDEOS: string;
    REDUNDANCY: string;
    STREAMING_PLAYLISTS: {
        HLS: string;
        PRIVATE_HLS: string;
    };
};
export declare const DOWNLOAD_PATHS: {
    TORRENTS: string;
    GENERATE_VIDEO: string;
    WEB_VIDEOS: string;
    HLS_VIDEOS: string;
    USER_EXPORTS: string;
    ORIGINAL_VIDEO_FILE: string;
};
export declare const LAZY_STATIC_PATHS: {
    THUMBNAILS: string;
    BANNERS: string;
    AVATARS: string;
    PREVIEWS: string;
    VIDEO_CAPTIONS: string;
    TORRENTS: string;
    STORYBOARDS: string;
};
export declare const OBJECT_STORAGE_PROXY_PATHS: {
    LEGACY_PRIVATE_WEB_VIDEOS: string;
    PRIVATE_WEB_VIDEOS: string;
    STREAMING_PLAYLISTS: {
        PRIVATE_HLS: string;
    };
};
export declare const STATIC_MAX_AGE: {
    SERVER: string;
    LAZY_SERVER: string;
    CLIENT: string;
};
export declare const THUMBNAILS_SIZE: {
    width: number;
    height: number;
    minRemoteWidth: number;
};
export declare const PREVIEWS_SIZE: {
    width: number;
    height: number;
    minRemoteWidth: number;
};
export declare const ACTOR_IMAGES_SIZE: {
    [key in ActorImageType_Type]: {
        width: number;
        height: number;
    }[];
};
export declare const STORYBOARD: {
    SPRITE_MAX_SIZE: number;
    SPRITES_MAX_EDGE_COUNT: number;
};
export declare const EMBED_SIZE: {
    width: number;
    height: number;
};
export declare const FILES_CACHE: {
    PREVIEWS: {
        DIRECTORY: string;
        MAX_AGE: number;
    };
    STORYBOARDS: {
        DIRECTORY: string;
        MAX_AGE: number;
    };
    VIDEO_CAPTIONS: {
        DIRECTORY: string;
        MAX_AGE: number;
    };
    TORRENTS: {
        DIRECTORY: string;
        MAX_AGE: number;
    };
};
export declare const LRU_CACHE: {
    USER_TOKENS: {
        MAX_SIZE: number;
    };
    FILENAME_TO_PATH_PERMANENT_FILE_CACHE: {
        MAX_SIZE: number;
    };
    STATIC_VIDEO_FILES_RIGHTS_CHECK: {
        MAX_SIZE: number;
        TTL: number;
    };
    VIDEO_TOKENS: {
        MAX_SIZE: number;
        TTL: number;
    };
    WATCHED_WORDS_REGEX: {
        MAX_SIZE: number;
        TTL: number;
    };
    TRACKER_IPS: {
        MAX_SIZE: number;
    };
};
export declare const DIRECTORIES: {
    RESUMABLE_UPLOAD: string;
    HLS_STREAMING_PLAYLIST: {
        PUBLIC: string;
        PRIVATE: string;
    };
    WEB_VIDEOS: {
        PUBLIC: string;
        PRIVATE: string;
    };
    ORIGINAL_VIDEOS: string;
    HLS_REDUNDANCY: string;
    LOCAL_PIP_DIRECTORY: string;
};
export declare const RESUMABLE_UPLOAD_SESSION_LIFETIME: number;
export declare const VIDEO_LIVE: {
    EXTENSION: string;
    CLEANUP_DELAY: number;
    SEGMENT_TIME_SECONDS: {
        DEFAULT_LATENCY: number;
        SMALL_LATENCY: number;
    };
    SEGMENTS_LIST_SIZE: number;
    REPLAY_DIRECTORY: string;
    EDGE_LIVE_DELAY_SEGMENTS_NOTIFICATION: number;
    MAX_SOCKET_WAITING_DATA: number;
    RTMP: {
        CHUNK_SIZE: number;
        GOP_CACHE: boolean;
        PING: number;
        PING_TIMEOUT: number;
        BASE_PATH: string;
    };
};
export declare const MEMOIZE_TTL: {
    OVERVIEWS_SAMPLE: number;
    INFO_HASH_EXISTS: number;
    VIDEO_DURATION: number;
    LIVE_ABLE_TO_UPLOAD: number;
    LIVE_CHECK_SOCKET_HEALTH: number;
    GET_STATS_FOR_OPEN_TELEMETRY_METRICS: number;
    EMBED_HTML: number;
};
export declare const MEMOIZE_LENGTH: {
    INFO_HASH_EXISTS: number;
    VIDEO_DURATION: number;
};
export declare const totalCPUs: number;
export declare const WORKER_THREADS: {
    DOWNLOAD_IMAGE: {
        CONCURRENCY: number;
        MAX_THREADS: number;
    };
    PROCESS_IMAGE: {
        CONCURRENCY: number;
        MAX_THREADS: number;
    };
    GET_IMAGE_SIZE: {
        CONCURRENCY: number;
        MAX_THREADS: number;
    };
    SIGN_JSON_LD_OBJECT: {
        CONCURRENCY: number;
        MAX_THREADS: number;
    };
    BUILD_DIGEST: {
        CONCURRENCY: number;
        MAX_THREADS: number;
    };
};
export declare const REDUNDANCY: {
    VIDEOS: {
        RANDOMIZED_FACTOR: number;
    };
};
export declare const ACCEPT_HEADERS: string[];
export declare const OTP: {
    HEADER_NAME: string;
    HEADER_REQUIRED_VALUE: string;
};
export declare const ASSETS_PATH: {
    DEFAULT_AUDIO_BACKGROUND: string;
    DEFAULT_LIVE_BACKGROUND: string;
};
export declare const CUSTOM_HTML_TAG_COMMENTS: {
    TITLE: string;
    DESCRIPTION: string;
    CUSTOM_CSS: string;
    META_TAGS: string;
    SERVER_CONFIG: string;
};
export declare const MAX_LOGS_OUTPUT_CHARACTERS: number;
export declare const LOG_FILENAME = "peertube.log";
export declare const AUDIT_LOG_FILENAME = "peertube-audit.log";
export declare const TRACKER_RATE_LIMITS: {
    INTERVAL: number;
    ANNOUNCES_PER_IP_PER_INFOHASH: number;
    ANNOUNCES_PER_IP: number;
    BLOCK_IP_LIFETIME: number;
};
export declare const P2P_MEDIA_LOADER_PEER_VERSION = 2;
export declare const PLUGIN_GLOBAL_CSS_FILE_NAME = "plugins-global.css";
export declare const PLUGIN_GLOBAL_CSS_PATH: string;
export declare let PLUGIN_EXTERNAL_AUTH_TOKEN_LIFETIME: number;
export declare const DEFAULT_THEME_NAME = "default";
export declare const DEFAULT_USER_THEME_NAME = "instance-default";
export declare const SEARCH_INDEX: {
    ROUTES: {
        VIDEOS: string;
        VIDEO_CHANNELS: string;
    };
};
export declare const STATS_TIMESERIE: {
    MAX_DAYS: number;
};
export declare function loadLanguages(): Promise<void>;
export declare const FILES_CONTENT_HASH: {
    MANIFEST: string;
    FAVICON: string;
    LOGO: string;
};
export declare const VIDEO_FILTERS: {
    WATERMARK: {
        SIZE_RATIO: number;
        HORIZONTAL_MARGIN_RATIO: number;
        VERTICAL_MARGIN_RATIO: number;
    };
};
export declare function buildLanguages(): Promise<{
    [id: string]: string;
}>;
//# sourceMappingURL=constants.d.ts.map