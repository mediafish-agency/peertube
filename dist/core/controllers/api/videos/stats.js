import express from 'express';
import { LocalVideoViewerModel } from '../../../models/view/local-video-viewer.js';
import { asyncMiddleware, authenticate, videoOverallStatsValidator, videoRetentionStatsValidator, videoTimeserieStatsValidator } from '../../../middlewares/index.js';
const statsRouter = express.Router();
statsRouter.get('/:videoId/stats/overall', authenticate, asyncMiddleware(videoOverallStatsValidator), asyncMiddleware(getOverallStats));
statsRouter.get('/:videoId/stats/timeseries/:metric', authenticate, asyncMiddleware(videoTimeserieStatsValidator), asyncMiddleware(getTimeserieStats));
statsRouter.get('/:videoId/stats/retention', authenticate, asyncMiddleware(videoRetentionStatsValidator), asyncMiddleware(getRetentionStats));
export { statsRouter };
async function getOverallStats(req, res) {
    const video = res.locals.videoAll;
    const query = req.query;
    const stats = await LocalVideoViewerModel.getOverallStats({
        video,
        startDate: query.startDate,
        endDate: query.endDate
    });
    return res.json(stats);
}
async function getRetentionStats(req, res) {
    const video = res.locals.videoAll;
    const stats = await LocalVideoViewerModel.getRetentionStats(video);
    return res.json(stats);
}
async function getTimeserieStats(req, res) {
    var _a, _b;
    const video = res.locals.videoAll;
    const metric = req.params.metric;
    const query = req.query;
    const stats = await LocalVideoViewerModel.getTimeserieStats({
        video,
        metric,
        startDate: (_a = query.startDate) !== null && _a !== void 0 ? _a : video.createdAt.toISOString(),
        endDate: (_b = query.endDate) !== null && _b !== void 0 ? _b : new Date().toISOString()
    });
    return res.json(stats);
}
//# sourceMappingURL=stats.js.map