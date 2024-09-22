"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgxTranslateExtractionPattern = void 0;
/**
 * Helper class to parse ngx translate extraction pattern
 * and to decide wether a given message matches the pattern.
 */
var NgxTranslateExtractionPattern = /** @class */ (function () {
    /**
     * Construct the pattern from given description string
     * @param extractionPatternString extractionPatternString
     * @throws an error, if there is a syntax error
     */
    function NgxTranslateExtractionPattern(extractionPatternString) {
        this.extractionPatternString = extractionPatternString;
        var parts = extractionPatternString.split('|');
        this._matchExplicitId = false;
        this._descriptionPatterns = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part === '@@') {
                if (this._matchExplicitId) {
                    throw new Error('extraction pattern must not contain @@ twice');
                }
                this._matchExplicitId = true;
            }
            else {
                var errorString = this.checkValidDescriptionPattern(part);
                if (errorString) {
                    throw new Error(errorString);
                }
                this._descriptionPatterns.push(part);
            }
        }
    }
    /**
     * Check, wether an explicitly set id matches the pattern.
     * @param id id
     * @return wether an explicitly set id matches the pattern.
     */
    NgxTranslateExtractionPattern.prototype.isExplicitIdMatched = function (id) {
        return id && this._matchExplicitId;
    };
    /**
     * Check, wether a given description matches the pattern.
     * @param description description
     * @return wether a given description matches the pattern.
     */
    NgxTranslateExtractionPattern.prototype.isDescriptionMatched = function (description) {
        return this._descriptionPatterns.indexOf(description) >= 0;
    };
    NgxTranslateExtractionPattern.prototype.checkValidDescriptionPattern = function (descriptionPattern) {
        if (!descriptionPattern) {
            return 'empty value not allowed';
        }
        if (/^[a-zA-Z_][a-zA-Z_-]*$/.test(descriptionPattern)) {
            return null; // it is ok
        }
        else {
            return 'description pattern must be an identifier containing only letters, digits, _ or -';
        }
    };
    return NgxTranslateExtractionPattern;
}());
exports.NgxTranslateExtractionPattern = NgxTranslateExtractionPattern;
