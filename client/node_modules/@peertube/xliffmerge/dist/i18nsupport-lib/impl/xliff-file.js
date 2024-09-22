"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.XliffFile = void 0;
var util_1 = require("util");
var constants_1 = require("../api/constants");
var dom_utilities_1 = require("./dom-utilities");
var xliff_trans_unit_1 = require("./xliff-trans-unit");
var abstract_translation_messages_file_1 = require("./abstract-translation-messages-file");
/**
 * Created by martin on 23.02.2017.
 * Ab xliff file read from a source file.
 * Defines some relevant get and set method for reading and modifying such a file.
 */
var XliffFile = /** @class */ (function (_super) {
    __extends(XliffFile, _super);
    /**
     * Create an xlf-File from source.
     * @param xmlString source read from file.
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return XliffFile
     */
    function XliffFile(xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding);
        return _this;
    }
    XliffFile.prototype.initializeFromContent = function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        var xliffList = this._parsedDocument.getElementsByTagName('xliff');
        if (xliffList.length !== 1) {
            throw new Error((0, util_1.format)('File "%s" seems to be no xliff file (should contain an xliff element)', path));
        }
        else {
            var version = xliffList.item(0).getAttribute('version');
            var expectedVersion = '1.2';
            if (version !== expectedVersion) {
                throw new Error((0, util_1.format)('File "%s" seems to be no xliff 1.2 file, version should be %s, found %s', path, expectedVersion, version));
            }
        }
        return this;
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     */
    XliffFile.prototype.i18nFormat = function () {
        return constants_1.FORMAT_XLIFF12;
    };
    /**
     * File type.
     * Here 'XLIFF 1.2'
     */
    XliffFile.prototype.fileType = function () {
        return constants_1.FILETYPE_XLIFF12;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    XliffFile.prototype.elementsWithMixedContent = function () {
        return ['source', 'target', 'tool', 'seg-source', 'g', 'ph', 'bpt', 'ept', 'it', 'sub', 'mrk'];
    };
    XliffFile.prototype.initializeTransUnits = function () {
        this.transUnits = [];
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('trans-unit');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            var transunit = transUnitsInFile.item(i);
            var id = transunit.getAttribute('id');
            if (!id) {
                this._warnings.push((0, util_1.format)('oops, trans-unit without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new xliff_trans_unit_1.XliffTransUnit(transunit, id, this));
        }
    };
    /**
     * Get source language.
     * @return source language.
     */
    XliffFile.prototype.sourceLanguage = function () {
        var fileElem = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            return fileElem.getAttribute('source-language');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the source language.
     * @param language language
     */
    XliffFile.prototype.setSourceLanguage = function (language) {
        var fileElem = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            fileElem.setAttribute('source-language', language);
        }
    };
    /**
     * Get target language.
     * @return target language.
     */
    XliffFile.prototype.targetLanguage = function () {
        var fileElem = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            return fileElem.getAttribute('target-language');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the target language.
     * @param language language
     */
    XliffFile.prototype.setTargetLanguage = function (language) {
        var fileElem = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            fileElem.setAttribute('target-language', language);
        }
    };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return the newly imported trans unit (since version 1.7.0)
     * @throws an error if trans-unit with same id already is in the file.
     */
    XliffFile.prototype.importNewTransUnit = function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        if (this.transUnitWithId(foreignTransUnit.id)) {
            throw new Error((0, util_1.format)('tu with id %s already exists in file, cannot import it', foreignTransUnit.id));
        }
        var newTu = foreignTransUnit.cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        var bodyElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'body');
        if (!bodyElement) {
            throw new Error((0, util_1.format)('File "%s" seems to be no xliff 1.2 file (should contain a body element)', this._filename));
        }
        var inserted = false;
        var isAfterElementPartOfFile = false;
        if (!!importAfterElement) {
            var insertionPoint = this.transUnitWithId(importAfterElement.id);
            if (!!insertionPoint) {
                isAfterElementPartOfFile = true;
            }
        }
        if (importAfterElement === undefined || (importAfterElement && !isAfterElementPartOfFile)) {
            bodyElement.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            var firstUnitElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'trans-unit');
            if (firstUnitElement) {
                dom_utilities_1.DOMUtilities.insertBefore(newTu.asXmlElement(), firstUnitElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to body
                bodyElement.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            var refUnitElement = dom_utilities_1.DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'trans-unit', importAfterElement.id);
            if (refUnitElement) {
                dom_utilities_1.DOMUtilities.insertAfter(newTu.asXmlElement(), refUnitElement);
                inserted = true;
            }
        }
        if (inserted) {
            this.lazyInitializeTransUnits();
            this.transUnits.push(newTu);
            this.countNumbers();
            return newTu;
        }
        else {
            return null;
        }
    };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
    XliffFile.prototype.createTranslationFileForLang = function (lang, filename, isDefaultLang, copyContent) {
        var translationFile = new XliffFile(this.editedContent(), filename, this.encoding());
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.forEachTransUnit(function (transUnit) {
            transUnit.useSourceAsTarget(isDefaultLang, copyContent);
        });
        return translationFile;
    };
    return XliffFile;
}(abstract_translation_messages_file_1.AbstractTranslationMessagesFile));
exports.XliffFile = XliffFile;
