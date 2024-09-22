export declare const ServerErrorCode: {
    readonly MAX_FILE_SIZE_REACHED: "max_file_size_reached";
    readonly QUOTA_REACHED: "quota_reached";
    readonly DOES_NOT_RESPECT_FOLLOW_CONSTRAINTS: "does_not_respect_follow_constraints";
    readonly LIVE_NOT_ENABLED: "live_not_enabled";
    readonly LIVE_NOT_ALLOWING_REPLAY: "live_not_allowing_replay";
    readonly LIVE_CONFLICTING_PERMANENT_AND_SAVE_REPLAY: "live_conflicting_permanent_and_save_replay";
    readonly MAX_INSTANCE_LIVES_LIMIT_REACHED: "max_instance_lives_limit_reached";
    readonly MAX_USER_LIVES_LIMIT_REACHED: "max_user_lives_limit_reached";
    readonly INCORRECT_FILES_IN_TORRENT: "incorrect_files_in_torrent";
    readonly COMMENT_NOT_ASSOCIATED_TO_VIDEO: "comment_not_associated_to_video";
    readonly MISSING_TWO_FACTOR: "missing_two_factor";
    readonly INVALID_TWO_FACTOR: "invalid_two_factor";
    readonly ACCOUNT_WAITING_FOR_APPROVAL: "account_waiting_for_approval";
    readonly ACCOUNT_APPROVAL_REJECTED: "account_approval_rejected";
    readonly RUNNER_JOB_NOT_IN_PROCESSING_STATE: "runner_job_not_in_processing_state";
    readonly RUNNER_JOB_NOT_IN_PENDING_STATE: "runner_job_not_in_pending_state";
    readonly UNKNOWN_RUNNER_TOKEN: "unknown_runner_token";
    readonly VIDEO_REQUIRES_PASSWORD: "video_requires_password";
    readonly INCORRECT_VIDEO_PASSWORD: "incorrect_video_password";
    readonly VIDEO_ALREADY_BEING_TRANSCODED: "video_already_being_transcoded";
    readonly VIDEO_ALREADY_BEING_TRANSCRIBED: "video_already_being_transcribed";
    readonly VIDEO_ALREADY_HAS_CAPTIONS: "video_already_has_captions";
    readonly MAX_USER_VIDEO_QUOTA_EXCEEDED_FOR_USER_EXPORT: "max_user_video_quota_exceeded_for_user_export";
    readonly CURRENT_PASSWORD_IS_INVALID: "current_password_is_invalid";
};
export declare const OAuth2ErrorCode: {
    readonly INVALID_GRANT: "invalid_grant";
    readonly INVALID_CLIENT: "invalid_client";
    readonly INVALID_TOKEN: "invalid_token";
};
export type OAuth2ErrorCodeType = typeof OAuth2ErrorCode[keyof typeof OAuth2ErrorCode];
export type ServerErrorCodeType = typeof ServerErrorCode[keyof typeof ServerErrorCode];
//# sourceMappingURL=server-error-code.enum.d.ts.map