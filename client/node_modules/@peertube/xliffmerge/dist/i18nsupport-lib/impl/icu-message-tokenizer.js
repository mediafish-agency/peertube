"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ICUMessageTokenizer = exports.SELECT = exports.PLURAL = exports.COMMA = exports.CURLY_BRACE_CLOSE = exports.CURLY_BRACE_OPEN = exports.TEXT = void 0;
var tokenizr_1 = __importDefault(require("tokenizr"));
/**
 * Created by martin on 04.06.2017.
 * A tokenizer for ICU messages.
 */
// Tokens
exports.TEXT = 'TEXT';
exports.CURLY_BRACE_OPEN = 'CURLY_BRACE_OPEN';
exports.CURLY_BRACE_CLOSE = 'CURLY_BRACE_CLOSE';
exports.COMMA = 'COMMA';
exports.PLURAL = 'PLURAL';
exports.SELECT = 'SELECT';
// states: default normal in_message
var STATE_DEFAULT = 'default';
var STATE_NORMAL = 'normal';
var STATE_IN_MESSAGE = 'in_message';
var ICUMessageTokenizer = /** @class */ (function () {
    function ICUMessageTokenizer() {
    }
    ICUMessageTokenizer.prototype.getLexer = function () {
        var _this = this;
        var lexer = new tokenizr_1.default();
        var plaintext = '';
        var openedCurlyBracesInTextCounter = 0;
        lexer.before(function (ctx, match, rule) {
            if (rule.name !== exports.TEXT) {
                if (_this.containsNonWhiteSpace(plaintext)) {
                    ctx.accept(exports.TEXT, plaintext);
                    plaintext = '';
                }
                else {
                    ctx.ignore();
                }
            }
        });
        lexer.finish(function (ctx) {
            if (_this.containsNonWhiteSpace(plaintext)) {
                ctx.accept(exports.TEXT, plaintext);
            }
        });
        // curly brace
        lexer.rule(STATE_DEFAULT, /{/, function (ctx, match) {
            ctx.accept(exports.CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_NORMAL);
        }, exports.CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /{/, function (ctx, match) {
            ctx.accept(exports.CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_IN_MESSAGE);
        }, exports.CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /}/, function (ctx, match) {
            ctx.pop();
            ctx.accept(exports.CURLY_BRACE_CLOSE, match[0]);
        }, exports.CURLY_BRACE_CLOSE);
        // masked ' { and }
        lexer.rule(STATE_IN_MESSAGE, /'[{}]?'/, function (ctx, match) {
            if (match[0] === '\'\'') {
                plaintext += '\'';
            }
            else if (match[0] === '\'{\'') {
                plaintext += '{';
            }
            else if (match[0] === '\'}\'') {
                plaintext += '}';
            }
            ctx.ignore();
        }, exports.TEXT);
        lexer.rule(STATE_IN_MESSAGE, /./, function (ctx, match) {
            var char = match[0];
            if (char === '{') {
                openedCurlyBracesInTextCounter++;
                plaintext += match[0];
                ctx.ignore();
            }
            else if (char === '}') {
                if (openedCurlyBracesInTextCounter > 0) {
                    openedCurlyBracesInTextCounter--;
                    plaintext += match[0];
                    ctx.ignore();
                }
                else {
                    ctx.pop();
                    ctx.accept(exports.TEXT, plaintext);
                    plaintext = '';
                    ctx.accept(exports.CURLY_BRACE_CLOSE, match[0]);
                }
            }
            else {
                plaintext += match[0];
                ctx.ignore();
            }
        }, exports.TEXT);
        // comma
        lexer.rule(STATE_NORMAL, /,/, function (ctx, match) {
            ctx.accept(exports.COMMA, match[0]);
        }, exports.COMMA);
        // keywords plural and select
        lexer.rule(STATE_NORMAL, /plural/, function (ctx, match) {
            ctx.accept(exports.PLURAL, match[0]);
        }, exports.PLURAL);
        lexer.rule(STATE_NORMAL, /select/, function (ctx, match) {
            ctx.accept(exports.SELECT, match[0]);
        }, exports.SELECT);
        // text
        lexer.rule(/./, function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }, exports.TEXT);
        lexer.rule(/[\s]+/, function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }, exports.TEXT);
        return lexer;
    };
    ICUMessageTokenizer.prototype.containsNonWhiteSpace = function (text) {
        for (var i = 0; i < text.length; i++) {
            if (!/\s/.test(text.charAt(i))) {
                return true;
            }
        }
        return false;
    };
    ICUMessageTokenizer.prototype.tokenize = function (normalizedMessage) {
        var lexer = this.getLexer();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    };
    ICUMessageTokenizer.prototype.input = function (normalizedMessage) {
        this.lexer = this.getLexer();
        this.lexer.input(normalizedMessage);
    };
    ICUMessageTokenizer.prototype.next = function () {
        return this.lexer.token();
    };
    ICUMessageTokenizer.prototype.peek = function () {
        return this.lexer.peek();
    };
    return ICUMessageTokenizer;
}());
exports.ICUMessageTokenizer = ICUMessageTokenizer;
