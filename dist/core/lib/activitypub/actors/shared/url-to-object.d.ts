import { ActivityPubActor } from '@peertube/peertube-models';
declare function fetchRemoteActor(actorUrl: string): Promise<{
    statusCode: number;
    actorObject: ActivityPubActor;
}>;
declare function fetchActorFollowsCount(actorObject: ActivityPubActor): Promise<{
    followersCount: number;
    followingCount: number;
}>;
export { fetchActorFollowsCount, fetchRemoteActor };
//# sourceMappingURL=url-to-object.d.ts.map