"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransUnit = void 0;
var internalapi_1 = require("./internalapi");
var abstract_translation_messages_file_1 = require("./abstract-translation-messages-file");
var util_1 = require("util");
/**
 * Created by roobm on 10.05.2017.
 * Abstract superclass for all implementations of ITransUnit.
 */
var AbstractTransUnit = /** @class */ (function () {
    function AbstractTransUnit(_element, _id, _translationMessagesFile) {
        this._element = _element;
        this._id = _id;
        this._translationMessagesFile = _translationMessagesFile;
    }
    Object.defineProperty(AbstractTransUnit.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * The file the unit belongs to.,
     */
    AbstractTransUnit.prototype.translationMessagesFile = function () {
        return this._translationMessagesFile;
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    AbstractTransUnit.prototype.supportsSetSourceContent = function () {
        return true;
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    AbstractTransUnit.prototype.sourceContentNormalized = function () {
        if ((0, util_1.isNullOrUndefined)(this._sourceContentNormalized)) {
            this._sourceContentNormalized = this.createSourceContentNormalized();
        }
        return this._sourceContentNormalized;
    };
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     */
    AbstractTransUnit.prototype.targetState = function () {
        var nativeState = this.nativeTargetState();
        return this.mapNativeStateToState(nativeState);
    };
    /**
     * Modify the target state.
     * @param newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     */
    AbstractTransUnit.prototype.setTargetState = function (newState) {
        this.setNativeTargetState(this.mapStateToNativeState(newState));
        if (this.translationMessagesFile() instanceof abstract_translation_messages_file_1.AbstractTranslationMessagesFile) {
            this.translationMessagesFile().countNumbers();
        }
    };
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     */
    AbstractTransUnit.prototype.supportsSetSourceReferences = function () {
        return true;
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    AbstractTransUnit.prototype.supportsSetDescriptionAndMeaning = function () {
        return true;
    };
    /**
     * Check notes
     * @param newNotes the notes to add.
     * @throws an Error if any note contains description or meaning as from attribute.
     */
    AbstractTransUnit.prototype.checkNotes = function (newNotes) {
        // check from values
        var errorInFromNote = newNotes.find(function (note) { return note.from === 'description' || note.from === 'meaning'; });
        if (!(0, util_1.isNullOrUndefined)(errorInFromNote)) {
            throw new Error('description or meaning are not allowed as from atttribute');
        }
    };
    /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return real xml element used for the trans unit.
     */
    AbstractTransUnit.prototype.asXmlElement = function () {
        return this._element;
    };
    /**
     * Translate the trans unit.
     * @param translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     */
    AbstractTransUnit.prototype.translate = function (translation) {
        var translationNative;
        if ((0, util_1.isString)(translation)) {
            translationNative = translation;
        }
        else {
            translationNative = translation.asNativeString();
        }
        this.translateNative(translationNative);
        this.setTargetState(internalapi_1.STATE_TRANSLATED);
    };
    /**
     * Test, wether message looks like ICU message.
     * @param message message
     * @return wether message looks like ICU message.
     */
    AbstractTransUnit.prototype.isICUMessage = function (message) {
        return this.messageParser().isICUMessageStart(message);
    };
    return AbstractTransUnit;
}());
exports.AbstractTransUnit = AbstractTransUnit;
