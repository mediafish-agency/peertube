import express from 'express';
import { AbuseModel } from '../../../models/abuse/abuse.js';
import { abuseListForUserValidator, abusesSortValidator, asyncMiddleware, authenticate, paginationValidator, setDefaultPagination, setDefaultSort } from '../../../middlewares/index.js';
const myAbusesRouter = express.Router();
myAbusesRouter.get('/me/abuses', authenticate, paginationValidator, abusesSortValidator, setDefaultSort, setDefaultPagination, abuseListForUserValidator, asyncMiddleware(listMyAbuses));
export { myAbusesRouter };
async function listMyAbuses(req, res) {
    const resultList = await AbuseModel.listForUserApi({
        start: req.query.start,
        count: req.query.count,
        sort: req.query.sort,
        id: req.query.id,
        search: req.query.search,
        state: req.query.state,
        user: res.locals.oauth.token.User
    });
    return res.json({
        total: resultList.total,
        data: resultList.data.map(d => d.toFormattedUserJSON())
    });
}
//# sourceMappingURL=my-abuses.js.map