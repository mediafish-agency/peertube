"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICUMessage = void 0;
var util_1 = require("util");
var MessageCategory = /** @class */ (function () {
    function MessageCategory(_category, _message) {
        this._category = _category;
        this._message = _message;
    }
    MessageCategory.prototype.getCategory = function () {
        return this._category;
    };
    MessageCategory.prototype.getMessageNormalized = function () {
        return this._message;
    };
    return MessageCategory;
}());
/**
 * Implementation of an ICU Message.
 * Created by martin on 05.06.2017.
 */
var ICUMessage = /** @class */ (function () {
    function ICUMessage(_parser, isPluralMessage) {
        this._parser = _parser;
        this._isPluralMessage = isPluralMessage;
        this._categories = [];
    }
    ICUMessage.prototype.addCategory = function (category, message) {
        this._categories.push(new MessageCategory(category, message));
    };
    /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return ICU message as native string.
     */
    ICUMessage.prototype.asNativeString = function () {
        var varname = (this.isPluralMessage()) ? 'VAR_PLURAL' : 'VAR_SELECT';
        var type = (this.isPluralMessage()) ? 'plural' : 'select';
        var choiceString = '';
        this._categories.forEach(function (category) {
            choiceString = choiceString + (0, util_1.format)(' %s {%s}', category.getCategory(), category.getMessageNormalized().asNativeString());
        });
        return (0, util_1.format)('{%s, %s,%s}', varname, type, choiceString);
    };
    /**
     * Is it a plural message?
     */
    ICUMessage.prototype.isPluralMessage = function () {
        return this._isPluralMessage;
    };
    /**
     * Is it a select message?
     */
    ICUMessage.prototype.isSelectMessage = function () {
        return !this._isPluralMessage;
    };
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     */
    ICUMessage.prototype.getCategories = function () {
        return this._categories;
    };
    /**
     * Translate message and return a new, translated message
     * @param translation the translation (hashmap of categories and translations).
     * @return new message wit translated content.
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     */
    ICUMessage.prototype.translate = function (translation) {
        var _this = this;
        var message = new ICUMessage(this._parser, this.isPluralMessage());
        var translatedCategories = new Set();
        this._categories.forEach(function (category) {
            var translatedMessage;
            var translationForCategory = translation[category.getCategory()];
            if ((0, util_1.isNullOrUndefined)(translationForCategory)) {
                translatedMessage = category.getMessageNormalized();
            }
            else if ((0, util_1.isString)(translationForCategory)) {
                translatedCategories.add(category.getCategory());
                translatedMessage = _this._parser.parseNormalizedString(translationForCategory, null);
            }
            else {
                // TODO embedded ICU Message
                translatedMessage = null;
            }
            message.addCategory(category.getCategory(), translatedMessage);
        });
        // new categories, which are not part of the original message
        Object.keys(translation).forEach(function (categoryName) {
            if (!translatedCategories.has(categoryName)) {
                if (_this.isSelectMessage()) {
                    throw new Error((0, util_1.format)('adding a new category not allowed for select messages ("%s" is not part of message)', categoryName));
                }
                else {
                    _this.checkValidPluralCategory(categoryName);
                    // TODO embedded ICU Message
                    var translatedMessage = _this._parser.parseNormalizedString(translation[categoryName], null);
                    message.addCategory(categoryName, translatedMessage);
                }
            }
        });
        return message;
    };
    /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @param categoryName category
     * @throws an error, if it is not a valid category name
     */
    ICUMessage.prototype.checkValidPluralCategory = function (categoryName) {
        var allowedKeywords = ['zero', 'one', 'two', 'few', 'many', 'other'];
        if (categoryName.match(/=\d+/)) {
            return;
        }
        if (allowedKeywords.find(function (key) { return key === categoryName; })) {
            return;
        }
        throw new Error((0, util_1.format)('invalid plural category "%s", allowed are =<n> and %s', categoryName, allowedKeywords));
    };
    return ICUMessage;
}());
exports.ICUMessage = ICUMessage;
