"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XliffMerge = void 0;
var util_1 = require("util");
var command_output_1 = require("../common/command-output");
var file_util_1 = require("../common/file-util");
var util_2 = require("../common/util");
var i18nsupport_lib_1 = require("../i18nsupport-lib");
var ngx_translate_extractor_1 = require("./ngx-translate-extractor");
var translation_messages_file_reader_1 = require("./translation-messages-file-reader");
var version_1 = require("./version");
var xliff_merge_error_1 = require("./xliff-merge-error");
var xliff_merge_parameters_1 = require("./xliff-merge-parameters");
/**
 * Created by martin on 17.02.2017.
 * XliffMerge - read xliff or xmb file and put untranslated parts in language specific xliff or xmb files.
 *
 */
var XliffMerge = /** @class */ (function () {
    function XliffMerge(commandOutput, options) {
        this.commandOutput = commandOutput;
        this.options = options;
        this.parameters = null;
    }
    XliffMerge.main = function (argv) {
        var options = XliffMerge.parseArgs(argv);
        if (options) {
            var code = new XliffMerge(new command_output_1.CommandOutput(process.stdout), options).run();
            process.exit(code);
        }
    };
    XliffMerge.parseArgs = function (argv) {
        var options = {
            languages: []
        };
        for (var i = 2; i < argv.length; i++) {
            var arg = argv[i];
            if (arg === '--version' || arg === '-version') {
                console.log('xliffmerge ' + version_1.VERSION);
            }
            else if (arg === '--verbose' || arg === '-v') {
                options.verbose = true;
            }
            else if (arg === '--profile' || arg === '-p') {
                i++;
                if (i >= argv.length) {
                    console.log('missing config file');
                    XliffMerge.showUsage();
                    return null;
                }
                else {
                    options.profilePath = argv[i];
                }
            }
            else if (arg === '--quiet' || arg === '-q') {
                options.quiet = true;
            }
            else if (arg === '--help' || arg === '-help' || arg === '-h') {
                XliffMerge.showUsage();
            }
            else if (arg.length > 0 && arg.charAt(0) === '-') {
                console.log('unknown option', arg);
                return null;
            }
            else {
                options.languages.push(arg);
            }
        }
        return options;
    };
    XliffMerge.showUsage = function () {
        console.log('usage: xliffmerge <option>* <language>*');
        console.log('Options');
        console.log('\t-p|--profile a json configuration file containing all relevant parameters.');
        console.log('\t\tfor details please consult the home page https://github.com/martinroob/ngx-i18nsupport');
        console.log('\t-v|--verbose show some output for debugging purposes');
        console.log('\t-q|--quiet only show errors, nothing else');
        console.log('\t-version|--version show version string');
        console.log('');
        console.log('\t<language> has to be a valid language short string, e,g. "en", "de", "de-ch"');
    };
    /**
     * For Tests, create instance with given profile
     * @param commandOutput commandOutput
     * @param options options
     * @param profileContent profileContent
     */
    XliffMerge.createFromOptions = function (commandOutput, options, profileContent) {
        var instance = new XliffMerge(commandOutput, options);
        instance.parameters = xliff_merge_parameters_1.XliffMergeParameters.createFromOptions(options, profileContent);
        return instance;
    };
    /**
     * Execute merge-Process.
     * @return On completion returns retcode 0=ok, other = error.
     */
    XliffMerge.prototype.run = function () {
        var _this = this;
        if (this.options && this.options.quiet) {
            this.commandOutput.setQuiet();
        }
        if (this.options && this.options.verbose) {
            this.commandOutput.setVerbose();
        }
        if (!this.parameters) {
            this.parameters = xliff_merge_parameters_1.XliffMergeParameters.createFromOptions(this.options);
        }
        this.commandOutput.info('xliffmerge version %s', version_1.VERSION);
        if (this.parameters.verbose()) {
            this.parameters.showAllParameters(this.commandOutput);
        }
        if (this.parameters.errorsFound.length > 0) {
            for (var _i = 0, _a = this.parameters.errorsFound; _i < _a.length; _i++) {
                var err = _a[_i];
                this.commandOutput.error(err.message);
            }
            return -1;
        }
        if (this.parameters.warningsFound.length > 0) {
            for (var _b = 0, _c = this.parameters.warningsFound; _b < _c.length; _b++) {
                var warn = _c[_b];
                this.commandOutput.warn(warn);
            }
        }
        this.readMaster();
        var retcodes = this.parameters.languages()
            .map(function (lang) { return _this.processLanguage(lang); });
        return this.totalRetcode(retcodes);
    };
    /**
     * Give an array of retcodes for the different languages, return the total retcode.
     * If all are 0, it is 0, otherwise the first non zero.
     * @param retcodes retcodes
     * @return number
     */
    XliffMerge.prototype.totalRetcode = function (retcodes) {
        for (var i = 0; i < retcodes.length; i++) {
            if (retcodes[i] !== 0) {
                return retcodes[i];
            }
        }
        return 0;
    };
    /**
     * Return the name of the generated file for given lang.
     * @param lang language
     * @return name of generated file
     */
    XliffMerge.prototype.generatedI18nFile = function (lang) {
        return this.parameters.generatedI18nFile(lang);
    };
    /**
     * Return the name of the generated ngx-translation file for given lang.
     * @param lang language
     * @return name of translate file
     */
    XliffMerge.prototype.generatedNgxTranslateFile = function (lang) {
        return this.parameters.generatedNgxTranslateFile(lang);
    };
    /**
     * Warnings found during the run.
     * @return warnings
     */
    XliffMerge.prototype.warnings = function () {
        return this.parameters.warningsFound;
    };
    XliffMerge.prototype.readMaster = function () {
        var _this = this;
        try {
            this.master = translation_messages_file_reader_1.TranslationMessagesFileReader.fromFile(this.parameters.i18nFormat(), this.parameters.i18nFile(), this.parameters.encoding());
            this.master.warnings().forEach(function (warning) {
                _this.commandOutput.warn(warning);
            });
            var count = this.master.numberOfTransUnits();
            var missingIdCount = this.master.numberOfTransUnitsWithMissingId();
            this.commandOutput.info('master contains %s trans-units', count);
            if (missingIdCount > 0) {
                this.commandOutput.warn('master contains %s trans-units, but there are %s without id', count, missingIdCount);
            }
            var sourceLang = this.master.sourceLanguage();
            if (sourceLang && sourceLang !== this.parameters.defaultLanguage()) {
                this.commandOutput.warn('master says to have source-language="%s", should be "%s" (your defaultLanguage)', sourceLang, this.parameters.defaultLanguage());
                this.master.setSourceLanguage(this.parameters.defaultLanguage());
                translation_messages_file_reader_1.TranslationMessagesFileReader.save(this.master, this.parameters.beautifyOutput());
                this.commandOutput.warn('changed master source-language="%s" to "%s"', sourceLang, this.parameters.defaultLanguage());
            }
        }
        catch (err) {
            if (err instanceof xliff_merge_error_1.XliffMergeError) {
                this.commandOutput.error(err.message);
                return -1;
            }
            else {
                // unhandled
                var currentFilename = this.parameters.i18nFile();
                var filenameString = (currentFilename) ? (0, util_1.format)('file "%s", ', currentFilename) : '';
                this.commandOutput.error(filenameString + 'oops ' + err);
                throw err;
            }
        }
    };
    /**
     * Process the given language.
     * Async operation.
     * @param lang language
     * @return on completion 0 for ok, other for error
     */
    XliffMerge.prototype.processLanguage = function (lang) {
        this.commandOutput.debug('processing language %s', lang);
        var languageXliffFile = this.parameters.generatedI18nFile(lang);
        var currentFilename = languageXliffFile;
        try {
            if (!file_util_1.FileUtil.exists(languageXliffFile)) {
                this.createUntranslatedXliff(lang, languageXliffFile);
            }
            else {
                this.mergeMasterTo(lang, languageXliffFile);
            }
            if (this.parameters.supportNgxTranslate()) {
                var languageSpecificMessagesFile = translation_messages_file_reader_1.TranslationMessagesFileReader.fromFile(this.translationFormat(this.parameters.i18nFormat()), languageXliffFile, this.parameters.encoding(), this.master.filename());
                ngx_translate_extractor_1.NgxTranslateExtractor.extract(languageSpecificMessagesFile, this.parameters.ngxTranslateExtractionPattern(), this.parameters.generatedNgxTranslateFile(lang));
            }
            return 0;
        }
        catch (err) {
            if (err instanceof xliff_merge_error_1.XliffMergeError) {
                this.commandOutput.error(err.message);
                return -1;
            }
            else {
                // unhandled
                var filenameString = (currentFilename) ? (0, util_1.format)('file "%s", ', currentFilename) : '';
                this.commandOutput.error(filenameString + 'oops ' + err);
                throw err;
            }
        }
    };
    /**
     * create a new file for the language, which contains no translations, but all keys.
     * in principle, this is just a copy of the master with target-language set.
     * @param lang language
     * @param languageXliffFilePath name of file
     */
    XliffMerge.prototype.createUntranslatedXliff = function (lang, languageXliffFilePath) {
        // copy master ...
        // and set target-language
        // and copy source to target if necessary
        var isDefaultLang = (lang === this.parameters.defaultLanguage());
        this.master.setNewTransUnitTargetPraefix(this.parameters.targetPraefix());
        this.master.setNewTransUnitTargetSuffix(this.parameters.targetSuffix());
        var languageSpecificMessagesFile = this.master.createTranslationFileForLang(lang, languageXliffFilePath, isDefaultLang, this.parameters.useSourceAsTarget());
        // write it to file
        translation_messages_file_reader_1.TranslationMessagesFileReader.save(languageSpecificMessagesFile, this.parameters.beautifyOutput());
        this.commandOutput.info('created new file "%s" for target-language="%s"', languageXliffFilePath, lang);
        if (!isDefaultLang) {
            this.commandOutput.warn('please translate file "%s" to target-language="%s"', languageXliffFilePath, lang);
        }
    };
    /**
     * Map the input format to the format of the translation.
     * Normally they are the same but for xmb the translation format is xtb.
     * @param i18nFormat format
     */
    XliffMerge.prototype.translationFormat = function (i18nFormat) {
        if (i18nFormat === i18nsupport_lib_1.FORMAT_XMB) {
            return i18nsupport_lib_1.FORMAT_XTB;
        }
        else {
            return i18nFormat;
        }
    };
    /**
     * Merge all
     * @param lang language
     * @param languageXliffFilePath filename
     */
    XliffMerge.prototype.mergeMasterTo = function (lang, languageXliffFilePath) {
        var _this = this;
        // read lang specific file
        var languageSpecificMessagesFile = translation_messages_file_reader_1.TranslationMessagesFileReader.fromFile(this.translationFormat(this.parameters.i18nFormat()), languageXliffFilePath, this.parameters.encoding());
        var isDefaultLang = (lang === this.parameters.defaultLanguage());
        var newCount = 0;
        var correctSourceContentCount = 0;
        var correctSourceRefCount = 0;
        var correctDescriptionOrMeaningCount = 0;
        var idChangedCount = 0;
        languageSpecificMessagesFile.setNewTransUnitTargetPraefix(this.parameters.targetPraefix());
        languageSpecificMessagesFile.setNewTransUnitTargetSuffix(this.parameters.targetSuffix());
        var lastProcessedUnit = null;
        this.master.forEachTransUnit(function (masterTransUnit) {
            var transUnit = languageSpecificMessagesFile.transUnitWithId(masterTransUnit.id);
            if (!transUnit) {
                // oops, no translation, must be a new key, so add it
                var newUnit = void 0;
                if (_this.parameters.allowIdChange()
                    && (newUnit = _this.processChangedIdUnit(masterTransUnit, languageSpecificMessagesFile, lastProcessedUnit))) {
                    lastProcessedUnit = newUnit;
                    idChangedCount++;
                }
                else {
                    lastProcessedUnit = languageSpecificMessagesFile.importNewTransUnit(masterTransUnit, isDefaultLang, _this.parameters.useSourceAsTarget(), (_this.parameters.preserveOrder()) ? lastProcessedUnit : undefined);
                    newCount++;
                }
            }
            else {
                // check for changed source content and change it if needed
                // (can only happen if ID is explicitely set, otherwise ID would change if source content is changed.
                if (transUnit.supportsSetSourceContent() && !_this.areSourcesNearlyEqual(masterTransUnit, transUnit)) {
                    transUnit.setSourceContent(masterTransUnit.sourceContent());
                    if (isDefaultLang) {
                        // #81 changed source must be copied to target for default lang
                        transUnit.translate(masterTransUnit.sourceContent());
                        transUnit.setTargetState(i18nsupport_lib_1.STATE_FINAL);
                    }
                    else {
                        if (transUnit.targetState() === i18nsupport_lib_1.STATE_FINAL) {
                            // source is changed, so translation has to be checked again
                            transUnit.setTargetState(i18nsupport_lib_1.STATE_TRANSLATED);
                        }
                    }
                    correctSourceContentCount++;
                }
                // check for missing or changed source ref and add it if needed
                if (transUnit.supportsSetSourceReferences()
                    && !_this.areSourceReferencesEqual(masterTransUnit.sourceReferences(), transUnit.sourceReferences())) {
                    transUnit.setSourceReferences(masterTransUnit.sourceReferences());
                    correctSourceRefCount++;
                }
                // check for changed description or meaning
                if (transUnit.supportsSetDescriptionAndMeaning()) {
                    var changed = false;
                    if (transUnit.description() !== masterTransUnit.description()) {
                        transUnit.setDescription(masterTransUnit.description());
                        changed = true;
                    }
                    if (transUnit.meaning() !== masterTransUnit.meaning()) {
                        transUnit.setMeaning(masterTransUnit.meaning());
                        changed = true;
                    }
                    if (changed) {
                        correctDescriptionOrMeaningCount++;
                    }
                }
                lastProcessedUnit = transUnit;
            }
        });
        if (newCount > 0) {
            this.commandOutput.warn('merged %s trans-units from master to "%s"', newCount, lang);
        }
        if (correctSourceContentCount > 0) {
            this.commandOutput.warn('transferred %s changed source content from master to "%s"', correctSourceContentCount, lang);
        }
        if (correctSourceRefCount > 0) {
            this.commandOutput.warn('transferred %s source references from master to "%s"', correctSourceRefCount, lang);
        }
        if (idChangedCount > 0) {
            this.commandOutput.warn('found %s changed id\'s in "%s"', idChangedCount, lang);
        }
        if (correctDescriptionOrMeaningCount > 0) {
            this.commandOutput.warn('transferred %s changed descriptions/meanings from master to "%s"', correctDescriptionOrMeaningCount, lang);
        }
        // remove all elements that are no longer used
        var removeCount = 0;
        var alreadyProcessed = new Set();
        languageSpecificMessagesFile.forEachTransUnit(function (transUnit) {
            var existsInMaster = !(0, util_2.isNullOrUndefined)(_this.master.transUnitWithId(transUnit.id));
            if (alreadyProcessed.has(transUnit.id) || !existsInMaster) {
                if (_this.parameters.removeUnusedIds()) {
                    languageSpecificMessagesFile.removeTransUnitWithId(transUnit.id);
                }
                removeCount++;
            }
            alreadyProcessed.add(transUnit.id);
        });
        if (removeCount > 0) {
            if (this.parameters.removeUnusedIds()) {
                this.commandOutput.warn('removed %s unused trans-units in "%s"', removeCount, lang);
            }
            else {
                this.commandOutput.warn('keeping %s unused trans-units in "%s", because removeUnused is disabled', removeCount, lang);
            }
        }
        if (newCount === 0 && removeCount === 0 && correctSourceContentCount === 0
            && correctSourceRefCount === 0 && correctDescriptionOrMeaningCount === 0) {
            this.commandOutput.info('file for "%s" was up to date', lang);
        }
        else {
            // write it to file
            translation_messages_file_reader_1.TranslationMessagesFileReader.save(languageSpecificMessagesFile, this.parameters.beautifyOutput());
            this.commandOutput.info('updated file "%s" for target-language="%s"', languageXliffFilePath, lang);
            if (newCount > 0 && !isDefaultLang) {
                this.commandOutput.warn('please translate file "%s" to target-language="%s"', languageXliffFilePath, lang);
            }
        }
    };
    /**
     * Handle the case of changed id due to small white space changes.
     * @param masterTransUnit unit in master file
     * @param languageSpecificMessagesFile translation file
     * @param lastProcessedUnit Unit before the one processed here. New unit will be inserted after this one.
     * @return processed unit, if done, null if no changed unit found
     */
    XliffMerge.prototype.processChangedIdUnit = function (masterTransUnit, languageSpecificMessagesFile, lastProcessedUnit) {
        var _this = this;
        var changedTransUnit = null;
        languageSpecificMessagesFile.forEachTransUnit(function (languageTransUnit) {
            if (_this.areSourcesNearlyEqual(languageTransUnit, masterTransUnit)) {
                changedTransUnit = languageTransUnit;
            }
        });
        if (!changedTransUnit) {
            return null;
        }
        var mergedTransUnit = languageSpecificMessagesFile.importNewTransUnit(masterTransUnit, false, false, (this.parameters.preserveOrder()) ? lastProcessedUnit : undefined);
        var translatedContent = changedTransUnit.targetContent();
        if (translatedContent) { // issue #68 set translated only, if it is really translated
            mergedTransUnit.translate(translatedContent);
            mergedTransUnit.setTargetState(i18nsupport_lib_1.STATE_TRANSLATED);
        }
        return mergedTransUnit;
    };
    /**
     * test wether the sources of 2 trans units are equal ignoring white spaces.
     * @param tu1 tu1
     * @param tu2 tu2
     */
    XliffMerge.prototype.areSourcesNearlyEqual = function (tu1, tu2) {
        if ((tu1 && !tu2) || (tu2 && !tu1)) {
            return false;
        }
        var tu1Normalized = tu1.sourceContentNormalized();
        var tu2Normalized = tu2.sourceContentNormalized();
        if (tu1Normalized.isICUMessage()) {
            if (tu2Normalized.isICUMessage()) {
                var icu1Normalized = tu1Normalized.getICUMessage().asNativeString().trim();
                var icu2Normalized = tu2Normalized.getICUMessage().asNativeString().trim();
                return icu1Normalized === icu2Normalized;
            }
            else {
                return false;
            }
        }
        if (tu1Normalized.containsICUMessageRef()) {
            var icuref1Normalized = tu1Normalized.asNativeString().trim();
            var icuref2Normalized = tu2Normalized.asNativeString().trim();
            return icuref1Normalized === icuref2Normalized;
        }
        var s1Normalized = tu1Normalized.asDisplayString(i18nsupport_lib_1.NORMALIZATION_FORMAT_DEFAULT).trim();
        var s2Normalized = tu2Normalized.asDisplayString(i18nsupport_lib_1.NORMALIZATION_FORMAT_DEFAULT).trim();
        return s1Normalized === s2Normalized;
    };
    XliffMerge.prototype.areSourceReferencesEqual = function (ref1, ref2) {
        if (((0, util_2.isNullOrUndefined)(ref1) && !(0, util_2.isNullOrUndefined)(ref2)) || ((0, util_2.isNullOrUndefined)(ref2) && !(0, util_2.isNullOrUndefined)(ref1))) {
            return false;
        }
        if ((0, util_2.isNullOrUndefined)(ref1) && (0, util_2.isNullOrUndefined)(ref2)) {
            return true;
        }
        // bot refs are set now, convert to set to compare them
        var set1 = new Set();
        ref1.forEach(function (ref) { set1.add(ref.sourcefile + ':' + ref.linenumber); });
        var set2 = new Set();
        ref2.forEach(function (ref) { set2.add(ref.sourcefile + ':' + ref.linenumber); });
        if (set1.size !== set2.size) {
            return false;
        }
        var match = true;
        set2.forEach(function (ref) {
            if (!set1.has(ref)) {
                match = false;
            }
        });
        return match;
    };
    return XliffMerge;
}());
exports.XliffMerge = XliffMerge;
