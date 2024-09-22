import { createHash } from 'crypto';
export function sha256(str, encoding = 'hex') {
    return createHash('sha256').update(str).digest(encoding);
}
export function sha1(str, encoding = 'hex') {
    return createHash('sha1').update(str).digest(encoding);
}
//# sourceMappingURL=crypto.js.map