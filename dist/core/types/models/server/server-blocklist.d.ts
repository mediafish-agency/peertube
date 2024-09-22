import { ServerBlocklistModel } from '../../../models/server/server-blocklist.js';
import { PickWith } from '@peertube/peertube-typescript-utils';
import { MAccountDefault, MAccountFormattable } from '../account/account.js';
import { MServer, MServerFormattable } from './server.js';
type Use<K extends keyof ServerBlocklistModel, M> = PickWith<ServerBlocklistModel, K, M>;
export type MServerBlocklist = Omit<ServerBlocklistModel, 'ByAccount' | 'BlockedServer'>;
export type MServerBlocklistAccountServer = MServerBlocklist & Use<'ByAccount', MAccountDefault> & Use<'BlockedServer', MServer>;
export type MServerBlocklistFormattable = Pick<MServerBlocklist, 'createdAt'> & Use<'ByAccount', MAccountFormattable> & Use<'BlockedServer', MServerFormattable>;
export {};
//# sourceMappingURL=server-blocklist.d.ts.map