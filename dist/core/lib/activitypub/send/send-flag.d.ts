import { Transaction } from 'sequelize';
import { MAbuseAP, MAccountLight, MActor } from '../../../types/models/index.js';
declare function sendAbuse(byActor: MActor, abuse: MAbuseAP, flaggedAccount: MAccountLight, t: Transaction): void;
export { sendAbuse };
//# sourceMappingURL=send-flag.d.ts.map