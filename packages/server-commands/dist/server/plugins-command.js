import { readJSON, writeJSON } from 'fs-extra/esm';
import { join } from 'path';
import { HttpStatusCode } from '@peertube/peertube-models';
import { buildAbsoluteFixturePath } from '@peertube/peertube-node-utils';
import { AbstractCommand } from '../shared/index.js';
export class PluginsCommand extends AbstractCommand {
    static getPluginTestPath(suffix = '') {
        return buildAbsoluteFixturePath('peertube-plugin-test' + suffix);
    }
    list(options) {
        const { start, count, sort, pluginType, uninstalled } = options;
        const path = '/api/v1/plugins';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, query: {
                start,
                count,
                sort,
                pluginType,
                uninstalled
            }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    listAvailable(options) {
        const { start, count, sort, pluginType, search, currentPeerTubeEngine } = options;
        const path = '/api/v1/plugins/available';
        const query = {
            start,
            count,
            sort,
            pluginType,
            currentPeerTubeEngine,
            search
        };
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    get(options) {
        const path = '/api/v1/plugins/' + options.npmName;
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    updateSettings(options) {
        const { npmName, settings } = options;
        const path = '/api/v1/plugins/' + npmName + '/settings';
        return this.putBodyRequest(Object.assign(Object.assign({}, options), { path, fields: { settings }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getRegisteredSettings(options) {
        const path = '/api/v1/plugins/' + options.npmName + '/registered-settings';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getPublicSettings(options) {
        const { npmName } = options;
        const path = '/api/v1/plugins/' + npmName + '/public-settings';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getTranslations(options) {
        const { locale } = options;
        const path = '/plugins/translations/' + locale + '.json';
        return this.getRequestBody(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    install(options) {
        const { npmName, path, pluginVersion } = options;
        const apiPath = '/api/v1/plugins/install';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path: apiPath, fields: { npmName, path, pluginVersion }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    update(options) {
        const { npmName, path } = options;
        const apiPath = '/api/v1/plugins/update';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path: apiPath, fields: { npmName, path }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    uninstall(options) {
        const { npmName } = options;
        const apiPath = '/api/v1/plugins/uninstall';
        return this.postBodyRequest(Object.assign(Object.assign({}, options), { path: apiPath, fields: { npmName }, implicitToken: true, defaultExpectedStatus: HttpStatusCode.NO_CONTENT_204 }));
    }
    getCSS(options = {}) {
        const path = '/plugins/global.css';
        return this.getRequestText(Object.assign(Object.assign({}, options), { path, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200 }));
    }
    getExternalAuth(options) {
        const { npmName, npmVersion, authName, query } = options;
        const path = '/plugins/' + npmName + '/' + npmVersion + '/auth/' + authName;
        return this.getRequest(Object.assign(Object.assign({}, options), { path,
            query, implicitToken: false, defaultExpectedStatus: HttpStatusCode.OK_200, redirects: 0 }));
    }
    updatePackageJSON(npmName, json) {
        const path = this.getPackageJSONPath(npmName);
        return writeJSON(path, json);
    }
    getPackageJSON(npmName) {
        const path = this.getPackageJSONPath(npmName);
        return readJSON(path);
    }
    getPackageJSONPath(npmName) {
        return this.server.servers.buildDirectory(join('plugins', 'node_modules', npmName, 'package.json'));
    }
}
//# sourceMappingURL=plugins-command.js.map