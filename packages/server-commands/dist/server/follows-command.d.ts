import { ActivityPubActorType, ActorFollow, FollowState, ResultList } from '@peertube/peertube-models';
import { AbstractCommand, OverrideCommandOptions } from '../shared/index.js';
import { PeerTubeServer } from './server.js';
export declare class FollowsCommand extends AbstractCommand {
    getFollowers(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
        actorType?: ActivityPubActorType;
        state?: FollowState;
    }): Promise<ResultList<ActorFollow>>;
    getFollowings(options?: OverrideCommandOptions & {
        start?: number;
        count?: number;
        sort?: string;
        search?: string;
        actorType?: ActivityPubActorType;
        state?: FollowState;
    }): Promise<ResultList<ActorFollow>>;
    follow(options: OverrideCommandOptions & {
        hosts?: string[];
        handles?: string[];
    }): import("supertest").Test;
    unfollow(options: OverrideCommandOptions & {
        target: PeerTubeServer | string;
    }): Promise<import("superagent/lib/node/response.js")>;
    acceptFollower(options: OverrideCommandOptions & {
        follower: string;
    }): import("supertest").Test;
    rejectFollower(options: OverrideCommandOptions & {
        follower: string;
    }): import("supertest").Test;
    removeFollower(options: OverrideCommandOptions & {
        follower: PeerTubeServer;
    }): import("supertest").Test;
}
//# sourceMappingURL=follows-command.d.ts.map