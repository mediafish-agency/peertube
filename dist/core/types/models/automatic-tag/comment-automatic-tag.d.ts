import { PickWith } from '@peertube/peertube-typescript-utils';
import { CommentAutomaticTagModel } from '../../../models/automatic-tag/comment-automatic-tag.js';
import { MAutomaticTag } from './automatic-tag.js';
type Use<K extends keyof CommentAutomaticTagModel, M> = PickWith<CommentAutomaticTagModel, K, M>;
export type MCommentAutomaticTag = Omit<CommentAutomaticTagModel, 'Account' | 'VideoComment' | 'AutomaticTag'>;
export type MCommentAutomaticTagWithTag = MCommentAutomaticTag & Use<'AutomaticTag', MAutomaticTag>;
export {};
//# sourceMappingURL=comment-automatic-tag.d.ts.map