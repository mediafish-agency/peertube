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
exports.ParsedMessagePartEndTag = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
var ParsedMessagePartEndTag = /** @class */ (function (_super) {
    __extends(ParsedMessagePartEndTag, _super);
    function ParsedMessagePartEndTag(tagname) {
        var _this = _super.call(this, parsed_message_part_1.ParsedMessagePartType.END_TAG) || this;
        _this._tagname = tagname;
        return _this;
    }
    ParsedMessagePartEndTag.prototype.asDisplayString = function (format) {
        return '</' + this._tagname + '>';
    };
    ParsedMessagePartEndTag.prototype.tagName = function () {
        return this._tagname;
    };
    return ParsedMessagePartEndTag;
}(parsed_message_part_1.ParsedMessagePart));
exports.ParsedMessagePartEndTag = ParsedMessagePartEndTag;
