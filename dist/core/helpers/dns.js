import { lookup } from 'dns';
import ipaddr from 'ipaddr.js';
function dnsLookupAll(hostname) {
    return new Promise((res, rej) => {
        lookup(hostname, { family: 0, all: true }, (err, adresses) => {
            if (err)
                return rej(err);
            return res(adresses.map(a => a.address));
        });
    });
}
async function isResolvingToUnicastOnly(hostname) {
    const addresses = await dnsLookupAll(hostname);
    for (const address of addresses) {
        const parsed = ipaddr.parse(address);
        if (parsed.range() !== 'unicast')
            return false;
    }
    return true;
}
export { dnsLookupAll, isResolvingToUnicastOnly };
//# sourceMappingURL=dns.js.map