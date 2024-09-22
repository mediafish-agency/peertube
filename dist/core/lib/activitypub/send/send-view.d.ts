import { Transaction } from 'sequelize';
import { MActorLight, MVideoImmutable } from '../../../types/models/index.js';
declare function sendView(options: {
    byActor: MActorLight;
    video: MVideoImmutable;
    viewerIdentifier: string;
    viewersCount?: number;
    transaction?: Transaction;
}): Promise<any>;
export { sendView };
//# sourceMappingURL=send-view.d.ts.map