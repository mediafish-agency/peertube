import { HttpStatusCodeType } from '../http/http-status-codes.js';
import { OAuth2ErrorCodeType, ServerErrorCodeType } from './server-error-code.enum.js';
export interface PeerTubeProblemDocumentData {
    'invalid-params'?: Record<string, object>;
    originUrl?: string;
    keyId?: string;
    targetUrl?: string;
    actorUrl?: string;
    format?: string;
    url?: string;
}
export interface PeerTubeProblemDocument extends PeerTubeProblemDocumentData {
    type: string;
    title: string;
    detail: string;
    error: string;
    status: HttpStatusCodeType;
    docs?: string;
    code?: OAuth2ErrorCodeType | ServerErrorCodeType;
}
//# sourceMappingURL=peertube-problem-document.model.d.ts.map