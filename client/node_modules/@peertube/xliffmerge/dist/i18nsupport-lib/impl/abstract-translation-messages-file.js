"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTranslationMessagesFile = void 0;
var constants_1 = require("../api/constants");
var util_1 = require("util");
var xmldom_1 = require("@xmldom/xmldom");
var xml_serializer_1 = require("./xml-serializer");
/**
 * Created by roobm on 09.05.2017.
 * Abstract superclass for all implementations of ITranslationMessagesFile.
 */
var AbstractTranslationMessagesFile = /** @class */ (function () {
    function AbstractTranslationMessagesFile() {
        this.transUnits = null;
        this._warnings = [];
    }
    /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @param xmlString xmlString
     * @param path path
     * @param encoding encoding
     * @param optionalMaster optionalMaster
     */
    AbstractTranslationMessagesFile.prototype.parseContent = function (xmlString, path, encoding, optionalMaster) {
        this._filename = path;
        this._encoding = encoding;
        this._parsedDocument = new xmldom_1.DOMParser().parseFromString(xmlString, 'text/xml');
        this._fileEndsWithEOL = xmlString.endsWith('\n');
    };
    AbstractTranslationMessagesFile.prototype.lazyInitializeTransUnits = function () {
        if ((0, util_1.isNullOrUndefined)(this.transUnits)) {
            this.initializeTransUnits();
            this.countNumbers();
        }
    };
    /**
     * count units after changes of trans units
     */
    AbstractTranslationMessagesFile.prototype.countNumbers = function () {
        var _this = this;
        this._numberOfTransUnitsWithMissingId = 0;
        this._numberOfUntranslatedTransUnits = 0;
        this._numberOfReviewedTransUnits = 0;
        this.forEachTransUnit(function (tu) {
            if ((0, util_1.isNullOrUndefined)(tu.id) || tu.id === '') {
                _this._numberOfTransUnitsWithMissingId++;
            }
            var state = tu.targetState();
            if ((0, util_1.isNullOrUndefined)(state) || state === constants_1.STATE_NEW) {
                _this._numberOfUntranslatedTransUnits++;
            }
            if (state === constants_1.STATE_TRANSLATED) {
                _this._numberOfReviewedTransUnits++;
            }
        });
    };
    AbstractTranslationMessagesFile.prototype.warnings = function () {
        this.lazyInitializeTransUnits();
        return this._warnings;
    };
    /**
     * Total number of translation units found in the file.
     */
    AbstractTranslationMessagesFile.prototype.numberOfTransUnits = function () {
        this.lazyInitializeTransUnits();
        return this.transUnits.length;
    };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    AbstractTranslationMessagesFile.prototype.numberOfUntranslatedTransUnits = function () {
        this.lazyInitializeTransUnits();
        return this._numberOfUntranslatedTransUnits;
    };
    /**
     * Number of translation units with state 'final'.
     */
    AbstractTranslationMessagesFile.prototype.numberOfReviewedTransUnits = function () {
        this.lazyInitializeTransUnits();
        return this._numberOfReviewedTransUnits;
    };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    AbstractTranslationMessagesFile.prototype.numberOfTransUnitsWithMissingId = function () {
        this.lazyInitializeTransUnits();
        return this._numberOfTransUnitsWithMissingId;
    };
    /**
     * Loop over all Translation Units.
     * @param callback callback
     */
    AbstractTranslationMessagesFile.prototype.forEachTransUnit = function (callback) {
        this.lazyInitializeTransUnits();
        this.transUnits.forEach(function (tu) { return callback(tu); });
    };
    /**
     * Get trans-unit with given id.
     * @param id id
     * @return trans-unit with given id.
     */
    AbstractTranslationMessagesFile.prototype.transUnitWithId = function (id) {
        this.lazyInitializeTransUnits();
        return this.transUnits.find(function (tu) { return tu.id === id; });
    };
    /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param targetPraefix targetPraefix
     */
    AbstractTranslationMessagesFile.prototype.setNewTransUnitTargetPraefix = function (targetPraefix) {
        this.targetPraefix = targetPraefix;
    };
    /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return the praefix used when copying source to target.
     */
    AbstractTranslationMessagesFile.prototype.getNewTransUnitTargetPraefix = function () {
        return (0, util_1.isNullOrUndefined)(this.targetPraefix) ? '' : this.targetPraefix;
    };
    /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param targetSuffix targetSuffix
     */
    AbstractTranslationMessagesFile.prototype.setNewTransUnitTargetSuffix = function (targetSuffix) {
        this.targetSuffix = targetSuffix;
    };
    /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return the suffix used when copying source to target.
     */
    AbstractTranslationMessagesFile.prototype.getNewTransUnitTargetSuffix = function () {
        return (0, util_1.isNullOrUndefined)(this.targetSuffix) ? '' : this.targetSuffix;
    };
    /**
     * Remove the trans-unit with the given id.
     * @param id id
     */
    AbstractTranslationMessagesFile.prototype.removeTransUnitWithId = function (id) {
        var tuNode = this._parsedDocument.getElementById(id);
        if (tuNode) {
            tuNode.parentNode.removeChild(tuNode);
            this.lazyInitializeTransUnits();
            this.transUnits = this.transUnits.filter(function (tu) { return tu.id !== id; });
            this.countNumbers();
        }
    };
    /**
     * The filename where the data is read from.
     */
    AbstractTranslationMessagesFile.prototype.filename = function () {
        return this._filename;
    };
    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     */
    AbstractTranslationMessagesFile.prototype.encoding = function () {
        return this._encoding;
    };
    /**
     * The xml content to be saved after changes are made.
     * @param beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     */
    AbstractTranslationMessagesFile.prototype.editedContent = function (beautifyOutput) {
        var options = {};
        if (beautifyOutput === true) {
            options.beautify = true;
            options.indentString = '  ';
            options.mixedContentElements = this.elementsWithMixedContent();
        }
        var result = new xml_serializer_1.XmlSerializer().serializeToString(this._parsedDocument, options);
        if (this._fileEndsWithEOL) {
            // add eol if there was eol in original source
            return result + '\n';
        }
        else {
            return result;
        }
    };
    return AbstractTranslationMessagesFile;
}());
exports.AbstractTranslationMessagesFile = AbstractTranslationMessagesFile;
