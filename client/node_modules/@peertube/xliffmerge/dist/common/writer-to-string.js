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
exports.WriterToString = void 0;
var stream_1 = require("stream");
var util_1 = require("./util");
/**
 * Created by martin on 20.02.2017.
 * A helper class for testing.
 * Can be used as a WritableStream and writes everything (synchronously) into a string,
 * that can easily be read by the tests.
 */
var WriterToString = /** @class */ (function (_super) {
    __extends(WriterToString, _super);
    function WriterToString() {
        var _this = _super.call(this) || this;
        _this.resultString = '';
        return _this;
    }
    WriterToString.prototype._write = function (chunk, encoding, callback) {
        var chunkString;
        if ((0, util_1.isString)(chunk)) {
            chunkString = chunk;
        }
        else if (chunk instanceof Buffer) {
            chunkString = chunk.toString();
        }
        else {
            chunkString = Buffer.alloc(chunk).toString(encoding);
        }
        this.resultString = this.resultString + chunkString;
        callback();
    };
    /**
     * Returns a string of everything, that was written to the stream so far.
     * @return written data
     */
    WriterToString.prototype.writtenData = function () {
        return this.resultString;
    };
    return WriterToString;
}(stream_1.Writable));
exports.WriterToString = WriterToString;
