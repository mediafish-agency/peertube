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
exports.XmbFile = exports.XTB_DOCTYPE = void 0;
var constants_1 = require("../api/constants");
var util_1 = require("util");
var xmb_trans_unit_1 = require("./xmb-trans-unit");
var abstract_translation_messages_file_1 = require("./abstract-translation-messages-file");
/**
 * Created by martin on 10.03.2017.
 * xmb-File access.
 */
/**
 * Doctype of xtb translation file corresponding with thos xmb file.
 */
exports.XTB_DOCTYPE = "<!DOCTYPE translationbundle [\n  <!ELEMENT translationbundle (translation)*>\n  <!ATTLIST translationbundle lang CDATA #REQUIRED>\n  <!ELEMENT translation (#PCDATA|ph)*>\n  <!ATTLIST translation id CDATA #REQUIRED>\n  <!ELEMENT ph EMPTY>\n  <!ATTLIST ph name CDATA #REQUIRED>\n]>";
var XmbFile = /** @class */ (function (_super) {
    __extends(XmbFile, _super);
    /**
     * Create an xmb-File from source.
     * @param _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param xmlString file content
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return XmbFile
     */
    function XmbFile(_translationMessageFileFactory, xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._translationMessageFileFactory = _translationMessageFileFactory;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding);
        return _this;
    }
    XmbFile.prototype.initializeFromContent = function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('messagebundle').length !== 1) {
            throw new Error((0, util_1.format)('File "%s" seems to be no xmb file (should contain a messagebundle element)', path));
        }
        return this;
    };
    XmbFile.prototype.initializeTransUnits = function () {
        this.transUnits = [];
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('msg');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            var msg = transUnitsInFile.item(i);
            var id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push((0, util_1.format)('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new xmb_trans_unit_1.XmbTransUnit(msg, id, this));
        }
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     */
    XmbFile.prototype.i18nFormat = function () {
        return constants_1.FORMAT_XMB;
    };
    /**
     * File type.
     * Here 'XMB'
     */
    XmbFile.prototype.fileType = function () {
        return constants_1.FILETYPE_XMB;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    XmbFile.prototype.elementsWithMixedContent = function () {
        return ['message'];
    };
    /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @return Language or null
     */
    XmbFile.prototype.guessLanguageFromFilename = function () {
        if (this._filename) {
            var parts = this._filename.split('.');
            if (parts.length > 2 && parts[parts.length - 1].toLowerCase() === 'xmb') {
                return parts[parts.length - 2];
            }
        }
        return null;
    };
    /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return source language.
     */
    XmbFile.prototype.sourceLanguage = function () {
        return this.guessLanguageFromFilename();
    };
    /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param language language
     */
    XmbFile.prototype.setSourceLanguage = function (language) {
        // do nothing, xmb has no notation for this.
    };
    /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return target language.
     */
    XmbFile.prototype.targetLanguage = function () {
        return this.guessLanguageFromFilename();
    };
    /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param language language
     */
    XmbFile.prototype.setTargetLanguage = function (language) {
        // do nothing, xmb has no notation for this.
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
    XmbFile.prototype.importNewTransUnit = function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        throw Error('xmb file cannot be used to store translations, use xtb file');
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
    XmbFile.prototype.createTranslationFileForLang = function (lang, filename, isDefaultLang, copyContent) {
        var translationbundleXMLSource = '<?xml version="1.0" encoding="UTF-8"?>\n' + exports.XTB_DOCTYPE + '\n<translationbundle>\n</translationbundle>\n';
        var translationFile = this._translationMessageFileFactory.createFileFromFileContent(constants_1.FORMAT_XTB, translationbundleXMLSource, filename, this.encoding(), { xmlContent: this.editedContent(), path: this.filename(), encoding: this.encoding() });
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.setNewTransUnitTargetPraefix(this.getNewTransUnitTargetPraefix());
        translationFile.setNewTransUnitTargetSuffix(this.getNewTransUnitTargetSuffix());
        this.forEachTransUnit(function (tu) {
            translationFile.importNewTransUnit(tu, isDefaultLang, copyContent);
        });
        return translationFile;
    };
    return XmbFile;
}(abstract_translation_messages_file_1.AbstractTranslationMessagesFile));
exports.XmbFile = XmbFile;
