import { Account } from '../actors/index.js';
export interface ServerBlock {
    byAccount: Account;
    blockedServer: {
        host: string;
    };
    createdAt: Date | string;
}
//# sourceMappingURL=server-block.model.d.ts.map