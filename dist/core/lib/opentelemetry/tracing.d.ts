import type { Tracer } from '@opentelemetry/api';
declare let tracer: Tracer | TrackerMock;
declare function registerOpentelemetryTracing(): Promise<void>;
declare function wrapWithSpanAndContext<T>(spanName: string, cb: () => Promise<T>): Promise<T>;
export { registerOpentelemetryTracing, tracer, wrapWithSpanAndContext };
declare class TrackerMock {
    startSpan(): SpanMock;
}
declare class SpanMock {
    end(): void;
}
//# sourceMappingURL=tracing.d.ts.map