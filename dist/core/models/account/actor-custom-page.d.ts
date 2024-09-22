import { CustomPage } from '@peertube/peertube-models';
import { ActorModel } from '../actor/actor.js';
import { SequelizeModel } from '../shared/index.js';
export declare class ActorCustomPageModel extends SequelizeModel<ActorCustomPageModel> {
    content: string;
    type: 'homepage';
    createdAt: Date;
    updatedAt: Date;
    actorId: number;
    Actor: Awaited<ActorModel>;
    static updateInstanceHomepage(content: string): Promise<[ActorCustomPageModel, boolean]>;
    static loadInstanceHomepage(): Promise<ActorCustomPageModel>;
    toFormattedJSON(): CustomPage;
}
//# sourceMappingURL=actor-custom-page.d.ts.map