import express from 'express';
import { UserRightType } from '@peertube/peertube-models';
declare function ensureUserHasRight(userRight: UserRightType): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export { ensureUserHasRight };
//# sourceMappingURL=user-right.d.ts.map