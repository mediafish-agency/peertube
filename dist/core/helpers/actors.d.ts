import { ActivityPubActorType } from '@peertube/peertube-models';
export declare function handleToNameAndHost(handle: string): {
    name: string;
    host: string;
    handle: string;
};
export declare function handlesToNameAndHost(handles: string[]): {
    name: string;
    host: string;
    handle: string;
}[];
export declare function isAccountActor(type: ActivityPubActorType): boolean;
export declare function isChannelActor(type: ActivityPubActorType): type is "Group";
//# sourceMappingURL=actors.d.ts.map