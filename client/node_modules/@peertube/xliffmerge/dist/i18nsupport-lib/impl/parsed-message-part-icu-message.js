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
exports.ParsedMessagePartICUMessage = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
var icu_message_tokenizer_1 = require("./icu-message-tokenizer");
var icu_message_1 = require("./icu-message");
var util_1 = require("util");
/**
 * Created by martin on 02.06.2017.
 * A message part consisting of an icu message.
 * There can only be one icu message in a parsed message.
 * Syntax of ICU message is '{' <keyname> ',' 'select'|'plural' ',' (<category> '{' text '}')+ '}'
 */
var ParsedMessagePartICUMessage = /** @class */ (function (_super) {
    __extends(ParsedMessagePartICUMessage, _super);
    function ParsedMessagePartICUMessage(icuMessageText, _parser) {
        var _this = _super.call(this, parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE) || this;
        _this._parser = _parser;
        if (icuMessageText) {
            _this.parseICUMessage(icuMessageText);
        }
        return _this;
    }
    /**
     * Test wether text might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param icuMessageText icuMessageText
     * @return wether text might be an ICU message.
     */
    ParsedMessagePartICUMessage.looksLikeICUMessage = function (icuMessageText) {
        var part = new ParsedMessagePartICUMessage(null, null);
        return part.looksLikeICUMessage(icuMessageText);
    };
    ParsedMessagePartICUMessage.prototype.asDisplayString = function (displayFormat) {
        return '<ICU-Message/>';
    };
    /**
     * return the parsed message.
     * @return parsed message
     */
    ParsedMessagePartICUMessage.prototype.getICUMessage = function () {
        return this._message;
    };
    /**
     * Parse the message.
     * @param text message text to parse
     * @throws an error if the syntax is not ok in any way.
     */
    ParsedMessagePartICUMessage.prototype.parseICUMessage = function (text) {
        // console.log('message ', text);
        // const tokens = new ICUMessageTokenizer().tokenize(text);
        // tokens.forEach((tok) => {
        //     console.log('Token', tok.type, tok.value);
        // });
        this._messageText = text;
        this._tokenizer = new icu_message_tokenizer_1.ICUMessageTokenizer();
        this._tokenizer.input(text);
        this.expectNext(icu_message_tokenizer_1.CURLY_BRACE_OPEN);
        this.expectNext(icu_message_tokenizer_1.TEXT); // varname, not used currently, ng always used VAR_PLURAL or VAR_SELECT
        this.expectNext(icu_message_tokenizer_1.COMMA);
        var token = this._tokenizer.next();
        if (token.type === icu_message_tokenizer_1.PLURAL) {
            this._message = new icu_message_1.ICUMessage(this._parser, true);
        }
        else if (token.type === icu_message_tokenizer_1.SELECT) {
            this._message = new icu_message_1.ICUMessage(this._parser, false);
        }
        this.expectNext(icu_message_tokenizer_1.COMMA);
        token = this._tokenizer.peek();
        while (token.type !== icu_message_tokenizer_1.CURLY_BRACE_CLOSE) {
            var category = this.expectNext(icu_message_tokenizer_1.TEXT).value.trim();
            this.expectNext(icu_message_tokenizer_1.CURLY_BRACE_OPEN);
            var message = this.expectNext(icu_message_tokenizer_1.TEXT).value;
            this._message.addCategory(category, this.parseNativeSubMessage(message));
            this.expectNext(icu_message_tokenizer_1.CURLY_BRACE_CLOSE);
            token = this._tokenizer.peek();
        }
        this.expectNext(icu_message_tokenizer_1.CURLY_BRACE_CLOSE);
        this.expectNext('EOF');
    };
    /**
     * Parse the message to check, wether it might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param text message text to parse
     */
    ParsedMessagePartICUMessage.prototype.looksLikeICUMessage = function (text) {
        // console.log('message ', text);
        // const tokens = new ICUMessageTokenizer().tokenize(text);
        // tokens.forEach((tok) => {
        //     console.log('Token', tok.type, tok.value);
        // });
        this._tokenizer = new icu_message_tokenizer_1.ICUMessageTokenizer();
        this._tokenizer.input(text);
        try {
            this.expectNext(icu_message_tokenizer_1.CURLY_BRACE_OPEN);
            this.expectNext(icu_message_tokenizer_1.TEXT); // varname, not used currently, ng always used VAR_PLURAL or VAR_SELECT
            this.expectNext(icu_message_tokenizer_1.COMMA);
            var token = this._tokenizer.next();
            if (token.type !== icu_message_tokenizer_1.PLURAL && token.type !== icu_message_tokenizer_1.SELECT) {
                return false;
            }
            this.expectNext(icu_message_tokenizer_1.COMMA);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    /**
     * Read next token and expect, that it is of the given type.
     * @param tokentype expected type.
     * @return Token
     * @throws error, if next token has wrong type.
     */
    ParsedMessagePartICUMessage.prototype.expectNext = function (tokentype) {
        var token = this._tokenizer.next();
        if (token.type !== tokentype) {
            throw new Error((0, util_1.format)('Error parsing ICU Message: expected %s, found %s (%s) (message %s)', tokentype, token.type, token.value, this._messageText));
        }
        return token;
    };
    /**
     * Parse XML text to normalized message.
     * @param message message in format dependent xml syntax.
     * @return normalized message
     */
    ParsedMessagePartICUMessage.prototype.parseNativeSubMessage = function (message) {
        return this._parser.createNormalizedMessageFromXMLString(message, null);
    };
    return ParsedMessagePartICUMessage;
}(parsed_message_part_1.ParsedMessagePart));
exports.ParsedMessagePartICUMessage = ParsedMessagePartICUMessage;
