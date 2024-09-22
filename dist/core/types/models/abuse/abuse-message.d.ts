import { AbuseMessageModel } from '../../../models/abuse/abuse-message.js';
import { PickWith } from '@peertube/peertube-typescript-utils';
import { AbuseModel } from '../../../models/abuse/abuse.js';
import { MAccountFormattable } from '../account/index.js';
type Use<K extends keyof AbuseMessageModel, M> = PickWith<AbuseMessageModel, K, M>;
export type MAbuseMessage = Omit<AbuseMessageModel, 'Account' | 'Abuse' | 'toFormattedJSON'>;
export type MAbuseMessageId = Pick<AbuseModel, 'id'>;
export type MAbuseMessageFormattable = MAbuseMessage & Use<'Account', MAccountFormattable>;
export {};
//# sourceMappingURL=abuse-message.d.ts.map