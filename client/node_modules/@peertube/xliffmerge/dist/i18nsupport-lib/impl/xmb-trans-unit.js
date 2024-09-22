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
exports.XmbTransUnit = void 0;
var dom_utilities_1 = require("./dom-utilities");
var abstract_trans_unit_1 = require("./abstract-trans-unit");
var xmb_message_parser_1 = require("./xmb-message-parser");
/**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XMB file.
 */
var XmbTransUnit = /** @class */ (function (_super) {
    __extends(XmbTransUnit, _super);
    function XmbTransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @param sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return source and linenumber
     */
    XmbTransUnit.parseSourceAndPos = function (sourceAndPos) {
        var index = sourceAndPos.lastIndexOf(':');
        if (index < 0) {
            return {
                sourcefile: sourceAndPos,
                linenumber: 0
            };
        }
        else {
            return {
                sourcefile: sourceAndPos.substring(0, index),
                linenumber: XmbTransUnit.parseLineNumber(sourceAndPos.substring(index + 1))
            };
        }
    };
    XmbTransUnit.parseLineNumber = function (lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    };
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return source content
     */
    XmbTransUnit.prototype.sourceContent = function () {
        var msgContent = dom_utilities_1.DOMUtilities.getXMLContent(this._element);
        var reSourceElem = /<source>.*<\/source>/g;
        msgContent = msgContent.replace(reSourceElem, '');
        return msgContent;
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    XmbTransUnit.prototype.supportsSetSourceContent = function () {
        return false;
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    XmbTransUnit.prototype.setSourceContent = function (newContent) {
        // not supported
    };
    /**
     * Return a parser used for normalized messages.
     */
    XmbTransUnit.prototype.messageParser = function () {
        return new xmb_message_parser_1.XmbMessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    XmbTransUnit.prototype.createSourceContentNormalized = function () {
        return this.messageParser().createNormalizedMessageFromXML(this._element, null);
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    XmbTransUnit.prototype.targetContent = function () {
        // in fact, target and source are just the same in xmb
        return this.sourceContent();
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    XmbTransUnit.prototype.targetContentNormalized = function () {
        return new xmb_message_parser_1.XmbMessageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    };
    /**
     * State of the translation.
     * (not supported in xmb)
     */
    XmbTransUnit.prototype.nativeTargetState = function () {
        return null; // not supported in xmb
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    XmbTransUnit.prototype.mapStateToNativeState = function (state) {
        return state;
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    XmbTransUnit.prototype.mapNativeStateToState = function (nativeState) {
        return nativeState;
    };
    /**
     * set state in xml.
     * (not supported in xmb)
     * @param nativeState nativeState
     */
    XmbTransUnit.prototype.setNativeTargetState = function (nativeState) {
        // not supported for xmb
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    XmbTransUnit.prototype.sourceReferences = function () {
        var sourceElements = this._element.getElementsByTagName('source');
        var sourceRefs = [];
        for (var i = 0; i < sourceElements.length; i++) {
            var elem = sourceElements.item(i);
            var sourceAndPos = dom_utilities_1.DOMUtilities.getPCDATA(elem);
            sourceRefs.push(XmbTransUnit.parseSourceAndPos(sourceAndPos));
        }
        return sourceRefs;
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    XmbTransUnit.prototype.setSourceReferences = function (sourceRefs) {
        this.removeAllSourceReferences();
        var insertPosition = this._element.childNodes.item(0);
        for (var i = sourceRefs.length - 1; i >= 0; i--) {
            var ref = sourceRefs[i];
            var source = this._element.ownerDocument.createElement('source');
            source.appendChild(this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            this._element.insertBefore(source, insertPosition);
            insertPosition = source;
        }
    };
    XmbTransUnit.prototype.removeAllSourceReferences = function () {
        var sourceElements = this._element.getElementsByTagName('source');
        var toBeRemoved = [];
        for (var i = 0; i < sourceElements.length; i++) {
            var elem = sourceElements.item(i);
            toBeRemoved.push(elem);
        }
        toBeRemoved.forEach(function (elem) { elem.parentNode.removeChild(elem); });
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xmb this is stored in the attribute "desc".
     */
    XmbTransUnit.prototype.description = function () {
        return this._element.getAttribute('desc');
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xmb this is stored in the attribute "meaning".
     */
    XmbTransUnit.prototype.meaning = function () {
        return this._element.getAttribute('meaning');
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    XmbTransUnit.prototype.supportsSetDescriptionAndMeaning = function () {
        return false;
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    XmbTransUnit.prototype.setDescription = function (description) {
        // not supported, do nothing
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    XmbTransUnit.prototype.setMeaning = function (meaning) {
        // not supported, do nothing
    };
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     */
    XmbTransUnit.prototype.notes = function () {
        return [];
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    XmbTransUnit.prototype.supportsSetNotes = function () {
        return false;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * NOT Supported in xmb/xtb
     */
    XmbTransUnit.prototype.setNotes = function (newNotes) {
        // not supported, do nothing
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xmb there is nothing to do, because there is only a target, no source.
     */
    XmbTransUnit.prototype.cloneWithSourceAsTarget = function (isDefaultLang, copyContent, targetFile) {
        return this;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    XmbTransUnit.prototype.useSourceAsTarget = function (isDefaultLang, copyContent) {
        // do nothing
    };
    /**
     * Set the translation to a given string (including markup).
     * In fact, xmb cannot be translated.
     * So this throws an error.
     * @param translation translation
     */
    XmbTransUnit.prototype.translateNative = function (translation) {
        throw new Error('You cannot translate xmb files, use xtb instead.');
    };
    return XmbTransUnit;
}(abstract_trans_unit_1.AbstractTransUnit));
exports.XmbTransUnit = XmbTransUnit;
