import { exists } from './misc.js';
function isValidRSSFeed(value) {
    if (!exists(value))
        return false;
    const feedExtensions = [
        'xml',
        'json',
        'json1',
        'rss',
        'rss2',
        'atom',
        'atom1'
    ];
    return feedExtensions.includes(value);
}
export { isValidRSSFeed };
//# sourceMappingURL=feeds.js.map