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
exports.ParsedMessagePartICUMessageRef = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
var ParsedMessagePartICUMessageRef = /** @class */ (function (_super) {
    __extends(ParsedMessagePartICUMessageRef, _super);
    function ParsedMessagePartICUMessageRef(index, disp) {
        var _this = _super.call(this, parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF) || this;
        _this._index = index;
        _this._disp = disp;
        return _this;
    }
    ParsedMessagePartICUMessageRef.prototype.asDisplayString = function (format) {
        return '<ICU-Message-Ref_' + this._index + '/>';
    };
    ParsedMessagePartICUMessageRef.prototype.index = function () {
        return this._index;
    };
    ParsedMessagePartICUMessageRef.prototype.disp = function () {
        return this._disp;
    };
    return ParsedMessagePartICUMessageRef;
}(parsed_message_part_1.ParsedMessagePart));
exports.ParsedMessagePartICUMessageRef = ParsedMessagePartICUMessageRef;
