import { MAbuseMessage, MAbuseMessageFormattable } from '../../types/models/index.js';
import { AbuseMessage } from '@peertube/peertube-models';
import { AccountModel } from '../account/account.js';
import { SequelizeModel } from '../shared/index.js';
import { AbuseModel } from './abuse.js';
export declare class AbuseMessageModel extends SequelizeModel<AbuseMessageModel> {
    message: string;
    byModerator: boolean;
    createdAt: Date;
    updatedAt: Date;
    accountId: number;
    Account: Awaited<AccountModel>;
    abuseId: number;
    Abuse: Awaited<AbuseModel>;
    static listForApi(abuseId: number): Promise<{
        total: number;
        data: AbuseMessageModel[];
    }>;
    static loadByIdAndAbuseId(messageId: number, abuseId: number): Promise<MAbuseMessage>;
    toFormattedJSON(this: MAbuseMessageFormattable): AbuseMessage;
}
//# sourceMappingURL=abuse-message.d.ts.map