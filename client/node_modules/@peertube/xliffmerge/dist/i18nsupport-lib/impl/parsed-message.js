"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedMessage = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
var parsed_message_part_text_1 = require("./parsed-message-part-text");
var parsed_message_part_placeholder_1 = require("./parsed-message-part-placeholder");
var parsed_message_part_start_tag_1 = require("./parsed-message-part-start-tag");
var parsed_message_part_end_tag_1 = require("./parsed-message-part-end-tag");
var dom_utilities_1 = require("./dom-utilities");
var util_1 = require("util");
var parsed_message_part_icu_message_1 = require("./parsed-message-part-icu-message");
var parsed_message_part_icu_message_ref_1 = require("./parsed-message-part-icu-message-ref");
var parsed_message_part_empty_tag_1 = require("./parsed-message-part-empty-tag");
/**
 * Created by martin on 05.05.2017.
 * A message text read from a translation file.
 * Can contain placeholders, tags, text.
 * This class is a representation independent of the concrete format.
 */
var ParsedMessage = /** @class */ (function () {
    function ParsedMessage(parser, sourceMessage) {
        this._parser = parser;
        this.sourceMessage = sourceMessage;
        this._parts = [];
    }
    /**
     * Get the parser (for tests only, not part of API)
     * @return parser
     */
    ParsedMessage.prototype.getParser = function () {
        return this._parser;
    };
    /**
     * Create a new normalized message as a translation of this one.
     * @param normalizedString the translation in normalized form.
     * If the message is an ICUMessage (getICUMessage returns a value), use translateICUMessage instead.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is an ICU message.
     */
    ParsedMessage.prototype.translate = function (normalizedString) {
        if ((0, util_1.isNullOrUndefined)(this.getICUMessage())) {
            return this._parser.parseNormalizedString(normalizedString, this);
        }
        else {
            throw new Error((0, util_1.format)('cannot translate ICU message with simple string, use translateICUMessage() instead ("%s", "%s")', normalizedString, this.asNativeString()));
        }
    };
    /**
     * Create a new normalized icu message as a translation of this one.
     * @param icuTranslation the translation, this is the translation of the ICU message,
     * which is not a string, but a collections of the translations of the different categories.
     * The message must be an ICUMessage (getICUMessage returns a value)
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is not an ICU message.
     */
    ParsedMessage.prototype.translateICUMessage = function (icuTranslation) {
        var icuMessage = this.getICUMessage();
        if ((0, util_1.isNullOrUndefined)(icuMessage)) {
            throw new Error((0, util_1.format)('this is not an ICU message, use translate() instead ("%s", "%s")', icuTranslation, this.asNativeString()));
        }
        else {
            var translatedICUMessage = icuMessage.translate(icuTranslation);
            return this._parser.parseICUMessage(translatedICUMessage.asNativeString(), this);
        }
    };
    /**
     * Create a new normalized message from a native xml string as a translation of this one.
     * @param nativeString xml string in the format of the underlying file format.
     * Throws an error if native string is not acceptable.
     */
    ParsedMessage.prototype.translateNativeString = function (nativeString) {
        return this._parser.createNormalizedMessageFromXMLString(nativeString, this);
    };
    /**
     * normalized message as string.
     * @param displayFormat optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     */
    ParsedMessage.prototype.asDisplayString = function (displayFormat) {
        return this._parts.map(function (part) { return part.asDisplayString(displayFormat); }).join('');
    };
    /**
     * Returns the message content as format dependent native string.
     * Includes all format specific markup like <ph id="INTERPOLATION" ../> ..
     */
    ParsedMessage.prototype.asNativeString = function () {
        if ((0, util_1.isNullOrUndefined)(this.getICUMessage())) {
            return dom_utilities_1.DOMUtilities.getXMLContent(this._xmlRepresentation);
        }
        else {
            return this.getICUMessage().asNativeString();
        }
    };
    /**
     * Validate the message.
     * @return null, if ok, error object otherwise.
     */
    ParsedMessage.prototype.validate = function () {
        var hasErrors = false;
        var errors = {};
        var e;
        e = this.checkPlaceholderAdded();
        if (!(0, util_1.isNullOrUndefined)(e)) {
            errors.placeholderAdded = e;
            hasErrors = true;
        }
        e = this.checkICUMessageRefRemoved();
        if (!(0, util_1.isNullOrUndefined)(e)) {
            errors.icuMessageRefRemoved = e;
            hasErrors = true;
        }
        e = this.checkICUMessageRefAdded();
        if (!(0, util_1.isNullOrUndefined)(e)) {
            errors.icuMessageRefAdded = e;
            hasErrors = true;
        }
        return hasErrors ? errors : null;
    };
    /**
     * Validate the message, check for warnings only.
     * A warning shows, that the message is acceptable, but misses something.
     * E.g. if you remove a placeholder or a special tag from the original message, this generates a warning.
     * @return null, if no warning, warnings as error object otherwise.
     */
    ParsedMessage.prototype.validateWarnings = function () {
        var hasWarnings = false;
        var warnings = {};
        var w;
        w = this.checkPlaceholderRemoved();
        if (!(0, util_1.isNullOrUndefined)(w)) {
            warnings.placeholderRemoved = w;
            hasWarnings = true;
        }
        w = this.checkTagRemoved();
        if (!(0, util_1.isNullOrUndefined)(w)) {
            warnings.tagRemoved = w;
            hasWarnings = true;
        }
        w = this.checkTagAdded();
        if (!(0, util_1.isNullOrUndefined)(w)) {
            warnings.tagAdded = w;
            hasWarnings = true;
        }
        return hasWarnings ? warnings : null;
    };
    /**
     * Test wether this message is an ICU message.
     * @return true, if it is an ICU message.
     */
    ParsedMessage.prototype.isICUMessage = function () {
        return this._parts.length === 1 && this._parts[0].type === parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE;
    };
    /**
     * Test wether this message contains an ICU message reference.
     * ICU message references are something like <x ID="ICU"../>.
     * @return true, if there is an ICU message reference in the message.
     */
    ParsedMessage.prototype.containsICUMessageRef = function () {
        return this._parts.findIndex(function (part) { return part.type === parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF; }) >= 0;
    };
    /**
     * If this message is an ICU message, returns its structure.
     * Otherwise this method returns null.
     * @return ICUMessage or null.
     */
    ParsedMessage.prototype.getICUMessage = function () {
        if (this._parts.length === 1 && this._parts[0].type === parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE) {
            var icuPart = this._parts[0];
            return icuPart.getICUMessage();
        }
        else {
            return null;
        }
    };
    /**
     * Check for added placeholder.
     * @return null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkPlaceholderAdded = function () {
        var e = null;
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            var sourcePlaceholders_1 = this.sourceMessage.allPlaceholders();
            var myPlaceholders = this.allPlaceholders();
            myPlaceholders.forEach(function (index) {
                if (!sourcePlaceholders_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            });
        }
        if (suspiciousIndexes.length === 1) {
            e = 'added placeholder ' + suspiciousIndexes[0] + ', which is not in original message';
        }
        else if (suspiciousIndexes.length > 1) {
            var allSuspiciousIndexes_1 = '';
            var first_1 = true;
            suspiciousIndexes.forEach(function (index) {
                if (!first_1) {
                    allSuspiciousIndexes_1 = allSuspiciousIndexes_1 + ', ';
                }
                allSuspiciousIndexes_1 = allSuspiciousIndexes_1 + index;
                first_1 = false;
            });
            e = 'added placeholders ' + allSuspiciousIndexes_1 + ', which are not in original message';
        }
        return e;
    };
    /**
     * Check for removed placeholder.
     * @return null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkPlaceholderRemoved = function () {
        var w = null;
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            var sourcePlaceholders = this.sourceMessage.allPlaceholders();
            var myPlaceholders_1 = this.allPlaceholders();
            sourcePlaceholders.forEach(function (index) {
                if (!myPlaceholders_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            });
        }
        if (suspiciousIndexes.length === 1) {
            w = 'removed placeholder ' + suspiciousIndexes[0] + ' from original message';
        }
        else if (suspiciousIndexes.length > 1) {
            var allSuspiciousIndexes_2 = '';
            var first_2 = true;
            suspiciousIndexes.forEach(function (index) {
                if (!first_2) {
                    allSuspiciousIndexes_2 = allSuspiciousIndexes_2 + ', ';
                }
                allSuspiciousIndexes_2 = allSuspiciousIndexes_2 + index;
                first_2 = false;
            });
            w = 'removed placeholders ' + allSuspiciousIndexes_2 + ' from original message';
        }
        return w;
    };
    /**
     * Check for added ICU Message Refs.
     * @return null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkICUMessageRefAdded = function () {
        var e = null;
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            var sourceICURefs_1 = this.sourceMessage.allICUMessageRefs();
            var myICURefs = this.allICUMessageRefs();
            myICURefs.forEach(function (index) {
                if (!sourceICURefs_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            });
        }
        if (suspiciousIndexes.length === 1) {
            e = 'added ICU message reference ' + suspiciousIndexes[0] + ', which is not in original message';
        }
        else if (suspiciousIndexes.length > 1) {
            var allSuspiciousIndexes_3 = '';
            var first_3 = true;
            suspiciousIndexes.forEach(function (index) {
                if (!first_3) {
                    allSuspiciousIndexes_3 = allSuspiciousIndexes_3 + ', ';
                }
                allSuspiciousIndexes_3 = allSuspiciousIndexes_3 + index;
                first_3 = false;
            });
            e = 'added ICU message references ' + allSuspiciousIndexes_3 + ', which are not in original message';
        }
        return e;
    };
    /**
     * Check for removed ICU Message Refs.
     * @return null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkICUMessageRefRemoved = function () {
        var e = null;
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            var sourceICURefs = this.sourceMessage.allICUMessageRefs();
            var myICURefs_1 = this.allICUMessageRefs();
            sourceICURefs.forEach(function (index) {
                if (!myICURefs_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            });
        }
        if (suspiciousIndexes.length === 1) {
            e = 'removed ICU message reference ' + suspiciousIndexes[0] + ' from original message';
        }
        else if (suspiciousIndexes.length > 1) {
            var allSuspiciousIndexes_4 = '';
            var first_4 = true;
            suspiciousIndexes.forEach(function (index) {
                if (!first_4) {
                    allSuspiciousIndexes_4 = allSuspiciousIndexes_4 + ', ';
                }
                allSuspiciousIndexes_4 = allSuspiciousIndexes_4 + index;
                first_4 = false;
            });
            e = 'removed ICU message references ' + allSuspiciousIndexes_4 + ' from original message';
        }
        return e;
    };
    /**
     * Get all indexes of placeholders used in the message.
     */
    ParsedMessage.prototype.allPlaceholders = function () {
        var result = new Set();
        this.parts().forEach(function (part) {
            if (part.type === parsed_message_part_1.ParsedMessagePartType.PLACEHOLDER) {
                var index = part.index();
                result.add(index);
            }
        });
        return result;
    };
    /**
     * Return the disp-Attribute of placeholder
     * @param index index of placeholder
     * @return disp or null
     */
    ParsedMessage.prototype.getPlaceholderDisp = function (index) {
        var placeHolder = null;
        this.parts().forEach(function (part) {
            if (part.type === parsed_message_part_1.ParsedMessagePartType.PLACEHOLDER) {
                var phPart = part;
                if (phPart.index() === index) {
                    placeHolder = phPart;
                }
            }
        });
        return placeHolder ? placeHolder.disp() : null;
    };
    /**
     * Get all indexes of ICU message refs used in the message.
     */
    ParsedMessage.prototype.allICUMessageRefs = function () {
        var result = new Set();
        this.parts().forEach(function (part) {
            if (part.type === parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF) {
                var index = part.index();
                result.add(index);
            }
        });
        return result;
    };
    /**
     * Return the disp-Attribute of icu message ref
     * @param index of ref
     * @return disp or null
     */
    ParsedMessage.prototype.getICUMessageRefDisp = function (index) {
        var icuMessageRefPart = null;
        this.parts().forEach(function (part) {
            if (part.type === parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF) {
                var refPart = part;
                if (refPart.index() === index) {
                    icuMessageRefPart = refPart;
                }
            }
        });
        return icuMessageRefPart ? icuMessageRefPart.disp() : null;
    };
    /**
     * Check for added tags.
     * @return null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkTagAdded = function () {
        var e = null;
        var suspiciousTags = [];
        if (this.sourceMessage) {
            var sourceTags_1 = this.sourceMessage.allTags();
            var myTags = this.allTags();
            myTags.forEach(function (tagName) {
                if (!sourceTags_1.has(tagName)) {
                    suspiciousTags.push(tagName);
                }
            });
        }
        if (suspiciousTags.length === 1) {
            e = 'added tag <' + suspiciousTags[0] + '>, which is not in original message';
        }
        else if (suspiciousTags.length > 1) {
            var allSuspiciousTags_1 = '';
            var first_5 = true;
            suspiciousTags.forEach(function (tag) {
                if (!first_5) {
                    allSuspiciousTags_1 = allSuspiciousTags_1 + ', ';
                }
                allSuspiciousTags_1 = allSuspiciousTags_1 + '<' + tag + '>';
                first_5 = false;
            });
            e = 'added tags ' + allSuspiciousTags_1 + ', which are not in original message';
        }
        return e;
    };
    /**
     * Check for removed tags.
     * @return null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkTagRemoved = function () {
        var w = null;
        var suspiciousTags = [];
        if (this.sourceMessage) {
            var sourceTags = this.sourceMessage.allTags();
            var myTags_1 = this.allTags();
            sourceTags.forEach(function (tagName) {
                if (!myTags_1.has(tagName)) {
                    suspiciousTags.push(tagName);
                }
            });
        }
        if (suspiciousTags.length === 1) {
            w = 'removed tag <' + suspiciousTags[0] + '> from original message';
        }
        else if (suspiciousTags.length > 1) {
            var allSuspiciousTags_2 = '';
            var first_6 = true;
            suspiciousTags.forEach(function (tag) {
                if (!first_6) {
                    allSuspiciousTags_2 = allSuspiciousTags_2 + ', ';
                }
                allSuspiciousTags_2 = allSuspiciousTags_2 + '<' + tag + '>';
                first_6 = false;
            });
            w = 'removed tags ' + allSuspiciousTags_2 + ' from original message';
        }
        return w;
    };
    /**
     * Get all tag names used in the message.
     */
    ParsedMessage.prototype.allTags = function () {
        var result = new Set();
        this.parts().forEach(function (part) {
            if (part.type === parsed_message_part_1.ParsedMessagePartType.START_TAG || part.type === parsed_message_part_1.ParsedMessagePartType.EMPTY_TAG) {
                var tagName = part.tagName();
                result.add(tagName);
            }
        });
        return result;
    };
    ParsedMessage.prototype.parts = function () {
        return this._parts;
    };
    ParsedMessage.prototype.setXmlRepresentation = function (xmlRepresentation) {
        this._xmlRepresentation = xmlRepresentation;
    };
    ParsedMessage.prototype.addText = function (text) {
        this._parts.push(new parsed_message_part_text_1.ParsedMessagePartText(text));
    };
    ParsedMessage.prototype.addPlaceholder = function (index, disp) {
        this._parts.push(new parsed_message_part_placeholder_1.ParsedMessagePartPlaceholder(index, disp));
    };
    ParsedMessage.prototype.addStartTag = function (tagname, idcounter) {
        this._parts.push(new parsed_message_part_start_tag_1.ParsedMessagePartStartTag(tagname, idcounter));
    };
    ParsedMessage.prototype.addEndTag = function (tagname) {
        // check if well formed
        var openTag = this.calculateOpenTagName();
        if (!openTag || openTag !== tagname) {
            // oops, not well formed
            throw new Error((0, util_1.format)('unexpected close tag %s (currently open is %s, native xml is "%s")', tagname, openTag, this.asNativeString()));
        }
        this._parts.push(new parsed_message_part_end_tag_1.ParsedMessagePartEndTag(tagname));
    };
    ParsedMessage.prototype.addEmptyTag = function (tagname, idcounter) {
        this._parts.push(new parsed_message_part_empty_tag_1.ParsedMessagePartEmptyTag(tagname, idcounter));
    };
    ParsedMessage.prototype.addICUMessageRef = function (index, disp) {
        this._parts.push(new parsed_message_part_icu_message_ref_1.ParsedMessagePartICUMessageRef(index, disp));
    };
    ParsedMessage.prototype.addICUMessage = function (text) {
        this._parts.push(new parsed_message_part_icu_message_1.ParsedMessagePartICUMessage(text, this._parser));
    };
    /**
     * Determine, wether there is an open tag, that is not closed.
     * Returns the latest one or null, if there is no open tag.
     */
    ParsedMessage.prototype.calculateOpenTagName = function () {
        var _this = this;
        var openTags = [];
        this._parts.forEach(function (part) {
            switch (part.type) {
                case parsed_message_part_1.ParsedMessagePartType.START_TAG:
                    openTags.push(part.tagName());
                    break;
                case parsed_message_part_1.ParsedMessagePartType.END_TAG:
                    var tagName = part.tagName();
                    if (openTags.length === 0 || openTags[openTags.length - 1] !== tagName) {
                        // oops, not well formed
                        var openTag = (openTags.length === 0) ? 'nothing' : openTags[openTags.length - 1];
                        throw new Error((0, util_1.format)('unexpected close tag %s (currently open is %s, native xml is "%s")', tagName, openTag, _this.asNativeString()));
                    }
                    openTags.pop();
            }
        });
        return openTags.length === 0 ? null : openTags[openTags.length - 1];
    };
    return ParsedMessage;
}());
exports.ParsedMessage = ParsedMessage;
