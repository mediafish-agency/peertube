import 'multer';
import express from 'express';
import { HttpStatusCode } from '@peertube/peertube-models';
import { getFormattedObjects } from '../../../helpers/utils.js';
import { addAccountInBlocklist, addServerInBlocklist, removeAccountFromBlocklist, removeServerFromBlocklist } from '../../../lib/blocklist.js';
import { asyncMiddleware, asyncRetryTransactionMiddleware, authenticate, paginationValidator, setDefaultPagination, setDefaultSort, unblockAccountByAccountValidator } from '../../../middlewares/index.js';
import { accountsBlocklistSortValidator, blockAccountValidator, blockServerValidator, serversBlocklistSortValidator, unblockServerByAccountValidator } from '../../../middlewares/validators/index.js';
import { AccountBlocklistModel } from '../../../models/account/account-blocklist.js';
import { ServerBlocklistModel } from '../../../models/server/server-blocklist.js';
const myBlocklistRouter = express.Router();
myBlocklistRouter.get('/me/blocklist/accounts', authenticate, paginationValidator, accountsBlocklistSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listBlockedAccounts));
myBlocklistRouter.post('/me/blocklist/accounts', authenticate, asyncMiddleware(blockAccountValidator), asyncRetryTransactionMiddleware(blockAccount));
myBlocklistRouter.delete('/me/blocklist/accounts/:accountName', authenticate, asyncMiddleware(unblockAccountByAccountValidator), asyncRetryTransactionMiddleware(unblockAccount));
myBlocklistRouter.get('/me/blocklist/servers', authenticate, paginationValidator, serversBlocklistSortValidator, setDefaultSort, setDefaultPagination, asyncMiddleware(listBlockedServers));
myBlocklistRouter.post('/me/blocklist/servers', authenticate, asyncMiddleware(blockServerValidator), asyncRetryTransactionMiddleware(blockServer));
myBlocklistRouter.delete('/me/blocklist/servers/:host', authenticate, asyncMiddleware(unblockServerByAccountValidator), asyncRetryTransactionMiddleware(unblockServer));
export { myBlocklistRouter };
async function listBlockedAccounts(req, res) {
    const user = res.locals.oauth.token.User;
    const resultList = await AccountBlocklistModel.listForApi({
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        search: req.query.search,
        accountId: user.Account.id
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function blockAccount(req, res) {
    const user = res.locals.oauth.token.User;
    const accountToBlock = res.locals.account;
    await addAccountInBlocklist({ byAccountId: user.Account.id, targetAccountId: accountToBlock.id, removeNotificationOfUserId: user.id });
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function unblockAccount(req, res) {
    const accountBlock = res.locals.accountBlock;
    await removeAccountFromBlocklist(accountBlock);
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
async function listBlockedServers(req, res) {
    const user = res.locals.oauth.token.User;
    const resultList = await ServerBlocklistModel.listForApi({
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        search: req.query.search,
        accountId: user.Account.id
    });
    return res.json(getFormattedObjects(resultList.data, resultList.total));
}
async function blockServer(req, res) {
    const user = res.locals.oauth.token.User;
    const serverToBlock = res.locals.server;
    await addServerInBlocklist({
        byAccountId: user.Account.id,
        targetServerId: serverToBlock.id,
        removeNotificationOfUserId: user.id
    });
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
async function unblockServer(req, res) {
    const serverBlock = res.locals.serverBlock;
    await removeServerFromBlocklist(serverBlock);
    return res.sendStatus(HttpStatusCode.NO_CONTENT_204);
}
//# sourceMappingURL=my-blocklist.js.map