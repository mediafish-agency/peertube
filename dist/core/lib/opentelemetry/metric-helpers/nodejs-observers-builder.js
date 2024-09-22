import { readdir } from 'fs/promises';
import { constants, PerformanceObserver } from 'perf_hooks';
import * as process from 'process';
import { ExplicitBucketHistogramAggregation } from '@opentelemetry/sdk-metrics';
import { View } from '@opentelemetry/sdk-metrics/build/src/view/View.js';
import { logger } from '../../../helpers/logger.js';
export class NodeJSObserversBuilder {
    constructor(meter) {
        this.meter = meter;
    }
    static getViews() {
        return [
            new View({
                aggregation: new ExplicitBucketHistogramAggregation([0.001, 0.01, 0.1, 1, 2, 5]),
                instrumentName: 'nodejs_gc_duration_seconds'
            })
        ];
    }
    buildObservers() {
        this.buildCPUObserver();
        this.buildMemoryObserver();
        this.buildHandlesObserver();
        this.buildFileDescriptorsObserver();
        this.buildGCObserver();
        this.buildEventLoopLagObserver();
        this.buildLibUVActiveRequestsObserver();
        this.buildActiveResourcesObserver();
    }
    buildCPUObserver() {
        const cpuTotal = this.meter.createObservableCounter('process_cpu_seconds_total', {
            description: 'Total user and system CPU time spent in seconds.'
        });
        const cpuUser = this.meter.createObservableCounter('process_cpu_user_seconds_total', {
            description: 'Total user CPU time spent in seconds.'
        });
        const cpuSystem = this.meter.createObservableCounter('process_cpu_system_seconds_total', {
            description: 'Total system CPU time spent in seconds.'
        });
        let lastCpuUsage = process.cpuUsage();
        this.meter.addBatchObservableCallback(observableResult => {
            const cpuUsage = process.cpuUsage();
            const userUsageMicros = cpuUsage.user - lastCpuUsage.user;
            const systemUsageMicros = cpuUsage.system - lastCpuUsage.system;
            lastCpuUsage = cpuUsage;
            observableResult.observe(cpuTotal, (userUsageMicros + systemUsageMicros) / 1e6);
            observableResult.observe(cpuUser, userUsageMicros / 1e6);
            observableResult.observe(cpuSystem, systemUsageMicros / 1e6);
        }, [cpuTotal, cpuUser, cpuSystem]);
    }
    buildMemoryObserver() {
        this.meter.createObservableGauge('nodejs_memory_usage_bytes', {
            description: 'Memory'
        }).addCallback(observableResult => {
            const current = process.memoryUsage();
            observableResult.observe(current.heapTotal, { memoryType: 'heapTotal' });
            observableResult.observe(current.heapUsed, { memoryType: 'heapUsed' });
            observableResult.observe(current.arrayBuffers, { memoryType: 'arrayBuffers' });
            observableResult.observe(current.external, { memoryType: 'external' });
            observableResult.observe(current.rss, { memoryType: 'rss' });
        });
    }
    buildHandlesObserver() {
        if (typeof process._getActiveHandles !== 'function')
            return;
        this.meter.createObservableGauge('nodejs_active_handles_total', {
            description: 'Total number of active handles.'
        }).addCallback(observableResult => {
            const handles = process._getActiveHandles();
            observableResult.observe(handles.length);
        });
    }
    buildGCObserver() {
        const kinds = {
            [constants.NODE_PERFORMANCE_GC_MAJOR]: 'major',
            [constants.NODE_PERFORMANCE_GC_MINOR]: 'minor',
            [constants.NODE_PERFORMANCE_GC_INCREMENTAL]: 'incremental',
            [constants.NODE_PERFORMANCE_GC_WEAKCB]: 'weakcb'
        };
        const histogram = this.meter.createHistogram('nodejs_gc_duration_seconds', {
            description: 'Garbage collection duration by kind, one of major, minor, incremental or weakcb'
        });
        const obs = new PerformanceObserver(list => {
            const entry = list.getEntries()[0];
            const kind = kinds[entry.detail.kind];
            histogram.record(entry.duration / 1000, {
                kind
            });
        });
        obs.observe({ entryTypes: ['gc'] });
    }
    buildEventLoopLagObserver() {
        const reportEventloopLag = (start, observableResult, res) => {
            const delta = process.hrtime(start);
            const nanosec = delta[0] * 1e9 + delta[1];
            const seconds = nanosec / 1e9;
            observableResult.observe(seconds);
            res();
        };
        this.meter.createObservableGauge('nodejs_eventloop_lag_seconds', {
            description: 'Lag of event loop in seconds.'
        }).addCallback(observableResult => {
            return new Promise(res => {
                const start = process.hrtime();
                setImmediate(reportEventloopLag, start, observableResult, res);
            });
        });
    }
    buildFileDescriptorsObserver() {
        this.meter.createObservableGauge('process_open_fds', {
            description: 'Number of open file descriptors.'
        }).addCallback(async (observableResult) => {
            try {
                const fds = await readdir('/proc/self/fd');
                observableResult.observe(fds.length - 1);
            }
            catch (err) {
                logger.debug('Cannot list file descriptors of current process for OpenTelemetry.', { err });
            }
        });
    }
    buildLibUVActiveRequestsObserver() {
        if (typeof process._getActiveRequests !== 'function')
            return;
        this.meter.createObservableGauge('nodejs_active_requests_total', {
            description: 'Total number of active libuv requests.'
        }).addCallback(observableResult => {
            const requests = process._getActiveRequests();
            observableResult.observe(requests.length);
        });
    }
    buildActiveResourcesObserver() {
        if (typeof process.getActiveResourcesInfo !== 'function')
            return;
        const grouped = this.meter.createObservableCounter('nodejs_active_resources', {
            description: 'Number of active resources that are currently keeping the event loop alive, grouped by async resource type.'
        });
        const total = this.meter.createObservableCounter('nodejs_active_resources_total', {
            description: 'Total number of active resources.'
        });
        this.meter.addBatchObservableCallback(observableResult => {
            const resources = process.getActiveResourcesInfo();
            const data = {};
            for (let i = 0; i < resources.length; i++) {
                const resource = resources[i];
                if (data[resource] === undefined)
                    data[resource] = 0;
                data[resource] += 1;
            }
            for (const type of Object.keys(data)) {
                observableResult.observe(grouped, data[type], { type });
            }
            observableResult.observe(total, resources.length);
        }, [grouped, total]);
    }
}
//# sourceMappingURL=nodejs-observers-builder.js.map