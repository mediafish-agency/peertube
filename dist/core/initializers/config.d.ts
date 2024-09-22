import { IConfig } from 'config';
import { BroadcastMessageLevel, NSFWPolicyType, VideoCommentPolicyType, VideoPrivacyType, VideoRedundancyConfigFilter, VideosRedundancyStrategy } from '@peertube/peertube-models';
import { TranscriptionEngineName, WhisperBuiltinModelName } from '@peertube/peertube-transcription';
declare const CONFIG: {
    CUSTOM_FILE: string;
    LISTEN: {
        PORT: number;
        HOSTNAME: string;
    };
    SECRETS: {
        PEERTUBE: string;
    };
    DATABASE: {
        DBNAME: string;
        HOSTNAME: string;
        PORT: number;
        SSL: boolean;
        USERNAME: string;
        PASSWORD: string;
        POOL: {
            MAX: number;
        };
    };
    REDIS: {
        HOSTNAME: string;
        PORT: number;
        SOCKET: string;
        AUTH: string;
        DB: number;
        SENTINEL: {
            ENABLED: boolean;
            ENABLE_TLS: boolean;
            SENTINELS: {
                hostname: string;
                port: number;
            }[];
            MASTER_NAME: string;
        };
    };
    SMTP: {
        TRANSPORT: string;
        SENDMAIL: string;
        HOSTNAME: string;
        PORT: number;
        USERNAME: string;
        PASSWORD: string;
        TLS: boolean;
        DISABLE_STARTTLS: boolean;
        CA_FILE: string;
        FROM_ADDRESS: string;
    };
    EMAIL: {
        BODY: {
            SIGNATURE: string;
        };
        SUBJECT: {
            PREFIX: string;
        };
    };
    CLIENT: {
        VIDEOS: {
            MINIATURE: {
                readonly PREFER_AUTHOR_DISPLAY_NAME: boolean;
                readonly DISPLAY_AUTHOR_AVATAR: boolean;
            };
            RESUMABLE_UPLOAD: {
                readonly MAX_CHUNK_SIZE: number;
            };
        };
        MENU: {
            LOGIN: {
                readonly REDIRECT_ON_SINGLE_EXTERNAL_AUTH: boolean;
            };
        };
    };
    DEFAULTS: {
        PUBLISH: {
            DOWNLOAD_ENABLED: boolean;
            COMMENTS_POLICY: VideoCommentPolicyType;
            PRIVACY: VideoPrivacyType;
            LICENCE: number;
        };
        P2P: {
            WEBAPP: {
                ENABLED: boolean;
            };
            EMBED: {
                ENABLED: boolean;
            };
        };
    };
    STORAGE: {
        TMP_DIR: string;
        TMP_PERSISTENT_DIR: string;
        BIN_DIR: string;
        ACTOR_IMAGES_DIR: string;
        LOG_DIR: string;
        WEB_VIDEOS_DIR: string;
        STREAMING_PLAYLISTS_DIR: string;
        ORIGINAL_VIDEO_FILES_DIR: string;
        REDUNDANCY_DIR: string;
        THUMBNAILS_DIR: string;
        STORYBOARDS_DIR: string;
        PREVIEWS_DIR: string;
        CAPTIONS_DIR: string;
        TORRENTS_DIR: string;
        CACHE_DIR: string;
        PLUGINS_DIR: string;
        CLIENT_OVERRIDES_DIR: string;
        WELL_KNOWN_DIR: string;
    };
    STATIC_FILES: {
        PRIVATE_FILES_REQUIRE_AUTH: boolean;
    };
    OBJECT_STORAGE: {
        ENABLED: boolean;
        MAX_UPLOAD_PART: number;
        MAX_REQUEST_ATTEMPTS: number;
        ENDPOINT: string;
        REGION: string;
        UPLOAD_ACL: {
            PUBLIC: string;
            PRIVATE: string;
        };
        CREDENTIALS: {
            ACCESS_KEY_ID: string;
            SECRET_ACCESS_KEY: string;
        };
        PROXY: {
            PROXIFY_PRIVATE_FILES: boolean;
        };
        WEB_VIDEOS: {
            BUCKET_NAME: string;
            PREFIX: string;
            BASE_URL: string;
        };
        STREAMING_PLAYLISTS: {
            BUCKET_NAME: string;
            PREFIX: string;
            BASE_URL: string;
            STORE_LIVE_STREAMS: string;
        };
        USER_EXPORTS: {
            BUCKET_NAME: string;
            PREFIX: string;
            BASE_URL: string;
        };
        ORIGINAL_VIDEO_FILES: {
            BUCKET_NAME: string;
            PREFIX: string;
            BASE_URL: string;
        };
    };
    WEBSERVER: {
        SCHEME: string;
        WS: string;
        HOSTNAME: string;
        PORT: number;
    };
    OAUTH2: {
        TOKEN_LIFETIME: {
            ACCESS_TOKEN: number;
            REFRESH_TOKEN: number;
        };
    };
    RATES_LIMIT: {
        API: {
            WINDOW_MS: number;
            MAX: number;
        };
        SIGNUP: {
            WINDOW_MS: number;
            MAX: number;
        };
        LOGIN: {
            WINDOW_MS: number;
            MAX: number;
        };
        RECEIVE_CLIENT_LOG: {
            WINDOW_MS: number;
            MAX: number;
        };
        ASK_SEND_EMAIL: {
            WINDOW_MS: number;
            MAX: number;
        };
        PLUGINS: {
            WINDOW_MS: number;
            MAX: number;
        };
        WELL_KNOWN: {
            WINDOW_MS: number;
            MAX: number;
        };
        FEEDS: {
            WINDOW_MS: number;
            MAX: number;
        };
        ACTIVITY_PUB: {
            WINDOW_MS: number;
            MAX: number;
        };
        CLIENT: {
            WINDOW_MS: number;
            MAX: number;
        };
        DOWNLOAD_GENERATE_VIDEO: {
            WINDOW_MS: number;
            MAX: number;
        };
    };
    TRUST_PROXY: string[];
    LOG: {
        LEVEL: string;
        ROTATION: {
            ENABLED: boolean;
            MAX_FILE_SIZE: number;
            MAX_FILES: number;
        };
        ANONYMIZE_IP: boolean;
        LOG_PING_REQUESTS: boolean;
        LOG_TRACKER_UNKNOWN_INFOHASH: boolean;
        LOG_HTTP_REQUESTS: boolean;
        PRETTIFY_SQL: boolean;
        ACCEPT_CLIENT_LOG: boolean;
    };
    OPEN_TELEMETRY: {
        METRICS: {
            ENABLED: boolean;
            PLAYBACK_STATS_INTERVAL: number;
            HTTP_REQUEST_DURATION: {
                ENABLED: boolean;
            };
            PROMETHEUS_EXPORTER: {
                HOSTNAME: string;
                PORT: number;
            };
        };
        TRACING: {
            ENABLED: boolean;
            JAEGER_EXPORTER: {
                ENDPOINT: string;
            };
        };
    };
    TRENDING: {
        VIDEOS: {
            INTERVAL_DAYS: number;
            ALGORITHMS: {
                readonly ENABLED: string[];
                readonly DEFAULT: string;
            };
        };
    };
    REDUNDANCY: {
        VIDEOS: {
            CHECK_INTERVAL: number;
            STRATEGIES: VideosRedundancyStrategy[];
        };
    };
    REMOTE_REDUNDANCY: {
        VIDEOS: {
            ACCEPT_FROM: VideoRedundancyConfigFilter;
        };
    };
    CSP: {
        ENABLED: boolean;
        REPORT_ONLY: boolean;
        REPORT_URI: string;
    };
    SECURITY: {
        FRAMEGUARD: {
            ENABLED: boolean;
        };
        POWERED_BY_HEADER: {
            ENABLED: boolean;
        };
    };
    TRACKER: {
        ENABLED: boolean;
        PRIVATE: boolean;
        REJECT_TOO_MANY_ANNOUNCES: boolean;
    };
    HISTORY: {
        VIDEOS: {
            MAX_AGE: number;
        };
    };
    VIEWS: {
        VIDEOS: {
            REMOTE: {
                MAX_AGE: number;
            };
            LOCAL_BUFFER_UPDATE_INTERVAL: number;
            VIEW_EXPIRATION: number;
            COUNT_VIEW_AFTER: number;
            TRUST_VIEWER_SESSION_ID: boolean;
            WATCHING_INTERVAL: {
                ANONYMOUS: number;
                USERS: number;
            };
        };
    };
    GEO_IP: {
        ENABLED: boolean;
        COUNTRY: {
            DATABASE_URL: string;
        };
        CITY: {
            DATABASE_URL: string;
        };
    };
    PLUGINS: {
        INDEX: {
            ENABLED: boolean;
            CHECK_LATEST_VERSIONS_INTERVAL: number;
            URL: string;
        };
    };
    FEDERATION: {
        ENABLED: boolean;
        PREVENT_SSRF: boolean;
        VIDEOS: {
            FEDERATE_UNLISTED: boolean;
            CLEANUP_REMOTE_INTERACTIONS: boolean;
        };
        SIGN_FEDERATED_FETCHES: boolean;
    };
    PEERTUBE: {
        CHECK_LATEST_VERSION: {
            ENABLED: boolean;
            URL: string;
        };
    };
    WEBADMIN: {
        CONFIGURATION: {
            EDITION: {
                ALLOWED: boolean;
            };
        };
    };
    FEEDS: {
        VIDEOS: {
            COUNT: number;
        };
        COMMENTS: {
            COUNT: number;
        };
    };
    REMOTE_RUNNERS: {
        STALLED_JOBS: {
            LIVE: number;
            VOD: number;
        };
    };
    THUMBNAILS: {
        GENERATION_FROM_VIDEO: {
            FRAMES_TO_ANALYZE: number;
        };
        SIZES: {
            width: number;
            height: number;
        }[];
    };
    STATS: {
        REGISTRATION_REQUESTS: {
            ENABLED: boolean;
        };
        ABUSES: {
            ENABLED: boolean;
        };
        TOTAL_MODERATORS: {
            ENABLED: boolean;
        };
        TOTAL_ADMINS: {
            ENABLED: boolean;
        };
    };
    ADMIN: {
        readonly EMAIL: string;
    };
    CONTACT_FORM: {
        readonly ENABLED: boolean;
    };
    SIGNUP: {
        readonly ENABLED: boolean;
        readonly REQUIRES_APPROVAL: boolean;
        readonly LIMIT: number;
        readonly REQUIRES_EMAIL_VERIFICATION: boolean;
        readonly MINIMUM_AGE: number;
        FILTERS: {
            CIDR: {
                readonly WHITELIST: string[];
                readonly BLACKLIST: string[];
            };
        };
    };
    USER: {
        HISTORY: {
            VIDEOS: {
                readonly ENABLED: boolean;
            };
        };
        readonly VIDEO_QUOTA: number;
        readonly VIDEO_QUOTA_DAILY: number;
        readonly DEFAULT_CHANNEL_NAME: string;
    };
    VIDEO_CHANNELS: {
        readonly MAX_PER_USER: number;
    };
    TRANSCODING: {
        readonly ENABLED: boolean;
        ORIGINAL_FILE: {
            readonly KEEP: boolean;
        };
        readonly ALLOW_ADDITIONAL_EXTENSIONS: boolean;
        readonly ALLOW_AUDIO_FILES: boolean;
        readonly THREADS: number;
        readonly CONCURRENCY: number;
        readonly PROFILE: string;
        readonly ALWAYS_TRANSCODE_ORIGINAL_RESOLUTION: boolean;
        RESOLUTIONS: {
            readonly '0p': boolean;
            readonly '144p': boolean;
            readonly '240p': boolean;
            readonly '360p': boolean;
            readonly '480p': boolean;
            readonly '720p': boolean;
            readonly '1080p': boolean;
            readonly '1440p': boolean;
            readonly '2160p': boolean;
        };
        FPS: {
            readonly MAX: number;
        };
        HLS: {
            readonly ENABLED: boolean;
            readonly SPLIT_AUDIO_AND_VIDEO: boolean;
        };
        WEB_VIDEOS: {
            readonly ENABLED: boolean;
        };
        REMOTE_RUNNERS: {
            readonly ENABLED: boolean;
        };
    };
    LIVE: {
        readonly ENABLED: boolean;
        readonly MAX_DURATION: number;
        readonly MAX_INSTANCE_LIVES: number;
        readonly MAX_USER_LIVES: number;
        readonly ALLOW_REPLAY: boolean;
        LATENCY_SETTING: {
            readonly ENABLED: boolean;
        };
        RTMP: {
            readonly ENABLED: boolean;
            readonly PORT: number;
            readonly HOSTNAME: number;
            readonly PUBLIC_HOSTNAME: number;
        };
        RTMPS: {
            readonly ENABLED: boolean;
            readonly PORT: number;
            readonly HOSTNAME: number;
            readonly PUBLIC_HOSTNAME: number;
            readonly KEY_FILE: string;
            readonly CERT_FILE: string;
        };
        TRANSCODING: {
            readonly ENABLED: boolean;
            readonly THREADS: number;
            readonly PROFILE: string;
            readonly ALWAYS_TRANSCODE_ORIGINAL_RESOLUTION: boolean;
            RESOLUTIONS: {
                readonly '0p': boolean;
                readonly '144p': boolean;
                readonly '240p': boolean;
                readonly '360p': boolean;
                readonly '480p': boolean;
                readonly '720p': boolean;
                readonly '1080p': boolean;
                readonly '1440p': boolean;
                readonly '2160p': boolean;
            };
            FPS: {
                readonly MAX: number;
            };
            REMOTE_RUNNERS: {
                readonly ENABLED: boolean;
            };
        };
    };
    VIDEO_STUDIO: {
        readonly ENABLED: boolean;
        REMOTE_RUNNERS: {
            readonly ENABLED: boolean;
        };
    };
    VIDEO_FILE: {
        UPDATE: {
            readonly ENABLED: boolean;
        };
    };
    VIDEO_TRANSCRIPTION: {
        readonly ENABLED: boolean;
        readonly ENGINE: TranscriptionEngineName;
        readonly ENGINE_PATH: string;
        readonly MODEL: WhisperBuiltinModelName;
        readonly MODEL_PATH: string;
        REMOTE_RUNNERS: {
            readonly ENABLED: boolean;
        };
    };
    IMPORT: {
        VIDEOS: {
            readonly CONCURRENCY: number;
            readonly TIMEOUT: number;
            HTTP: {
                readonly ENABLED: boolean;
                YOUTUBE_DL_RELEASE: {
                    readonly URL: string;
                    readonly NAME: string;
                    readonly PYTHON_PATH: string;
                };
                readonly FORCE_IPV4: boolean;
                readonly PROXIES: string[];
            };
            TORRENT: {
                readonly ENABLED: boolean;
            };
        };
        VIDEO_CHANNEL_SYNCHRONIZATION: {
            readonly ENABLED: boolean;
            readonly MAX_PER_USER: number;
            readonly CHECK_INTERVAL: number;
            readonly VIDEOS_LIMIT_PER_SYNCHRONIZATION: number;
            readonly FULL_SYNC_VIDEOS_LIMIT: number;
        };
        USERS: {
            readonly ENABLED: boolean;
        };
    };
    EXPORT: {
        USERS: {
            readonly ENABLED: boolean;
            readonly MAX_USER_VIDEO_QUOTA: number;
            readonly EXPORT_EXPIRATION: number;
        };
    };
    AUTO_BLACKLIST: {
        VIDEOS: {
            OF_USERS: {
                readonly ENABLED: boolean;
            };
        };
    };
    CACHE: {
        PREVIEWS: {
            readonly SIZE: number;
        };
        VIDEO_CAPTIONS: {
            readonly SIZE: number;
        };
        TORRENTS: {
            readonly SIZE: number;
        };
        STORYBOARDS: {
            readonly SIZE: number;
        };
    };
    INSTANCE: {
        readonly NAME: string;
        readonly SHORT_DESCRIPTION: string;
        readonly DESCRIPTION: string;
        readonly TERMS: string;
        readonly CODE_OF_CONDUCT: string;
        readonly CREATION_REASON: string;
        readonly MODERATION_INFORMATION: string;
        readonly ADMINISTRATOR: string;
        readonly MAINTENANCE_LIFETIME: string;
        readonly BUSINESS_MODEL: string;
        readonly HARDWARE_INFORMATION: string;
        readonly LANGUAGES: string[];
        readonly CATEGORIES: number[];
        readonly IS_NSFW: boolean;
        readonly DEFAULT_NSFW_POLICY: NSFWPolicyType;
        readonly DEFAULT_CLIENT_ROUTE: string;
        CUSTOMIZATIONS: {
            readonly JAVASCRIPT: string;
            readonly CSS: string;
        };
        readonly ROBOTS: string;
        readonly SECURITYTXT: string;
    };
    SERVICES: {
        TWITTER: {
            readonly USERNAME: string;
        };
    };
    FOLLOWERS: {
        INSTANCE: {
            readonly ENABLED: boolean;
            readonly MANUAL_APPROVAL: boolean;
        };
    };
    FOLLOWINGS: {
        INSTANCE: {
            AUTO_FOLLOW_BACK: {
                readonly ENABLED: boolean;
            };
            AUTO_FOLLOW_INDEX: {
                readonly ENABLED: boolean;
                readonly INDEX_URL: string;
            };
        };
    };
    THEME: {
        readonly DEFAULT: string;
    };
    BROADCAST_MESSAGE: {
        readonly ENABLED: boolean;
        readonly MESSAGE: string;
        readonly LEVEL: BroadcastMessageLevel;
        readonly DISMISSABLE: boolean;
    };
    SEARCH: {
        REMOTE_URI: {
            readonly USERS: boolean;
            readonly ANONYMOUS: boolean;
        };
        SEARCH_INDEX: {
            readonly ENABLED: boolean;
            readonly URL: string;
            readonly DISABLE_LOCAL_SEARCH: boolean;
            readonly IS_DEFAULT_SEARCH: boolean;
        };
    };
    STORYBOARDS: {
        readonly ENABLED: boolean;
    };
};
declare function registerConfigChangedHandler(fun: Function): void;
declare function isEmailEnabled(): boolean;
declare function getLocalConfigFilePath(): string;
declare function getConfigModule(): IConfig;
export { CONFIG, getConfigModule, getLocalConfigFilePath, registerConfigChangedHandler, isEmailEnabled };
export declare function reloadConfig(): Promise<void>;
//# sourceMappingURL=config.d.ts.map