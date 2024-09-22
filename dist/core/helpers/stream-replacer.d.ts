import { Transform, TransformCallback } from 'stream';
declare class StreamReplacer extends Transform {
    private readonly replacer;
    private pendingChunk;
    constructor(replacer: (line: string) => string);
    _transform(chunk: Buffer, _encoding: BufferEncoding, done: TransformCallback): void;
    _flush(done: TransformCallback): void;
    private doReplace;
}
export { StreamReplacer };
//# sourceMappingURL=stream-replacer.d.ts.map