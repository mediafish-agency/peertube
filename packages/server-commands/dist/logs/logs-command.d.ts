import { ClientLogCreate, ServerLogLevel } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
export declare class LogsCommand extends AbstractCommand {
    createLogClient(options: OverrideCommandOptions & {
        payload: ClientLogCreate;
    }): import("supertest").Test;
    getLogs(options: OverrideCommandOptions & {
        startDate: Date;
        endDate?: Date;
        level?: ServerLogLevel;
        tagsOneOf?: string[];
    }): Promise<any[]>;
    getAuditLogs(options: OverrideCommandOptions & {
        startDate: Date;
        endDate?: Date;
    }): Promise<unknown>;
}
//# sourceMappingURL=logs-command.d.ts.map