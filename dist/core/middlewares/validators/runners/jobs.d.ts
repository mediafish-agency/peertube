import { RunnerJobStateType } from '@peertube/peertube-models';
import express from 'express';
export declare const acceptRunnerJobValidator: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const abortRunnerJobValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export declare const updateRunnerJobValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export declare const errorRunnerJobValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export declare const successRunnerJobValidator: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const cancelRunnerJobValidator: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[];
export declare const listRunnerJobsValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => void))[];
export declare const runnerJobGetValidator: (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
export declare function jobOfRunnerGetValidatorFactory(allowedStates: RunnerJobStateType[]): (import("express-validator").ValidationChain | ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>))[];
//# sourceMappingURL=jobs.d.ts.map