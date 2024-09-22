import { PeerTubeServer } from './server.js';
declare function waitJobs(serversArg: PeerTubeServer[] | PeerTubeServer, options?: {
    skipDelayed?: boolean;
    runnerJobs?: boolean;
}): Promise<void>;
declare function expectNoFailedTranscodingJob(server: PeerTubeServer): Promise<void>;
export { waitJobs, expectNoFailedTranscodingJob };
//# sourceMappingURL=jobs.d.ts.map