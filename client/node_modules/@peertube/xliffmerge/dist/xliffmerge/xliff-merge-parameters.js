"use strict";
/**
 * Created by martin on 17.02.2017.
 * Collection of all parameters used by the tool.
 * The parameters are read form the profile or defaults are used.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XliffMergeParameters = void 0;
var fs = __importStar(require("fs"));
var xliff_merge_error_1 = require("./xliff-merge-error");
var util_1 = require("../common/util");
var ngx_translate_extractor_1 = require("./ngx-translate-extractor");
var path_1 = require("path");
var PROFILE_CANDIDATES = ['package.json', '.angular-cli.json'];
var XliffMergeParameters = /** @class */ (function () {
    function XliffMergeParameters() {
        this.errorsFound = [];
        this.warningsFound = [];
    }
    /**
     * Create Parameters.
     * @param options command options
     * @param profileContent given profile (if not, it is read from the profile path from options).
     */
    XliffMergeParameters.createFromOptions = function (options, profileContent) {
        var parameters = new XliffMergeParameters();
        parameters.configure(options, profileContent);
        return parameters;
    };
    /**
     * Read potential profile.
     * To be a candidate, file must exist and contain property "xliffmergeOptions".
     * @param profilePath path of profile
     * @return parsed content of file or null, if file does not exist or is not a profile candidate.
     */
    XliffMergeParameters.readProfileCandidate = function (profilePath) {
        var content;
        try {
            content = fs.readFileSync(profilePath, 'utf-8');
        }
        catch (err) {
            return null;
        }
        var parsedContent = JSON.parse(content);
        if (parsedContent && parsedContent.xliffmergeOptions) {
            return parsedContent;
        }
        else {
            return null;
        }
    };
    /**
     * Initialize me from the profile content.
     * (public only for test usage).
     * @param options options given at runtime via command line
     * @param profileContent if null, read it from profile.
     */
    XliffMergeParameters.prototype.configure = function (options, profileContent) {
        this.errorsFound = [];
        this.warningsFound = [];
        if (!profileContent) {
            profileContent = this.readProfile(options);
        }
        var validProfile = (!!profileContent);
        if (options.quiet) {
            this._quiet = options.quiet;
        }
        if (options.verbose) {
            this._verbose = options.verbose;
        }
        if (validProfile) {
            this.initializeFromConfig(profileContent);
            // if languages are given as parameters, they ovveride everything said in profile
            if (!!options.languages && options.languages.length > 0) {
                this._languages = options.languages;
                if (!this._defaultLanguage) {
                    this._defaultLanguage = this._languages[0];
                }
            }
            this.checkParameters();
        }
    };
    /**
     * Read profile.
     * @param options program options
     * @return the read profile (empty, if none, null if errors)
     */
    XliffMergeParameters.prototype.readProfile = function (options) {
        var profilePath = options.profilePath;
        if (!profilePath) {
            for (var _i = 0, PROFILE_CANDIDATES_1 = PROFILE_CANDIDATES; _i < PROFILE_CANDIDATES_1.length; _i++) {
                var configfilename = PROFILE_CANDIDATES_1[_i];
                var profile = XliffMergeParameters.readProfileCandidate(configfilename);
                if (profile) {
                    this.usedProfilePath = configfilename;
                    return profile;
                }
            }
            return {};
        }
        var content;
        try {
            content = fs.readFileSync(profilePath, 'utf-8');
        }
        catch (err) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('could not read profile "' + profilePath + '"'));
            return null;
        }
        this.usedProfilePath = profilePath;
        var profileContent = JSON.parse(content);
        // replace all pathes in options by absolute paths
        var xliffmergeOptions = profileContent.xliffmergeOptions;
        xliffmergeOptions.srcDir = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.srcDir);
        xliffmergeOptions.genDir = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.genDir);
        return profileContent;
    };
    XliffMergeParameters.prototype.adjustPathToProfilePath = function (profilePath, pathToAdjust) {
        if (!pathToAdjust || (0, path_1.isAbsolute)(pathToAdjust)) {
            return pathToAdjust;
        }
        return (0, path_1.join)((0, path_1.dirname)(profilePath), pathToAdjust).replace(/\\/g, '/');
    };
    XliffMergeParameters.prototype.initializeFromConfig = function (profileContent) {
        if (!profileContent) {
            return;
        }
        var profile = profileContent.xliffmergeOptions;
        if (profile) {
            if (!(0, util_1.isNullOrUndefined)(profile.quiet)) {
                this._quiet = profile.quiet;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.verbose)) {
                this._verbose = profile.verbose;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.allowIdChange)) {
                this._allowIdChange = profile.allowIdChange;
            }
            if (profile.defaultLanguage) {
                this._defaultLanguage = profile.defaultLanguage;
            }
            if (profile.languages) {
                this._languages = profile.languages;
            }
            if (profile.srcDir) {
                this._srcDir = profile.srcDir;
            }
            if (profile.angularCompilerOptions) {
                if (profile.angularCompilerOptions.genDir) {
                    this._genDir = profile.angularCompilerOptions.genDir;
                }
            }
            if (profile.genDir) {
                // this must be after angularCompilerOptions to be preferred
                this._genDir = profile.genDir;
            }
            if (profile.i18nBaseFile) {
                this._i18nBaseFile = profile.i18nBaseFile;
            }
            if (profile.i18nFile) {
                this._i18nFile = profile.i18nFile;
            }
            if (profile.i18nFormat) {
                this._i18nFormat = profile.i18nFormat;
            }
            if (profile.encoding) {
                this._encoding = profile.encoding;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.removeUnusedIds)) {
                this._removeUnusedIds = profile.removeUnusedIds;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.supportNgxTranslate)) {
                this._supportNgxTranslate = profile.supportNgxTranslate;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.ngxTranslateExtractionPattern)) {
                this._ngxTranslateExtractionPattern = profile.ngxTranslateExtractionPattern;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.useSourceAsTarget)) {
                this._useSourceAsTarget = profile.useSourceAsTarget;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.targetPraefix)) {
                this._targetPraefix = profile.targetPraefix;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.targetSuffix)) {
                this._targetSuffix = profile.targetSuffix;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.beautifyOutput)) {
                this._beautifyOutput = profile.beautifyOutput;
            }
            if (!(0, util_1.isNullOrUndefined)(profile.preserveOrder)) {
                this._preserveOrder = profile.preserveOrder;
            }
        }
        else {
            this.warningsFound.push('did not find "xliffmergeOptions" in profile, using defaults');
        }
    };
    /**
     * Check all Parameters, wether they are complete and consistent.
     * if something is wrong with the parameters, it is collected in errorsFound.
     */
    XliffMergeParameters.prototype.checkParameters = function () {
        var _this = this;
        this.checkLanguageSyntax(this.defaultLanguage());
        if (this.languages().length === 0) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('no languages specified'));
        }
        this.languages().forEach(function (lang) {
            _this.checkLanguageSyntax(lang);
        });
        var stats;
        var err;
        // srcDir should exists
        try {
            stats = fs.statSync(this.srcDir());
        }
        catch (e) {
            err = e;
        }
        if (!!err || !stats.isDirectory()) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('srcDir "' + this.srcDir() + '" is not a directory'));
        }
        // genDir should exists
        try {
            stats = fs.statSync(this.genDir());
        }
        catch (e) {
            err = e;
        }
        if (!!err || !stats.isDirectory()) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('genDir "' + this.genDir() + '" is not a directory'));
        }
        // master file MUST exist
        try {
            fs.accessSync(this.i18nFile(), fs.constants.R_OK);
        }
        catch (err) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('i18nFile "' + this.i18nFile() + '" is not readable'));
        }
        // i18nFormat must be xlf xlf2 or xmb
        if (!(this.i18nFormat() === 'xlf' || this.i18nFormat() === 'xlf2' || this.i18nFormat() === 'xmb')) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('i18nFormat "' + this.i18nFormat() + '" invalid, must be "xlf" or "xlf2" or "xmb"'));
        }
        // ngx translate pattern check
        if (this.supportNgxTranslate()) {
            var checkResult = ngx_translate_extractor_1.NgxTranslateExtractor.checkPattern(this.ngxTranslateExtractionPattern());
            if (!(0, util_1.isNullOrUndefined)(checkResult)) {
                this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('ngxTranslateExtractionPattern "' + this.ngxTranslateExtractionPattern() + '": ' + checkResult));
            }
        }
        // targetPraefix and targetSuffix check
        if (!this.useSourceAsTarget()) {
            if (this.targetPraefix().length > 0) {
                this.warningsFound.push('configured targetPraefix "' + this.targetPraefix() + '" will not be used because "useSourceAsTarget" is disabled"');
            }
            if (this.targetSuffix().length > 0) {
                this.warningsFound.push('configured targetSuffix "' + this.targetSuffix() + '" will not be used because "useSourceAsTarget" is disabled"');
            }
        }
    };
    /**
     * Check syntax of language.
     * Must be compatible with XML Schema type xsd:language.
     * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
     * @param lang language to check
     */
    XliffMergeParameters.prototype.checkLanguageSyntax = function (lang) {
        var pattern = /^[a-zA-Z]{1,8}([-_][a-zA-Z0-9]{1,8})*$/;
        if (!pattern.test(lang)) {
            this.errorsFound.push(new xliff_merge_error_1.XliffMergeError('language "' + lang + '" is not valid'));
        }
    };
    XliffMergeParameters.prototype.allowIdChange = function () {
        return ((0, util_1.isNullOrUndefined)(this._allowIdChange)) ? false : this._allowIdChange;
    };
    XliffMergeParameters.prototype.verbose = function () {
        return ((0, util_1.isNullOrUndefined)(this._verbose)) ? false : this._verbose;
    };
    XliffMergeParameters.prototype.quiet = function () {
        return ((0, util_1.isNullOrUndefined)(this._quiet)) ? false : this._quiet;
    };
    /**
     * Debug output all parameters to commandOutput.
     */
    XliffMergeParameters.prototype.showAllParameters = function (commandOutput) {
        commandOutput.debug('xliffmerge Used Parameters:');
        commandOutput.debug('usedProfilePath:\t"%s"', this.usedProfilePath);
        commandOutput.debug('defaultLanguage:\t"%s"', this.defaultLanguage());
        commandOutput.debug('srcDir:\t"%s"', this.srcDir());
        commandOutput.debug('genDir:\t"%s"', this.genDir());
        commandOutput.debug('i18nBaseFile:\t"%s"', this.i18nBaseFile());
        commandOutput.debug('i18nFile:\t"%s"', this.i18nFile());
        commandOutput.debug('languages:\t%s', this.languages());
        for (var _i = 0, _a = this.languages(); _i < _a.length; _i++) {
            var language = _a[_i];
            commandOutput.debug('outputFile[%s]:\t%s', language, this.generatedI18nFile(language));
        }
        commandOutput.debug('removeUnusedIds:\t%s', this.removeUnusedIds());
        commandOutput.debug('supportNgxTranslate:\t%s', this.supportNgxTranslate());
        if (this.supportNgxTranslate()) {
            commandOutput.debug('ngxTranslateExtractionPattern:\t%s', this.ngxTranslateExtractionPattern());
        }
        commandOutput.debug('useSourceAsTarget:\t%s', this.useSourceAsTarget());
        if (this.useSourceAsTarget()) {
            commandOutput.debug('targetPraefix:\t"%s"', this.targetPraefix());
            commandOutput.debug('targetSuffix:\t"%s"', this.targetSuffix());
        }
        commandOutput.debug('allowIdChange:\t%s', this.allowIdChange());
        commandOutput.debug('beautifyOutput:\t%s', this.beautifyOutput());
        commandOutput.debug('preserveOrder:\t%s', this.preserveOrder());
    };
    /**
     * Default-Language, default en.
     * @return default language
     */
    XliffMergeParameters.prototype.defaultLanguage = function () {
        return this._defaultLanguage ? this._defaultLanguage : 'en';
    };
    /**
     * Liste der zu bearbeitenden Sprachen.
     * @return languages
     */
    XliffMergeParameters.prototype.languages = function () {
        return this._languages ? this._languages : [];
    };
    /**
     * src directory, where the master xlif is located.
     * @return srcDir
     */
    XliffMergeParameters.prototype.srcDir = function () {
        return this._srcDir ? this._srcDir : '.';
    };
    /**
     * The base file name of the xlif file for input and output.
     * Default is messages
     * @return base file
     */
    XliffMergeParameters.prototype.i18nBaseFile = function () {
        return this._i18nBaseFile ? this._i18nBaseFile : 'messages';
    };
    /**
     * The master xlif file (the one generated by ng-xi18n).
     * Default is <srcDir>/<i18nBaseFile>.xlf.
     * @return master file
     */
    XliffMergeParameters.prototype.i18nFile = function () {
        return (0, path_1.join)(this.srcDir(), (this._i18nFile ? this._i18nFile : this.i18nBaseFile() + '.' + this.suffixForGeneratedI18nFile())).replace(/\\/g, '/');
    };
    /**
     * Format of the master xlif file.
     * Default is "xlf", possible are "xlf" or "xlf2" or "xmb".
     * @return format
     */
    XliffMergeParameters.prototype.i18nFormat = function () {
        return (this._i18nFormat ? this._i18nFormat : 'xlf');
    };
    /**
     * potentially to be generated I18n-File with the translations for one language.
     * @param lang language shortcut
     * @return Path of file
     */
    XliffMergeParameters.prototype.generatedI18nFile = function (lang) {
        return (0, path_1.join)(this.genDir(), this.i18nBaseFile() + '.' + lang + '.' + this.suffixForGeneratedI18nFile()).replace(/\\/g, '/');
    };
    XliffMergeParameters.prototype.suffixForGeneratedI18nFile = function () {
        switch (this.i18nFormat()) {
            case 'xlf':
                return 'xlf';
            case 'xlf2':
                return 'xlf';
            case 'xmb':
                return 'xtb';
        }
    };
    /**
     * potentially to be generated translate-File for ngx-translate with the translations for one language.
     * @param lang language shortcut
     * @return Path of file
     */
    XliffMergeParameters.prototype.generatedNgxTranslateFile = function (lang) {
        return (0, path_1.join)(this.genDir(), this.i18nBaseFile() + '.' + lang + '.' + 'json').replace(/\\/g, '/');
    };
    /**
     * The encoding used to write new XLIFF-files.
     * @return encoding
     */
    XliffMergeParameters.prototype.encoding = function () {
        return this._encoding ? this._encoding : 'utf-8';
    };
    /**
     * Output-Directory, where the output is written to.
     * Default is <srcDir>.
    */
    XliffMergeParameters.prototype.genDir = function () {
        return this._genDir ? this._genDir : this.srcDir();
    };
    XliffMergeParameters.prototype.removeUnusedIds = function () {
        return ((0, util_1.isNullOrUndefined)(this._removeUnusedIds)) ? true : this._removeUnusedIds;
    };
    XliffMergeParameters.prototype.supportNgxTranslate = function () {
        return ((0, util_1.isNullOrUndefined)(this._supportNgxTranslate)) ? false : this._supportNgxTranslate;
    };
    XliffMergeParameters.prototype.ngxTranslateExtractionPattern = function () {
        return ((0, util_1.isNullOrUndefined)(this._ngxTranslateExtractionPattern)) ?
            ngx_translate_extractor_1.NgxTranslateExtractor.DefaultExtractionPattern : this._ngxTranslateExtractionPattern;
    };
    /**
     * Whether source must be used as target for new trans-units
     * Default is true
     */
    XliffMergeParameters.prototype.useSourceAsTarget = function () {
        return ((0, util_1.isNullOrUndefined)(this._useSourceAsTarget)) ? true : this._useSourceAsTarget;
    };
    /**
     * Praefix used for target when copying new trans-units
     * Default is ""
     */
    XliffMergeParameters.prototype.targetPraefix = function () {
        return ((0, util_1.isNullOrUndefined)(this._targetPraefix)) ? '' : this._targetPraefix;
    };
    /**
     * Suffix used for target when copying new trans-units
     * Default is ""
     */
    XliffMergeParameters.prototype.targetSuffix = function () {
        return ((0, util_1.isNullOrUndefined)(this._targetSuffix)) ? '' : this._targetSuffix;
    };
    /**
     * If set, run xml result through beautifier (pretty-data).
     */
    XliffMergeParameters.prototype.beautifyOutput = function () {
        return ((0, util_1.isNullOrUndefined)(this._beautifyOutput)) ? false : this._beautifyOutput;
    };
    /**
     * If set, order of new trans units will be as in master.
     * Otherwise they are added at the end.
     */
    XliffMergeParameters.prototype.preserveOrder = function () {
        return ((0, util_1.isNullOrUndefined)(this._preserveOrder)) ? true : this._preserveOrder;
    };
    return XliffMergeParameters;
}());
exports.XliffMergeParameters = XliffMergeParameters;
