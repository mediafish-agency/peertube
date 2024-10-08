export type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export type AttributesOnly<T> = {
    [K in keyof T]: T[K] extends Function ? never : T[K];
};
export type PickWith<T, KT extends keyof T, V> = {
    [P in KT]: T[P] extends V ? V : never;
};
export type PickWithOpt<T, KT extends keyof T, V> = {
    [P in KT]?: T[P] extends V ? V : never;
};
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
type Primitive = string | Function | number | boolean | symbol | undefined | null;
export type DeepOmitHelper<T, K extends keyof T> = {
    [P in K]: T[P] extends infer TP ? TP extends Primitive ? TP : TP extends any[] ? DeepOmitArray<TP, K> : DeepOmit<TP, K> : never;
};
export type DeepOmit<T, K> = T extends Primitive ? T : DeepOmitHelper<T, Exclude<keyof T, K>>;
export type DeepOmitArray<T extends any[], K> = {
    [P in keyof T]: DeepOmit<T[P], K>;
};
export type Unpacked<T> = T extends (infer U)[] ? U : T;
export type Awaitable<T> = T | PromiseLike<T>;
export {};
//# sourceMappingURL=types.d.ts.map