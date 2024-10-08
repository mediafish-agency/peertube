import express from 'express';
import { HttpStatusCode } from '@peertube/peertube-models';
import { logger } from '../../../helpers/logger.js';
import { Emailer } from '../../../lib/emailer.js';
import { Redis } from '../../../lib/redis.js';
import { asyncMiddleware, contactAdministratorValidator } from '../../../middlewares/index.js';
const contactRouter = express.Router();
contactRouter.post('/contact', asyncMiddleware(contactAdministratorValidator), asyncMiddleware(contactAdministrator));
async function contactAdministrator(req, res) {
    const data = req.body;
    Emailer.Instance.addContactFormJob(data.fromEmail, data.fromName, data.subject, data.body);
    try {
        await Redis.Instance.setContactFormIp(req.ip);
    }
    catch (err) {
        logger.error(err);
    }
    return res.status(HttpStatusCode.NO_CONTENT_204).end();
}
export { contactRouter };
//# sourceMappingURL=contact.js.map