import express from 'express';
import { logger, loggerTagsFactory } from '../../../helpers/logger.js';
import { generateRunnerRegistrationToken } from '../../../helpers/token-generator.js';
import { apiRateLimiter, asyncMiddleware, authenticate, ensureUserHasRight, paginationValidator, runnerRegistrationTokensSortValidator, setDefaultPagination, setDefaultSort } from '../../../middlewares/index.js';
import { deleteRegistrationTokenValidator } from '../../../middlewares/validators/runners/index.js';
import { RunnerRegistrationTokenModel } from '../../../models/runner/runner-registration-token.js';
import { HttpStatusCode, UserRight } from '@peertube/peertube-models';
const lTags = loggerTagsFactory('api', 'runner');
const runnerRegistrationTokensRouter = express.Router();
runnerRegistrationTokensRouter.post('/registration-tokens/generate', apiRateLimiter, authenticate, ensureUserHasRight(UserRight.MANAGE_RUNNERS), asyncMiddleware(generateRegistrationToken));
runnerRegistrationTokensRouter.delete('/registration-tokens/:id', apiRateLimiter, authenticate, ensureUserHasRight(UserRight.MANAGE_RUNNERS), asyncMiddleware(deleteRegistrationTokenValidator), asyncMiddleware(deleteRegistrationToken));
runnerRegistrationTokensRouter.get('/registration-tokens', apiRateLimiter, authenticate, ensureUserHasRight(UserRight.MANAGE_RUNNERS), paginationValidator, runnerRegistrationTokensSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listRegistrationTokens));
export { runnerRegistrationTokensRouter };
async function generateRegistrationToken(req, res) {
    logger.info('Generating new runner registration token.', lTags());
    const registrationToken = new RunnerRegistrationTokenModel({
        registrationToken: generateRunnerRegistrationToken()
    });
    await registrationToken.save();
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function deleteRegistrationToken(req, res) {
    logger.info('Removing runner registration token.', lTags());
    const runnerRegistrationToken = res.locals.runnerRegistrationToken;
    await runnerRegistrationToken.destroy();
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function listRegistrationTokens(req, res) {
    const query = req.query;
    const resultList = await RunnerRegistrationTokenModel.listForApi({
        start: query.start,
        count: query.count,
        sort: query.sort
    });
    return res.json({
        total: resultList.total,
        data: resultList.data.map(d => d.toFormattedJSON())
    });
}
//# sourceMappingURL=registration-tokens.js.map