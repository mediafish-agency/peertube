"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgxTranslateExtractor = void 0;
var i18nsupport_lib_1 = require("../i18nsupport-lib");
var file_util_1 = require("../common/file-util");
var util_1 = require("../common/util");
var ngx_translate_extraction_pattern_1 = require("./ngx-translate-extraction-pattern");
var NgxTranslateExtractor = exports.NgxTranslateExtractor = /** @class */ (function () {
    function NgxTranslateExtractor(messagesFile, extractionPatternString) {
        this.messagesFile = messagesFile;
        this.extractionPattern = new ngx_translate_extraction_pattern_1.NgxTranslateExtractionPattern(extractionPatternString);
    }
    /**
     * Check, wether extractionPattern has valid syntax.
     * @param extractionPatternString extractionPatternString
     * @return null, if pattern is ok, string describing the error, if it is not ok.
     */
    NgxTranslateExtractor.checkPattern = function (extractionPatternString) {
        try {
            if (new ngx_translate_extraction_pattern_1.NgxTranslateExtractionPattern(extractionPatternString)) {
                return null;
            }
        }
        catch (error) {
            return error.message;
        }
        return null;
    };
    NgxTranslateExtractor.extract = function (messagesFile, extractionPattern, outputFile) {
        new NgxTranslateExtractor(messagesFile, extractionPattern).extractTo(outputFile);
    };
    /**
     * Extact messages and write them to a file.
     * @param outputFile outputFile
     */
    NgxTranslateExtractor.prototype.extractTo = function (outputFile) {
        var translations = this.toNgxTranslations(this.extract());
        if (translations && Object.keys(translations).length > 0) {
            file_util_1.FileUtil.replaceContent(outputFile, JSON.stringify(translations, null, 4), 'utf-8');
        }
        else {
            if (file_util_1.FileUtil.exists(outputFile)) {
                file_util_1.FileUtil.deleteFile(outputFile);
            }
        }
    };
    /**
     *  Extract messages and convert them to ngx translations.
     *  @return the translation objects.
     */
    NgxTranslateExtractor.prototype.extract = function () {
        var _this = this;
        var result = [];
        this.messagesFile.forEachTransUnit(function (tu) {
            var ngxId = _this.ngxTranslateIdFromTU(tu);
            if (ngxId) {
                var messagetext = tu.targetContentNormalized().asDisplayString(i18nsupport_lib_1.NORMALIZATION_FORMAT_NGXTRANSLATE);
                result.push({ id: ngxId, message: messagetext });
            }
        });
        return result;
    };
    /**
     * Check, wether this tu should be extracted for ngx-translate usage, and return its id for ngx-translate.
     * There are 2 possibilities:
     * 1. description is set to "ngx-translate" and meaning contains the id.
     * 2. id is explicitly set to a string.
     * @param tu tu
     * @return an ngx id or null, if this tu should not be extracted.
     */
    NgxTranslateExtractor.prototype.ngxTranslateIdFromTU = function (tu) {
        if (this.isExplicitlySetId(tu.id)) {
            if (this.extractionPattern.isExplicitIdMatched(tu.id)) {
                return tu.id;
            }
            else {
                return null;
            }
        }
        var description = tu.description();
        if (description && this.extractionPattern.isDescriptionMatched(description)) {
            return tu.meaning();
        }
    };
    /**
     * Test, wether ID was explicitly set (via i18n="@myid).
     * Just heuristic, an ID is explicitly, if it does not look like a generated one.
     * @param id id
     * @return wether ID was explicitly set (via i18n="@myid).
     */
    NgxTranslateExtractor.prototype.isExplicitlySetId = function (id) {
        if ((0, util_1.isNullOrUndefined)(id)) {
            return false;
        }
        // generated IDs are either decimal or sha1 hex
        var reForGeneratedId = /^[0-9a-f]{11,}$/;
        return !reForGeneratedId.test(id);
    };
    /**
     * Convert list of relevant TUs to ngx translations object.
     * @param msgList msgList
     */
    NgxTranslateExtractor.prototype.toNgxTranslations = function (msgList) {
        var _this = this;
        var translationObject = {};
        msgList.forEach(function (msg) {
            _this.putInTranslationObject(translationObject, msg);
        });
        return translationObject;
    };
    /**
     * Put a new messages into the translation data object.
     * If you add, e.g. "{id: 'myapp.example', message: 'test'}",
     * the translation object will then contain an object myapp that has property example:
     * {myapp: {
     *   example: 'test'
     *   }}
     * @param translationObject translationObject
     * @param msg msg
     */
    NgxTranslateExtractor.prototype.putInTranslationObject = function (translationObject, msg) {
        var firstPartOfId;
        var restOfId;
        var indexOfDot = msg.id.indexOf('.');
        if (indexOfDot === 0 || indexOfDot === (msg.id.length - 1)) {
            throw new Error('bad nxg-translate id "' + msg.id + '"');
        }
        if (indexOfDot < 0) {
            firstPartOfId = msg.id;
            restOfId = '';
        }
        else {
            firstPartOfId = msg.id.substring(0, indexOfDot);
            restOfId = msg.id.substring(indexOfDot + 1);
        }
        var object = translationObject[firstPartOfId];
        if ((0, util_1.isNullOrUndefined)(object)) {
            if (restOfId === '') {
                translationObject[firstPartOfId] = msg.message;
                return;
            }
            object = {};
            translationObject[firstPartOfId] = object;
        }
        else {
            if (restOfId === '') {
                throw new Error('duplicate id praefix "' + msg.id + '"');
            }
        }
        this.putInTranslationObject(object, { id: restOfId, message: msg.message });
    };
    NgxTranslateExtractor.DefaultExtractionPattern = '@@|ngx-translate';
    return NgxTranslateExtractor;
}());
