import Bluebird from 'bluebird';
import { ServerActionHookName, ServerFilterHookName } from '@peertube/peertube-models';
type PromiseFunction<U, T> = (params: U) => Promise<T> | Bluebird<T>;
type RawFunction<U, T> = (params: U) => T;
declare const Hooks: {
    wrapObject: <T, U extends ServerFilterHookName>(result: T, hookName: U, context?: any) => Promise<T>;
    wrapPromiseFun: <U, T, V extends ServerFilterHookName>(fun: PromiseFunction<U, T>, params: U, hookName: V) => Promise<T>;
    wrapFun: <U, T, V extends ServerFilterHookName>(fun: RawFunction<U, T>, params: U, hookName: V) => Promise<T>;
    runAction: <T, U extends ServerActionHookName>(hookName: U, params?: T) => void;
};
export { Hooks };
//# sourceMappingURL=hooks.d.ts.map