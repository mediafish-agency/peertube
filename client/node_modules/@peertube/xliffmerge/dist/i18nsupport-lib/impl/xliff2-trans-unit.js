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
exports.Xliff2TransUnit = void 0;
var constants_1 = require("../api/constants");
var dom_utilities_1 = require("./dom-utilities");
var abstract_trans_unit_1 = require("./abstract-trans-unit");
var xliff2_message_parser_1 = require("./xliff2-message-parser");
var util_1 = require("util");
/**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
var Xliff2TransUnit = /** @class */ (function (_super) {
    __extends(Xliff2TransUnit, _super);
    function Xliff2TransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    Xliff2TransUnit.prototype.sourceContent = function () {
        var sourceElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        return dom_utilities_1.DOMUtilities.getXMLContent(sourceElement);
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    Xliff2TransUnit.prototype.setSourceContent = function (newContent) {
        var source = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (!source) {
            // should not happen, there always has to be a source, but who knows..
            var segment = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'segment');
            source = segment.parentNode.appendChild(this._element.ownerDocument.createElement('source'));
        }
        dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(source, newContent);
    };
    /**
     * Return a parser used for normalized messages.
     */
    Xliff2TransUnit.prototype.messageParser = function () {
        return new xliff2_message_parser_1.Xliff2MessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    Xliff2TransUnit.prototype.createSourceContentNormalized = function () {
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
    Xliff2TransUnit.prototype.targetContent = function () {
        var targetElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return dom_utilities_1.DOMUtilities.getXMLContent(targetElement);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    Xliff2TransUnit.prototype.targetContentNormalized = function () {
        var targetElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return new xliff2_message_parser_1.Xliff2MessageParser().createNormalizedMessageFromXML(targetElement, this.sourceContentNormalized());
    };
    /**
     * State of the translation as stored in the xml.
     */
    Xliff2TransUnit.prototype.nativeTargetState = function () {
        var segmentElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            return segmentElement.getAttribute('state');
        }
        else {
            return null;
        }
    };
    /**
     * set state in xml.
     * @param nativeState nativeState
     */
    Xliff2TransUnit.prototype.setNativeTargetState = function (nativeState) {
        var segmentElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            segmentElement.setAttribute('state', nativeState);
        }
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    Xliff2TransUnit.prototype.mapStateToNativeState = function (state) {
        switch (state) {
            case constants_1.STATE_NEW:
                return 'initial';
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
    Xliff2TransUnit.prototype.mapNativeStateToState = function (nativeState) {
        switch (nativeState) {
            case 'initial':
                return constants_1.STATE_NEW;
            case 'translated':
                return constants_1.STATE_TRANSLATED;
            case 'reviewed': // same as translated
                return constants_1.STATE_TRANSLATED;
            case 'final':
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
    Xliff2TransUnit.prototype.sourceReferences = function () {
        // Source is found as <file>:<line> in <note category="location">...
        var noteElements = this._element.getElementsByTagName('note');
        var sourceRefs = [];
        for (var i = 0; i < noteElements.length; i++) {
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === 'location') {
                var sourceAndPos = dom_utilities_1.DOMUtilities.getPCDATA(noteElem);
                sourceRefs.push(this.parseSourceAndPos(sourceAndPos));
            }
        }
        return sourceRefs;
    };
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @param sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return source and line number
     */
    Xliff2TransUnit.prototype.parseSourceAndPos = function (sourceAndPos) {
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
                linenumber: this.parseLineNumber(sourceAndPos.substring(index + 1))
            };
        }
    };
    Xliff2TransUnit.prototype.parseLineNumber = function (lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    Xliff2TransUnit.prototype.setSourceReferences = function (sourceRefs) {
        var _this = this;
        this.removeAllSourceReferences();
        var notesElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (sourceRefs.length === 0 && !(0, util_1.isNullOrUndefined)(notesElement) && notesElement.childNodes.length === 0) {
            // remove empty notes element
            notesElement.parentNode.removeChild(notesElement);
            return;
        }
        if ((0, util_1.isNullOrUndefined)(notesElement)) {
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.insertBefore(notesElement, this._element.childNodes.item(0));
        }
        sourceRefs.forEach(function (ref) {
            var note = _this._element.ownerDocument.createElement('note');
            note.setAttribute('category', 'location');
            note.appendChild(_this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            notesElement.appendChild(note);
        });
    };
    Xliff2TransUnit.prototype.removeAllSourceReferences = function () {
        var noteElements = this._element.getElementsByTagName('note');
        var toBeRemoved = [];
        for (var i = 0; i < noteElements.length; i++) {
            var elem = noteElements.item(i);
            if (elem.getAttribute('category') === 'location') {
                toBeRemoved.push(elem);
            }
        }
        toBeRemoved.forEach(function (elem) { elem.parentNode.removeChild(elem); });
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     */
    Xliff2TransUnit.prototype.description = function () {
        var noteElem = this.findNoteElementWithCategoryAttribute('description');
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
    Xliff2TransUnit.prototype.setDescription = function (description) {
        var noteElem = this.findNoteElementWithCategoryAttribute('description');
        if (description) {
            if ((0, util_1.isNullOrUndefined)(noteElem)) {
                // create it
                this.createNoteElementWithCategoryAttribute('description', description);
            }
            else {
                dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(noteElem, description);
            }
        }
        else {
            if (!(0, util_1.isNullOrUndefined)(noteElem)) {
                // remove node
                this.removeNoteElementWithCategoryAttribute('description');
            }
        }
    };
    /**
     * Find a note element with attribute category='<attrValue>'
     * @param attrValue value of category attribute
     * @return element or null is absent
     */
    Xliff2TransUnit.prototype.findNoteElementWithCategoryAttribute = function (attrValue) {
        var noteElements = this._element.getElementsByTagName('note');
        for (var i = 0; i < noteElements.length; i++) {
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === attrValue) {
                return noteElem;
            }
        }
        return null;
    };
    /**
     * Get all note elements where from attribute is not description or meaning
     * @return elements
     */
    Xliff2TransUnit.prototype.findAllAdditionalNoteElements = function () {
        var noteElements = this._element.getElementsByTagName('note');
        var result = [];
        for (var i = 0; i < noteElements.length; i++) {
            var noteElem = noteElements.item(i);
            var fromAttribute = noteElem.getAttribute('category');
            if (fromAttribute !== 'description' && fromAttribute !== 'meaning') {
                result.push(noteElem);
            }
        }
        return result;
    };
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @param attrValue category attribute value
     * @param content content of note element
     * @return the new created element
     */
    Xliff2TransUnit.prototype.createNoteElementWithCategoryAttribute = function (attrValue, content) {
        var notesElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if ((0, util_1.isNullOrUndefined)(notesElement)) {
            // create it
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.appendChild(notesElement);
        }
        var noteElement = this._element.ownerDocument.createElement('note');
        if (attrValue) {
            noteElement.setAttribute('category', attrValue);
        }
        if (content) {
            dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(noteElement, content);
        }
        notesElement.appendChild(noteElement);
        return noteElement;
    };
    Xliff2TransUnit.prototype.removeNotesElementIfEmpty = function () {
        var notesElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (notesElement) {
            var childNote = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'note');
            if (!childNote) {
                // remove notes element
                notesElement.parentNode.removeChild(notesElement);
            }
        }
    };
    /**
     * Remove note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     */
    Xliff2TransUnit.prototype.removeNoteElementWithCategoryAttribute = function (attrValue) {
        var noteElement = this.findNoteElementWithCategoryAttribute(attrValue);
        if (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        }
        this.removeNotesElementIfEmpty();
    };
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     */
    Xliff2TransUnit.prototype.removeAllAdditionalNoteElements = function () {
        var noteElements = this.findAllAdditionalNoteElements();
        noteElements.forEach(function (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        });
        this.removeNotesElementIfEmpty();
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     */
    Xliff2TransUnit.prototype.meaning = function () {
        var noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (noteElem) {
            return dom_utilities_1.DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    Xliff2TransUnit.prototype.setMeaning = function (meaning) {
        var noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (meaning) {
            if ((0, util_1.isNullOrUndefined)(noteElem)) {
                // create it
                this.createNoteElementWithCategoryAttribute('meaning', meaning);
            }
            else {
                dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(noteElem, meaning);
            }
        }
        else {
            if (!(0, util_1.isNullOrUndefined)(noteElem)) {
                // remove node
                this.removeNoteElementWithCategoryAttribute('meaning');
            }
        }
    };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     */
    Xliff2TransUnit.prototype.notes = function () {
        var noteElememts = this.findAllAdditionalNoteElements();
        return noteElememts.map(function (elem) {
            return {
                from: elem.getAttribute('category'),
                text: dom_utilities_1.DOMUtilities.getPCDATA(elem)
            };
        });
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    Xliff2TransUnit.prototype.supportsSetNotes = function () {
        return true;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     */
    Xliff2TransUnit.prototype.setNotes = function (newNotes) {
        var _this = this;
        if (!(0, util_1.isNullOrUndefined)(newNotes)) {
            this.checkNotes(newNotes);
        }
        this.removeAllAdditionalNoteElements();
        if (!(0, util_1.isNullOrUndefined)(newNotes)) {
            newNotes.forEach(function (note) {
                _this.createNoteElementWithCategoryAttribute(note.from, note.text);
            });
        }
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    Xliff2TransUnit.prototype.translateNative = function (translation) {
        var target = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            var source = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
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
    Xliff2TransUnit.prototype.cloneWithSourceAsTarget = function (isDefaultLang, copyContent, targetFile) {
        var element = this._element.cloneNode(true);
        var clone = new Xliff2TransUnit(element, this._id, targetFile);
        clone.useSourceAsTarget(isDefaultLang, copyContent);
        return clone;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    Xliff2TransUnit.prototype.useSourceAsTarget = function (isDefaultLang, copyContent) {
        var source = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'source');
        var target = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
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
        var segment = dom_utilities_1.DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segment) {
            if (isDefaultLang) {
                segment.setAttribute('state', this.mapStateToNativeState(constants_1.STATE_FINAL));
            }
            else {
                segment.setAttribute('state', this.mapStateToNativeState(constants_1.STATE_NEW));
            }
        }
    };
    return Xliff2TransUnit;
}(abstract_trans_unit_1.AbstractTransUnit));
exports.Xliff2TransUnit = Xliff2TransUnit;
