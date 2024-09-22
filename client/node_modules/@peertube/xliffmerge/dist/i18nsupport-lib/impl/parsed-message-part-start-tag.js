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
exports.ParsedMessagePartStartTag = void 0;
var parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
var ParsedMessagePartStartTag = /** @class */ (function (_super) {
    __extends(ParsedMessagePartStartTag, _super);
    function ParsedMessagePartStartTag(tagname, idcounter) {
        var _this = _super.call(this, parsed_message_part_1.ParsedMessagePartType.START_TAG) || this;
        _this._tagname = tagname;
        _this._idcounter = idcounter;
        return _this;
    }
    ParsedMessagePartStartTag.prototype.asDisplayString = function (format) {
        if (this._idcounter === 0) {
            return '<' + this._tagname + '>';
        }
        else {
            return '<' + this._tagname + ' id="' + this._idcounter.toString() + '">';
        }
    };
    ParsedMessagePartStartTag.prototype.tagName = function () {
        return this._tagname;
    };
    ParsedMessagePartStartTag.prototype.idCounter = function () {
        return this._idcounter;
    };
    return ParsedMessagePartStartTag;
}(parsed_message_part_1.ParsedMessagePart));
exports.ParsedMessagePartStartTag = ParsedMessagePartStartTag;
