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
exports.ParsedMessagePartPlaceholder = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
var constants_1 = require("../api/constants");
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a placeholder.
 * Placeholders are numbered from 0 to n.
 */
var ParsedMessagePartPlaceholder = /** @class */ (function (_super) {
    __extends(ParsedMessagePartPlaceholder, _super);
    function ParsedMessagePartPlaceholder(index, disp) {
        var _this = _super.call(this, parsed_message_part_1.ParsedMessagePartType.PLACEHOLDER) || this;
        _this._index = index;
        _this._disp = disp;
        return _this;
    }
    ParsedMessagePartPlaceholder.prototype.asDisplayString = function (format) {
        if (format === constants_1.NORMALIZATION_FORMAT_NGXTRANSLATE) {
            return '{{' + this._index + '}}';
        }
        return '{{' + this._index + '}}';
    };
    ParsedMessagePartPlaceholder.prototype.index = function () {
        return this._index;
    };
    ParsedMessagePartPlaceholder.prototype.disp = function () {
        return this._disp;
    };
    return ParsedMessagePartPlaceholder;
}(parsed_message_part_1.ParsedMessagePart));
exports.ParsedMessagePartPlaceholder = ParsedMessagePartPlaceholder;
