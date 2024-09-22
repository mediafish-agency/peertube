import { AbstractCommand } from '../shared/index.js';
export declare class CLICommand extends AbstractCommand {
    static exec(command: string): Promise<string>;
    getEnv(): string;
    execWithEnv(command: string, configOverride?: any): Promise<string>;
}
//# sourceMappingURL=cli-command.d.ts.map