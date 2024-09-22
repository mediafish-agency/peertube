import { PeerTubeRequestOptions } from '../../../helpers/requests.js';
declare function httpBroadcast(payload: {
    uris: string[];
    requestOptions: PeerTubeRequestOptions;
}): Promise<{
    goodUrls: string[];
    badUrls: string[];
}>;
export default httpBroadcast;
//# sourceMappingURL=http-broadcast.d.ts.map