import { wait } from '@peertube/peertube-core-utils';
import { HttpStatusCode } from '@peertube/peertube-models';
import { isGithubCI, root } from '@peertube/peertube-node-utils';
import { exec } from 'child_process';
import { copy, ensureDir, remove } from 'fs-extra/esm';
import { readFile, readdir } from 'fs/promises';
import { basename, join } from 'path';
import { AbstractCommand } from '../shared/index.js';
export class ServersCommand extends AbstractCommand {
    static flushTests(internalServerNumber) {
        return new Promise((res, rej) => {
            const suffix = ` -- ${internalServerNumber}`;
            return exec('npm run clean:server:test' + suffix, (err, _stdout, stderr) => {
                if (err || stderr)
                    return rej(err || new Error(stderr));
                return res();
            });
        });
    }
    ping(options = {}) {
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path: '/api/v1/ping', implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    cleanupTests() {
        const promises = [];
        const saveGithubLogsIfNeeded = async () => {
            if (!isGithubCI())
                return;
            await ensureDir('artifacts');
            const origin = this.buildDirectory('logs/peertube.log');
            const destname = `peertube-${this.server.internalServerNumber}.log`;
            console.log('Saving logs %s.', destname);
            await copy(origin, join('artifacts', destname));
        };
        if (this.server.parallel) {
            const promise = saveGithubLogsIfNeeded()
                .then(() => ServersCommand.flushTests(this.server.internalServerNumber));
            promises.push(promise);
        }
        if (this.server.customConfigFile) {
            promises.push(remove(this.server.customConfigFile));
        }
        return promises;
    }
    async waitUntilLog(str, count = 1, strictCount = true) {
        const logfile = this.buildDirectory('logs/peertube.log');
        while (true) {
            const buf = await readFile(logfile);
            const matches = buf.toString().match(new RegExp(str, 'g'));
            if (matches && matches.length === count)
                return;
            if (matches && strictCount === false && matches.length >= count)
                return;
            await wait(1000);
        }
    }
    buildDirectory(directory) {
        return join(root(), 'test' + this.server.internalServerNumber, directory);
    }
    async countFiles(directory) {
        const files = await readdir(this.buildDirectory(directory));
        return files.length;
    }
    buildWebVideoFilePath(fileUrl) {
        return this.buildDirectory(join('web-videos', basename(fileUrl)));
    }
    buildFragmentedFilePath(videoUUID, fileUrl) {
        return this.buildDirectory(join('streaming-playlists', 'hls', videoUUID, basename(fileUrl)));
    }
    getLogContent() {
        return readFile(this.buildDirectory('logs/peertube.log'));
    }
}
//# sourceMappingURL=servers-command.js.map