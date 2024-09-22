import { RunnerJobState } from '@peertube/peertube-models';
import { retryTransactionWrapper } from '../../helpers/database-utils.js';
import { logger, loggerTagsFactory } from '../../helpers/logger.js';
import { RUNNER_JOBS } from '../../initializers/constants.js';
import { sequelizeTypescript } from '../../initializers/database.js';
const lTags = loggerTagsFactory('runner');
const updatingRunner = new Set();
function updateLastRunnerContact(req, runner) {
    const now = new Date();
    if (now.getTime() - runner.lastContact.getTime() < RUNNER_JOBS.LAST_CONTACT_UPDATE_INTERVAL)
        return;
    if (updatingRunner.has(runner.id))
        return;
    updatingRunner.add(runner.id);
    runner.lastContact = now;
    runner.ip = req.ip;
    logger.debug('Updating last runner contact for %s', runner.name, lTags(runner.name));
    retryTransactionWrapper(() => {
        return sequelizeTypescript.transaction(async (transaction) => {
            return runner.save({ transaction });
        });
    })
        .catch(err => logger.error('Cannot update last runner contact for %s', runner.name, Object.assign({ err }, lTags(runner.name))))
        .finally(() => updatingRunner.delete(runner.id));
}
function runnerJobCanBeCancelled(runnerJob) {
    const allowedStates = new Set([
        RunnerJobState.PENDING,
        RunnerJobState.PROCESSING,
        RunnerJobState.WAITING_FOR_PARENT_JOB
    ]);
    return allowedStates.has(runnerJob.state);
}
export { updateLastRunnerContact, runnerJobCanBeCancelled };
//# sourceMappingURL=runner.js.map