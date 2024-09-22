type StringBoolean = 'true' | 'false';
export type EmbedMarkupData = {
    uuid: string;
};
export type VideoMiniatureMarkupData = {
    uuid: string;
    onlyDisplayTitle?: StringBoolean;
};
export type PlaylistMiniatureMarkupData = {
    uuid: string;
};
export type ChannelMiniatureMarkupData = {
    name: string;
    displayLatestVideo?: StringBoolean;
    displayDescription?: StringBoolean;
};
export type VideosListMarkupData = {
    onlyDisplayTitle?: StringBoolean;
    maxRows?: string;
    sort?: string;
    count?: string;
    categoryOneOf?: string;
    languageOneOf?: string;
    channelHandle?: string;
    accountHandle?: string;
    isLive?: string;
    onlyLocal?: StringBoolean;
};
export type ButtonMarkupData = {
    theme: 'primary' | 'secondary';
    href: string;
    label: string;
    blankTarget?: StringBoolean;
};
export type ContainerMarkupData = {
    width?: string;
    title?: string;
    description?: string;
    layout?: 'row' | 'column';
    justifyContent?: 'space-between' | 'normal';
};
export type InstanceBannerMarkupData = {
    revertHomePaddingTop?: StringBoolean;
};
export type InstanceAvatarMarkupData = {
    size: string;
};
export {};
//# sourceMappingURL=custom-markup-data.model.d.ts.map