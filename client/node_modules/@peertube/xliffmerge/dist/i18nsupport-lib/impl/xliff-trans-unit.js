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
exports.XliffTransUnit = void 0;
var constants_1 = require("../api/constants");
var dom_utilities_1 = require("./dom-utilities");
var abstract_trans_unit_1 = require("./abstract-trans-unit");
var xliff_message_parser_1 = require("./xliff-message-parser");
var util_1 = require("util");
/**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XLIFF 1.2 file.
 */
var XliffTransUnit = /** @class */ (function (_super) {
    __extends(XliffTransUnit, _super);
    function XliffTransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    XliffTransUnit.prototype.sourceContent = function () {
        var sourceElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        return dom_utilities_1.DOMUtilities.getXMLContent(sourceElement);
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    XliffTransUnit.prototype.setSourceContent = function (newContent) {
        var source = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (!source) {
            // should not happen, there always has to be a source, but who knows..
            source = this._element.appendChild(this._element.ownerDocument.createElement('source'));
        }
        dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(source, newContent);
    };
    /**
     * Return a parser used for normalized messages.
     */
    XliffTransUnit.prototype.messageParser = function () {
        return new xliff_message_parser_1.XliffMessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    XliffTransUnit.prototype.createSourceContentNormalized = function () {
        var sourceElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (sourceElement) {
            return this.messageParser().createNormalizedMessageFromXML(sourceElement, null);
        }
        else {
            return null;
        }
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    XliffTransUnit.prototype.targetContent = function () {
        var targetElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return dom_utilities_1.DOMUtilities.getXMLContent(targetElement);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    XliffTransUnit.prototype.targetContentNormalized = function () {
        var targetElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return new xliff_message_parser_1.XliffMessageParser().createNormalizedMessageFromXML(targetElement, this.sourceContentNormalized());
    };
    /**
     * State of the translation as stored in the xml.
     */
    XliffTransUnit.prototype.nativeTargetState = function () {
        var targetElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (targetElement) {
            return targetElement.getAttribute('state');
        }
        else {
            return null;
        }
    };
    /**
     * set state in xml.
     * @param nativeState nativeState
     */
    XliffTransUnit.prototype.setNativeTargetState = function (nativeState) {
        var targetElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (targetElement) {
            targetElement.setAttribute('state', nativeState);
        }
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    XliffTransUnit.prototype.mapStateToNativeState = function (state) {
        switch (state) {
            case constants_1.STATE_NEW:
                return 'new';
            case constants_1.STATE_TRANSLATED:
                return 'translated';
            case constants_1.STATE_FINAL:
                return 'final';
            default:
                throw new Error('unknown state ' + state);
        }
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    XliffTransUnit.prototype.mapNativeStateToState = function (nativeState) {
        switch (nativeState) {
            case 'new':
                return constants_1.STATE_NEW;
            case 'needs-translation':
                return constants_1.STATE_NEW;
            case 'translated':
                return constants_1.STATE_TRANSLATED;
            case 'needs-adaptation':
                return constants_1.STATE_TRANSLATED;
            case 'needs-l10n':
                return constants_1.STATE_TRANSLATED;
            case 'needs-review-adaptation':
                return constants_1.STATE_TRANSLATED;
            case 'needs-review-l10n':
                return constants_1.STATE_TRANSLATED;
            case 'needs-review-translation':
                return constants_1.STATE_TRANSLATED;
            case 'final':
                return constants_1.STATE_FINAL;
            case 'signed-off':
                return constants_1.STATE_FINAL;
            default:
                return constants_1.STATE_NEW;
        }
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    XliffTransUnit.prototype.sourceReferences = function () {
        var sourceElements = this._element.getElementsByTagName('context-group');
        var sourceRefs = [];
        for (var i = 0; i < sourceElements.length; i++) {
            var elem = sourceElements.item(i);
            if (elem.getAttribute('purpose') === 'location') {
                var contextElements = elem.getElementsByTagName('context');
                var sourcefile = null;
                var linenumber = 0;
                for (var j = 0; j < contextElements.length; j++) {
                    var contextElem = contextElements.item(j);
                    if (contextElem.getAttribute('context-type') === 'sourcefile') {
                        sourcefile = dom_utilities_1.DOMUtilities.getPCDATA(contextElem);
                    }
                    if (contextElem.getAttribute('context-type') === 'linenumber') {
                        linenumber = Number.parseInt(dom_utilities_1.DOMUtilities.getPCDATA(contextElem), 10);
                    }
                }
                sourceRefs.push({ sourcefile: sourcefile, linenumber: linenumber });
            }
        }
        return sourceRefs;
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    XliffTransUnit.prototype.setSourceReferences = function (sourceRefs) {
        var _this = this;
        this.removeAllSourceReferences();
        sourceRefs.forEach(function (ref) {
            var contextGroup = _this._element.ownerDocument.createElement('context-group');
            contextGroup.setAttribute('purpose', 'location');
            var contextSource = _this._element.ownerDocument.createElement('context');
            contextSource.setAttribute('context-type', 'sourcefile');
            contextSource.appendChild(_this._element.ownerDocument.createTextNode(ref.sourcefile));
            var contextLine = _this._element.ownerDocument.createElement('context');
            contextLine.setAttribute('context-type', 'linenumber');
            contextLine.appendChild(_this._element.ownerDocument.createTextNode(ref.linenumber.toString(10)));
            contextGroup.appendChild(contextSource);
            contextGroup.appendChild(contextLine);
            _this._element.appendChild(contextGroup);
        });
    };
    XliffTransUnit.prototype.removeAllSourceReferences = function () {
        var sourceElements = this._element.getElementsByTagName('context-group');
        var toBeRemoved = [];
        for (var i = 0; i < sourceElements.length; i++) {
            var elem = sourceElements.item(i);
            if (elem.getAttribute('purpose') === 'location') {
                toBeRemoved.push(elem);
            }
        }
        toBeRemoved.forEach(function (elem) { elem.parentNode.removeChild(elem); });
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff this is stored as a note element with attribute from="description".
     */
    XliffTransUnit.prototype.description = function () {
        var noteElem = this.findNoteElementWithFromAttribute('description');
        if (noteElem) {
            return dom_utilities_1.DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    XliffTransUnit.prototype.setDescription = function (description) {
        var noteElem = this.findNoteElementWithFromAttribute('description');
        if (description) {
            if ((0, util_1.isNullOrUndefined)(noteElem)) {
                // create it
                noteElem = this.createNoteElementWithFromAttribute('description', description);
            }
            else {
                dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(noteElem, description);
            }
        }
        else {
            if (!(0, util_1.isNullOrUndefined)(noteElem)) {
                // remove node
                this.removeNoteElementWithFromAttribute('description');
            }
        }
    };
    /**
     * Find a note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     * @return element or null is absent
     */
    XliffTransUnit.prototype.findNoteElementWithFromAttribute = function (attrValue) {
        var noteElements = this._element.getElementsByTagName('note');
        for (var i = 0; i < noteElements.length; i++) {
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('from') === attrValue) {
                return noteElem;
            }
        }
        return null;
    };
    /**
     * Get all note elements where from attribute is not description or meaning
     * @return elements
     */
    XliffTransUnit.prototype.findAllAdditionalNoteElements = function () {
        var noteElements = this._element.getElementsByTagName('note');
        var result = [];
        for (var i = 0; i < noteElements.length; i++) {
            var noteElem = noteElements.item(i);
            var fromAttribute = noteElem.getAttribute('from');
            if (fromAttribute !== 'description' && fromAttribute !== 'meaning') {
                result.push(noteElem);
            }
        }
        return result;
    };
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @param fromAttrValue value of "from" attribute
     * @param content text value of note element
     * @return the new created element
     */
    XliffTransUnit.prototype.createNoteElementWithFromAttribute = function (fromAttrValue, content) {
        var noteElement = this._element.ownerDocument.createElement('note');
        if (fromAttrValue) {
            noteElement.setAttribute('from', fromAttrValue);
        }
        noteElement.setAttribute('priority', '1');
        if (content) {
            dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(noteElement, content);
        }
        this._element.appendChild(noteElement);
        return noteElement;
    };
    /**
     * Remove note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     */
    XliffTransUnit.prototype.removeNoteElementWithFromAttribute = function (attrValue) {
        var noteElement = this.findNoteElementWithFromAttribute(attrValue);
        if (noteElement) {
            this._element.removeChild(noteElement);
        }
    };
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     */
    XliffTransUnit.prototype.removeAllAdditionalNoteElements = function () {
        var _this = this;
        var noteElements = this.findAllAdditionalNoteElements();
        noteElements.forEach(function (noteElement) {
            _this._element.removeChild(noteElement);
        });
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff this is stored as a note element with attribute from="meaning".
     */
    XliffTransUnit.prototype.meaning = function () {
        var noteElem = this.findNoteElementWithFromAttribute('meaning');
        if (noteElem) {
            return dom_utilities_1.DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change meaning property of trans-unit.
     * @param  meaning meaning
     */
    XliffTransUnit.prototype.setMeaning = function (meaning) {
        var noteElem = this.findNoteElementWithFromAttribute('meaning');
        if (meaning) {
            if ((0, util_1.isNullOrUndefined)(noteElem)) {
                // create it
                noteElem = this.createNoteElementWithFromAttribute('meaning', meaning);
            }
            else {
                dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(noteElem, meaning);
            }
        }
        else {
            if (!(0, util_1.isNullOrUndefined)(noteElem)) {
                // remove node
                this.removeNoteElementWithFromAttribute('meaning');
            }
        }
    };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     */
    XliffTransUnit.prototype.notes = function () {
        var noteElememts = this.findAllAdditionalNoteElements();
        return noteElememts.map(function (elem) {
            return {
                from: elem.getAttribute('from'),
                text: dom_utilities_1.DOMUtilities.getPCDATA(elem)
            };
        });
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    XliffTransUnit.prototype.supportsSetNotes = function () {
        return true;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * @throws an Error if any note contains description or meaning as from attribute.
     */
    XliffTransUnit.prototype.setNotes = function (newNotes) {
        var _this = this;
        if (!(0, util_1.isNullOrUndefined)(newNotes)) {
            this.checkNotes(newNotes);
        }
        this.removeAllAdditionalNoteElements();
        if (!(0, util_1.isNullOrUndefined)(newNotes)) {
            newNotes.forEach(function (note) {
                var noteElem = _this.createNoteElementWithFromAttribute(note.from, note.text);
            });
        }
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    XliffTransUnit.prototype.translateNative = function (translation) {
        var target = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            var source = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
            target = dom_utilities_1.DOMUtilities.createFollowingSibling('target', source);
        }
        dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(target, translation);
        this.setTargetState(constants_1.STATE_TRANSLATED);
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     */
    XliffTransUnit.prototype.cloneWithSourceAsTarget = function (isDefaultLang, copyContent, targetFile) {
        var element = this._element.cloneNode(true);
        var clone = new XliffTransUnit(element, this._id, targetFile);
        clone.useSourceAsTarget(isDefaultLang, copyContent);
        return clone;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    XliffTransUnit.prototype.useSourceAsTarget = function (isDefaultLang, copyContent) {
        var source = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        var target = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            target = dom_utilities_1.DOMUtilities.createFollowingSibling('target', source);
        }
        if (isDefaultLang || copyContent) {
            var sourceString = dom_utilities_1.DOMUtilities.getXMLContent(source);
            var newTargetString = sourceString;
            if (!this.isICUMessage(sourceString)) {
                newTargetString = this.translationMessagesFile().getNewTransUnitTargetPraefix()
                    + sourceString
                    + this.translationMessagesFile().getNewTransUnitTargetSuffix();
            }
            dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(target, newTargetString);
        }
        else {
            dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(target, '');
        }
        if (isDefaultLang) {
            target.setAttribute('state', this.mapStateToNativeState(constants_1.STATE_FINAL));
        }
        else {
            target.setAttribute('state', this.mapStateToNativeState(constants_1.STATE_NEW));
        }
    };
    return XliffTransUnit;
}(abstract_trans_unit_1.AbstractTransUnit));
exports.XliffTransUnit = XliffTransUnit;
