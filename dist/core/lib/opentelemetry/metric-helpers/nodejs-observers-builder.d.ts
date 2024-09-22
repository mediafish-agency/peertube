import { Meter } from '@opentelemetry/api';
import { View } from '@opentelemetry/sdk-metrics/build/src/view/View.js';
export declare class NodeJSObserversBuilder {
    private readonly meter;
    constructor(meter: Meter);
    static getViews(): View[];
    buildObservers(): void;
    private buildCPUObserver;
    private buildMemoryObserver;
    private buildHandlesObserver;
    private buildGCObserver;
    private buildEventLoopLagObserver;
    private buildFileDescriptorsObserver;
    private buildLibUVActiveRequestsObserver;
    private buildActiveResourcesObserver;
}
//# sourceMappingURL=nodejs-observers-builder.d.ts.map