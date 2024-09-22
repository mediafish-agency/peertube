import { Response } from 'express';
import { MUserId } from '../../types/models/index.js';
import { MVideoChangeOwnershipFull } from '../../types/models/video/video-change-ownership.js';
declare function checkUserCanTerminateOwnershipChange(user: MUserId, videoChangeOwnership: MVideoChangeOwnershipFull, res: Response): boolean;
export { checkUserCanTerminateOwnershipChange };
//# sourceMappingURL=video-ownership.d.ts.map