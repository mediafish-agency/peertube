export declare class CachePromiseFactory<A, R> {
    private readonly fn;
    private readonly keyBuilder;
    private readonly running;
    constructor(fn: (arg: A) => Promise<R>, keyBuilder: (arg: A) => string);
    run(arg: A): Promise<R>;
    runWithContext(ctx: any, arg: A): Promise<R>;
}
export declare function CachePromise(options: {
    keyBuilder: (...args: any[]) => string;
}): (_target: any, _key: any, descriptor: PropertyDescriptor) => void;
//# sourceMappingURL=promise-cache.d.ts.map