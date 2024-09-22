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
exports.XtbTransUnit = void 0;
var util_1 = require("util");
var dom_utilities_1 = require("./dom-utilities");
var abstract_trans_unit_1 = require("./abstract-trans-unit");
var xmb_message_parser_1 = require("./xmb-message-parser");
/**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
var XtbTransUnit = /** @class */ (function (_super) {
    __extends(XtbTransUnit, _super);
    function XtbTransUnit(_element, _id, _translationMessagesFile, _sourceTransUnitFromMaster) {
        var _this = _super.call(this, _element, _id, _translationMessagesFile) || this;
        _this._sourceTransUnitFromMaster = _sourceTransUnitFromMaster;
        return _this;
    }
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return content to translate.
     */
    XtbTransUnit.prototype.sourceContent = function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceContent();
        }
        else {
            return null;
        }
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    XtbTransUnit.prototype.supportsSetSourceContent = function () {
        return false;
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    XtbTransUnit.prototype.setSourceContent = function (newContent) {
        // xtb has no source content, they are part of the master
    };
    /**
     * Return a parser used for normalized messages.
     */
    XtbTransUnit.prototype.messageParser = function () {
        return new xmb_message_parser_1.XmbMessageParser(); // no typo!, Same as for Xmb
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    XtbTransUnit.prototype.createSourceContentNormalized = function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.createSourceContentNormalized();
        }
        else {
            return null;
        }
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    XtbTransUnit.prototype.targetContent = function () {
        return dom_utilities_1.DOMUtilities.getXMLContent(this._element);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    XtbTransUnit.prototype.targetContentNormalized = function () {
        return this.messageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    };
    /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     */
    XtbTransUnit.prototype.nativeTargetState = function () {
        if (this._sourceTransUnitFromMaster) {
            var sourceContent = this._sourceTransUnitFromMaster.sourceContent();
            if (!sourceContent || sourceContent === this.targetContent() || !this.targetContent()) {
                return 'new';
            }
            else {
                return 'final';
            }
        }
        return null; // not supported in xmb
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    XtbTransUnit.prototype.mapStateToNativeState = function (state) {
        return state;
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    XtbTransUnit.prototype.mapNativeStateToState = function (nativeState) {
        return nativeState;
    };
    /**
     * set state in xml.
     * (not supported in xmb)
     * @param nativeState nativeState
     */
    XtbTransUnit.prototype.setNativeTargetState = function (nativeState) {
        // TODO some logic to store it anywhere
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    XtbTransUnit.prototype.sourceReferences = function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceReferences();
        }
        else {
            return [];
        }
    };
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     */
    XtbTransUnit.prototype.supportsSetSourceReferences = function () {
        return false;
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    XtbTransUnit.prototype.setSourceReferences = function (sourceRefs) {
        // xtb has no source refs, they are part of the master
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     */
    XtbTransUnit.prototype.description = function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.description();
        }
        else {
            return null;
        }
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     */
    XtbTransUnit.prototype.meaning = function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.meaning();
        }
        else {
            return null;
        }
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    XtbTransUnit.prototype.supportsSetDescriptionAndMeaning = function () {
        return false;
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    XtbTransUnit.prototype.setDescription = function (description) {
        // not supported, do nothing
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    XtbTransUnit.prototype.setMeaning = function (meaning) {
        // not supported, do nothing
    };
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     */
    XtbTransUnit.prototype.notes = function () {
        return [];
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    XtbTransUnit.prototype.supportsSetNotes = function () {
        return false;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * NOT Supported in xmb/xtb
     */
    XtbTransUnit.prototype.setNotes = function (newNotes) {
        // not supported, do nothing
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xtb there is nothing to do, because there is only a target, no source.
     */
    XtbTransUnit.prototype.cloneWithSourceAsTarget = function (isDefaultLang, copyContent, targetFile) {
        return this;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    XtbTransUnit.prototype.useSourceAsTarget = function (isDefaultLang, copyContent) {
        // do nothing
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    XtbTransUnit.prototype.translateNative = function (translation) {
        var target = this._element;
        if ((0, util_1.isNullOrUndefined)(translation)) {
            translation = '';
        }
        dom_utilities_1.DOMUtilities.replaceContentWithXMLContent(target, translation);
    };
    return XtbTransUnit;
}(abstract_trans_unit_1.AbstractTransUnit));
exports.XtbTransUnit = XtbTransUnit;
