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
exports.ParsedMessagePartText = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of just simple text.
 */
var ParsedMessagePartText = /** @class */ (function (_super) {
    __extends(ParsedMessagePartText, _super);
    function ParsedMessagePartText(text) {
        var _this = _super.call(this, parsed_message_part_1.ParsedMessagePartType.TEXT) || this;
        _this.text = text;
        return _this;
    }
    ParsedMessagePartText.prototype.asDisplayString = function (format) {
        return this.text;
    };
    return ParsedMessagePartText;
}(parsed_message_part_1.ParsedMessagePart));
exports.ParsedMessagePartText = ParsedMessagePartText;
