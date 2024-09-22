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
exports.XliffMessageParser = void 0;
var abstract_message_parser_1 = require("./abstract-message-parser");
var tag_mapping_1 = require("./tag-mapping");
var parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
var XliffMessageParser = /** @class */ (function (_super) {
    __extends(XliffMessageParser, _super);
    function XliffMessageParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handle this element node.
     * This is called before the children are done.
     * @param elementNode elementNode
     * @param message message to be altered
     * @return true, if children should be processed too, false otherwise (children ignored then)
     */
    XliffMessageParser.prototype.processStartElement = function (elementNode, message) {
        var tagName = elementNode.tagName;
        var tagMapping = new tag_mapping_1.TagMapping();
        if (tagName === 'x') {
            // placeholder are like <x id="INTERPOLATION"/> or <x id="INTERPOLATION_1">
            var id = elementNode.getAttribute('id');
            if (!id) {
                return; // should not happen
            }
            if (id.startsWith('INTERPOLATION')) {
                var index = this.parsePlaceholderIndexFromId(id);
                message.addPlaceholder(index, null);
            }
            else if (id.startsWith('ICU')) {
                var index = this.parseICUMessageRefIndexFromId(id);
                message.addICUMessageRef(index, null);
            }
            else if (id.startsWith('START_')) {
                var normalizedTagName = tagMapping.getTagnameFromStartTagPlaceholderName(id);
                if (normalizedTagName) {
                    var idcount = this.parseIdCountFromName(id);
                    message.addStartTag(normalizedTagName, idcount);
                }
            }
            else if (id.startsWith('CLOSE_')) {
                var normalizedTagName = tagMapping.getTagnameFromCloseTagPlaceholderName(id);
                if (normalizedTagName) {
                    message.addEndTag(normalizedTagName);
                }
            }
            else if (tagMapping.isEmptyTagPlaceholderName(id)) {
                var normalizedTagName = tagMapping.getTagnameFromEmptyTagPlaceholderName(id);
                if (normalizedTagName) {
                    var idcount = this.parseIdCountFromName(id);
                    message.addEmptyTag(normalizedTagName, idcount);
                }
            }
        }
        return true;
    };
    /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @param elementNode elementNode
     * @param message message to be altered
     */
    XliffMessageParser.prototype.processEndElement = function (elementNode, message) {
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param id id
     * @return index
     */
    XliffMessageParser.prototype.parsePlaceholderIndexFromId = function (id) {
        var indexString = '';
        if (id === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = id.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param id id
     * @return id as number
     */
    XliffMessageParser.prototype.parseICUMessageRefIndexFromId = function (id) {
        var indexString = '';
        if (id === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = id.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    XliffMessageParser.prototype.addXmlRepresentationToRoot = function (message, rootElem) {
        var _this = this;
        message.parts().forEach(function (part) {
            var child;
            switch (part.type) {
                case parsed_message_part_1.ParsedMessagePartType.TEXT:
                    child = _this.createXmlRepresentationOfTextPart(part, rootElem);
                    break;
                case parsed_message_part_1.ParsedMessagePartType.START_TAG:
                    child = _this.createXmlRepresentationOfStartTagPart(part, rootElem);
                    break;
                case parsed_message_part_1.ParsedMessagePartType.END_TAG:
                    child = _this.createXmlRepresentationOfEndTagPart(part, rootElem);
                    break;
                case parsed_message_part_1.ParsedMessagePartType.EMPTY_TAG:
                    child = _this.createXmlRepresentationOfEmptyTagPart(part, rootElem);
                    break;
                case parsed_message_part_1.ParsedMessagePartType.PLACEHOLDER:
                    child = _this.createXmlRepresentationOfPlaceholderPart(part, rootElem);
                    break;
                case parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF:
                    child = _this.createXmlRepresentationOfICUMessageRefPart(part, rootElem);
                    break;
            }
            if (child) {
                rootElem.appendChild(child);
            }
        });
    };
    /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    XliffMessageParser.prototype.createXmlRepresentationOfStartTagPart = function (part, rootElem) {
        var xElem = rootElem.ownerDocument.createElement('x');
        var tagMapping = new tag_mapping_1.TagMapping();
        var idAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        var ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        var equivTextAttr = '<' + part.tagName() + '>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    };
    /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    XliffMessageParser.prototype.createXmlRepresentationOfEndTagPart = function (part, rootElem) {
        var xElem = rootElem.ownerDocument.createElement('x');
        var tagMapping = new tag_mapping_1.TagMapping();
        var idAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        var ctypeAttrib = 'x-' + part.tagName();
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        return xElem;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    XliffMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = function (part, rootElem) {
        var xElem = rootElem.ownerDocument.createElement('x');
        var tagMapping = new tag_mapping_1.TagMapping();
        var idAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        var ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        var equivTextAttr = '<' + part.tagName() + '/>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    };
    /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @param part part
     * @param rootElem rootElem
     */
    XliffMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = function (part, rootElem) {
        var xElem = rootElem.ownerDocument.createElement('x');
        var idAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            idAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        var equivTextAttr = part.disp();
        xElem.setAttribute('id', idAttrib);
        if (equivTextAttr) {
            xElem.setAttribute('equiv-text', equivTextAttr);
        }
        return xElem;
    };
    /**
     * the xml used for icu message refs in the message.
     * @param part part
     * @param rootElem rootElem
     */
    XliffMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = function (part, rootElem) {
        var xElem = rootElem.ownerDocument.createElement('x');
        var idAttrib = 'ICU';
        if (part.index() > 0) {
            idAttrib = 'ICU_' + part.index().toString(10);
        }
        xElem.setAttribute('id', idAttrib);
        return xElem;
    };
    return XliffMessageParser;
}(abstract_message_parser_1.AbstractMessageParser));
exports.XliffMessageParser = XliffMessageParser;
