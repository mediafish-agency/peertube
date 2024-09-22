"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationMessagesFileReader = void 0;
/**
 * Created by roobm on 21.03.2017.
 */
var i18nsupport_lib_1 = require("../i18nsupport-lib");
var file_util_1 = require("../common/file-util");
var xml_reader_1 = require("./xml-reader");
/**
 * Helper class to read translation files depending on format.
 */
var TranslationMessagesFileReader = /** @class */ (function () {
    function TranslationMessagesFileReader() {
    }
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param i18nFormat format
     * @param path path
     * @param encoding encoding
     * @param optionalMasterFilePath optionalMasterFilePath
     * @return XliffFile
     */
    TranslationMessagesFileReader.fromFile = function (i18nFormat, path, encoding, optionalMasterFilePath) {
        var xmlContent = xml_reader_1.XmlReader.readXmlFileContent(path, encoding);
        var optionalMaster = TranslationMessagesFileReader.masterFileContent(optionalMasterFilePath, encoding);
        return i18nsupport_lib_1.TranslationMessagesFileFactory.fromFileContent(i18nFormat, xmlContent.content, path, xmlContent.encoding, optionalMaster);
    };
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param path path
     * @param encoding encoding
     * @param optionalMasterFilePath optionalMasterFilePath
     * @return XliffFile
     */
    TranslationMessagesFileReader.fromUnknownFormatFile = function (path, encoding, optionalMasterFilePath) {
        var xmlContent = xml_reader_1.XmlReader.readXmlFileContent(path, encoding);
        var optionalMaster = TranslationMessagesFileReader.masterFileContent(optionalMasterFilePath, encoding);
        return i18nsupport_lib_1.TranslationMessagesFileFactory.fromUnknownFormatFileContent(xmlContent.content, path, xmlContent.encoding, optionalMaster);
    };
    /**
     * Read master xmb file
     * @param optionalMasterFilePath optionalMasterFilePath
     * @param encoding encoding
     * @return content and encoding of file
     */
    TranslationMessagesFileReader.masterFileContent = function (optionalMasterFilePath, encoding) {
        if (optionalMasterFilePath) {
            var masterXmlContent = xml_reader_1.XmlReader.readXmlFileContent(optionalMasterFilePath, encoding);
            return {
                xmlContent: masterXmlContent.content,
                path: optionalMasterFilePath,
                encoding: masterXmlContent.encoding
            };
        }
        else {
            return null;
        }
    };
    /**
     * Save edited file.
     * @param messagesFile messagesFile
     * @param beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     */
    TranslationMessagesFileReader.save = function (messagesFile, beautifyOutput) {
        file_util_1.FileUtil.replaceContent(messagesFile.filename(), messagesFile.editedContent(beautifyOutput), messagesFile.encoding());
    };
    return TranslationMessagesFileReader;
}());
exports.TranslationMessagesFileReader = TranslationMessagesFileReader;
