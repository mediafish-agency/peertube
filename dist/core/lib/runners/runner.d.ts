import { MRunner, MRunnerJob } from '../../types/models/runners/index.js';
import express from 'express';
declare function updateLastRunnerContact(req: express.Request, runner: MRunner): void;
declare function runnerJobCanBeCancelled(runnerJob: MRunnerJob): boolean;
export { updateLastRunnerContact, runnerJobCanBeCancelled };
//# sourceMappingURL=runner.d.ts.map