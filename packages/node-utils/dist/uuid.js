import short from 'short-uuid';
const translator = short();
function buildUUID() {
    return short.uuid();
}
function buildSUUID() {
    return short.generate();
}
function uuidToShort(uuid) {
    if (!uuid)
        return uuid;
    return translator.fromUUID(uuid);
}
function shortToUUID(shortUUID) {
    if (!shortUUID)
        return shortUUID;
    return translator.toUUID(shortUUID);
}
function isShortUUID(value) {
    if (!value)
        return false;
    return value.length === translator.maxLength;
}
export { buildUUID, buildSUUID, uuidToShort, shortToUUID, isShortUUID };
//# sourceMappingURL=uuid.js.map