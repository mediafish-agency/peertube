import { context, trace } from '@opentelemetry/api';
import { omit } from '@peertube/peertube-core-utils';
import { stat } from 'fs/promises';
import { join } from 'path';
import { format as sqlFormat } from 'sql-formatter';
import { createLogger, format, transports } from 'winston';
import { CONFIG } from '../initializers/config.js';
import { LOG_FILENAME } from '../initializers/constants.js';
const label = CONFIG.WEBSERVER.HOSTNAME + ':' + CONFIG.WEBSERVER.PORT;
const consoleLoggerFormat = format.printf(info => {
    let additionalInfos = JSON.stringify(getAdditionalInfo(info), removeCyclicValues(), 2);
    if (additionalInfos === undefined || additionalInfos === '{}')
        additionalInfos = '';
    else
        additionalInfos = ' ' + additionalInfos;
    if (info.sql) {
        if (CONFIG.LOG.PRETTIFY_SQL) {
            additionalInfos += '\n' + sqlFormat(info.sql, {
                language: 'sql',
                tabWidth: 2
            });
        }
        else {
            additionalInfos += ' - ' + info.sql;
        }
    }
    return `[${info.label}] ${info.timestamp} ${info.level}: ${info.message}${additionalInfos}`;
});
const jsonLoggerFormat = format.printf(info => {
    return JSON.stringify(info, removeCyclicValues());
});
const timestampFormatter = format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
});
const labelFormatter = (suffix) => {
    return format.label({
        label: suffix ? `${label} ${suffix}` : label
    });
};
const fileLoggerOptions = {
    filename: join(CONFIG.STORAGE.LOG_DIR, LOG_FILENAME),
    handleExceptions: true,
    format: format.combine(format.timestamp(), jsonLoggerFormat)
};
if (CONFIG.LOG.ROTATION.ENABLED) {
    fileLoggerOptions.maxsize = CONFIG.LOG.ROTATION.MAX_FILE_SIZE;
    fileLoggerOptions.maxFiles = CONFIG.LOG.ROTATION.MAX_FILES;
}
function buildLogger(labelSuffix) {
    var _a;
    return createLogger({
        level: (_a = process.env.LOGGER_LEVEL) !== null && _a !== void 0 ? _a : CONFIG.LOG.LEVEL,
        defaultMeta: {
            get traceId() { var _a; return (_a = trace.getSpanContext(context.active())) === null || _a === void 0 ? void 0 : _a.traceId; },
            get spanId() { var _a; return (_a = trace.getSpanContext(context.active())) === null || _a === void 0 ? void 0 : _a.spanId; },
            get traceFlags() { var _a; return (_a = trace.getSpanContext(context.active())) === null || _a === void 0 ? void 0 : _a.traceFlags; }
        },
        format: format.combine(labelFormatter(labelSuffix), format.splat()),
        transports: [
            new transports.File(fileLoggerOptions),
            new transports.Console({
                handleExceptions: true,
                format: format.combine(timestampFormatter, format.colorize(), consoleLoggerFormat)
            })
        ],
        exitOnError: true
    });
}
const logger = buildLogger();
function bunyanLogFactory(level) {
    return function (...params) {
        let meta = null;
        let args = [].concat(params);
        if (arguments[0] instanceof Error) {
            meta = arguments[0].toString();
            args = Array.prototype.slice.call(arguments, 1);
            args.push(meta);
        }
        else if (typeof (args[0]) !== 'string') {
            meta = arguments[0];
            args = Array.prototype.slice.call(arguments, 1);
            args.push(meta);
        }
        logger[level].apply(logger, args);
    };
}
const bunyanLogger = {
    level: () => { },
    trace: bunyanLogFactory('debug'),
    debug: bunyanLogFactory('debug'),
    verbose: bunyanLogFactory('debug'),
    info: bunyanLogFactory('info'),
    warn: bunyanLogFactory('warn'),
    error: bunyanLogFactory('error'),
    fatal: bunyanLogFactory('error')
};
function loggerTagsFactory(...defaultTags) {
    return (...tags) => {
        return { tags: defaultTags.concat(tags) };
    };
}
async function mtimeSortFilesDesc(files, basePath) {
    const promises = [];
    const out = [];
    for (const file of files) {
        const p = stat(basePath + '/' + file)
            .then(stats => {
            if (stats.isFile())
                out.push({ file, mtime: stats.mtime.getTime() });
        });
        promises.push(p);
    }
    await Promise.all(promises);
    out.sort((a, b) => b.mtime - a.mtime);
    return out;
}
export { buildLogger, bunyanLogger, consoleLoggerFormat, jsonLoggerFormat, labelFormatter, logger, loggerTagsFactory, mtimeSortFilesDesc, timestampFormatter };
function removeCyclicValues() {
    const seen = new WeakSet();
    return (key, value) => {
        if (key === 'cert')
            return 'Replaced by the logger to avoid large log message';
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value))
                return;
            seen.add(value);
        }
        if (value instanceof Set) {
            return Array.from(value);
        }
        if (value instanceof Map) {
            return Array.from(value.entries());
        }
        if (value instanceof Error) {
            const error = {};
            Object.getOwnPropertyNames(value).forEach(key => { error[key] = value[key]; });
            return error;
        }
        return value;
    };
}
function getAdditionalInfo(info) {
    const toOmit = ['label', 'timestamp', 'level', 'message', 'sql', 'tags'];
    return omit(info, toOmit);
}
//# sourceMappingURL=logger.js.map