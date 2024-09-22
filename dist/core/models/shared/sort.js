import { literal, Sequelize } from 'sequelize';
function getSort(value, lastSort = ['id', 'ASC']) {
    const { direction, field } = buildSortDirectionAndField(value);
    let finalField;
    if (field.toLowerCase() === 'match') {
        finalField = Sequelize.col('similarity');
    }
    else {
        finalField = field;
    }
    return [[finalField, direction], lastSort];
}
function getAdminUsersSort(value) {
    const { direction, field } = buildSortDirectionAndField(value);
    let finalField;
    if (field === 'videoQuotaUsed') {
        finalField = Sequelize.col('videoQuotaUsed');
    }
    else {
        finalField = field;
    }
    const nullPolicy = direction === 'ASC'
        ? 'NULLS FIRST'
        : 'NULLS LAST';
    return [[finalField, direction, nullPolicy], ['id', 'ASC']];
}
function getPlaylistSort(value, lastSort = ['id', 'ASC']) {
    const { direction, field } = buildSortDirectionAndField(value);
    if (field.toLowerCase() === 'name') {
        return [['displayName', direction], lastSort];
    }
    return getSort(value, lastSort);
}
function getVideoSort(value, lastSort = ['id', 'ASC']) {
    const { direction, field } = buildSortDirectionAndField(value);
    if (field.toLowerCase() === 'trending') {
        return [
            [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('VideoViews.views')), '0'), direction],
            [Sequelize.col('VideoModel.views'), direction],
            lastSort
        ];
    }
    else if (field === 'publishedAt') {
        return [
            ['ScheduleVideoUpdate', 'updateAt', direction + ' NULLS LAST'],
            [Sequelize.col('VideoModel.publishedAt'), direction],
            lastSort
        ];
    }
    let finalField;
    if (field.toLowerCase() === 'match') {
        finalField = Sequelize.col('similarity');
    }
    else {
        finalField = field;
    }
    const firstSort = typeof finalField === 'string'
        ? finalField.split('.').concat([direction])
        : [finalField, direction];
    return [firstSort, lastSort];
}
function getBlacklistSort(value, lastSort = ['id', 'ASC']) {
    const { direction, field } = buildSortDirectionAndField(value);
    const videoFields = new Set(['name', 'duration', 'views', 'likes', 'dislikes', 'uuid']);
    if (videoFields.has(field)) {
        return [
            [literal(`"Video.${field}" ${direction}`)],
            lastSort
        ];
    }
    return getSort(value, lastSort);
}
function getInstanceFollowsSort(value, lastSort = ['id', 'ASC']) {
    const { direction, field } = buildSortDirectionAndField(value);
    if (field === 'redundancyAllowed') {
        return [
            ['ActorFollowing.Server.redundancyAllowed', direction],
            lastSort
        ];
    }
    return getSort(value, lastSort);
}
function getChannelSyncSort(value) {
    const { direction, field } = buildSortDirectionAndField(value);
    if (field.toLowerCase() === 'videochannel') {
        return [
            [literal('"VideoChannel.name"'), direction]
        ];
    }
    return [[field, direction]];
}
function buildSortDirectionAndField(value) {
    let field;
    let direction;
    if (value.substring(0, 1) === '-') {
        direction = 'DESC';
        field = value.substring(1);
    }
    else {
        direction = 'ASC';
        field = value;
    }
    return { direction, field };
}
export { buildSortDirectionAndField, getPlaylistSort, getSort, getAdminUsersSort, getVideoSort, getBlacklistSort, getChannelSyncSort, getInstanceFollowsSort };
//# sourceMappingURL=sort.js.map