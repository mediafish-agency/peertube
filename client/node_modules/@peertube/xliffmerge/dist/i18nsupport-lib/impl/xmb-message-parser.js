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
exports.XmbMessageParser = void 0;
var abstract_message_parser_1 = require("./abstract-message-parser");
var dom_utilities_1 = require("./dom-utilities");
var tag_mapping_1 = require("./tag-mapping");
var parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
var XmbMessageParser = /** @class */ (function (_super) {
    __extends(XmbMessageParser, _super);
    function XmbMessageParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handle this element node.
     * This is called before the children are done.
     * @param elementNode elementNode
     * @param message message to be altered
     * @return true, if children should be processed too, false otherwise (children ignored then)
     */
    XmbMessageParser.prototype.processStartElement = function (elementNode, message) {
        var tagName = elementNode.tagName;
        if (tagName === 'ph') {
            // There are 4 different usages of ph element:
            // 1. placeholders are like <ph name="INTERPOLATION"><ex>INTERPOLATION</ex></ph>
            // or <ph name="INTERPOLATION_1"><ex>INTERPOLATION_1</ex></ph>
            // 2. start tags:
            // <ph name="START_LINK"><ex>&lt;a&gt;</ex></ph>
            // 3. empty tags:
            // <ph name="TAG_IMG"><ex>&lt;img&gt;</ex></ph>
            // 4. ICU:
            // <ph name="ICU"><ex>ICU</ex></ph>
            var name_1 = elementNode.getAttribute('name');
            if (!name_1) {
                return true; // should not happen
            }
            if (name_1.startsWith('INTERPOLATION')) {
                var index = this.parsePlaceholderIndexFromName(name_1);
                message.addPlaceholder(index, null);
                return false; // ignore children
            }
            else if (name_1.startsWith('START_')) {
                var tag = this.parseTagnameFromPhElement(elementNode);
                var idcounter = this.parseIdCountFromName(name_1);
                if (tag) {
                    message.addStartTag(tag, idcounter);
                }
                return false; // ignore children
            }
            else if (name_1.startsWith('CLOSE_')) {
                var tag = this.parseTagnameFromPhElement(elementNode);
                if (tag) {
                    message.addEndTag(tag);
                }
                return false; // ignore children
            }
            else if (new tag_mapping_1.TagMapping().isEmptyTagPlaceholderName(name_1)) {
                var emptyTagName = new tag_mapping_1.TagMapping().getTagnameFromEmptyTagPlaceholderName(name_1);
                var idcounter = this.parseIdCountFromName(name_1);
                message.addEmptyTag(emptyTagName, idcounter);
                return false; // ignore children
            }
            else if (name_1.startsWith('ICU')) {
                var index = this.parseICUMessageIndexFromName(name_1);
                message.addICUMessageRef(index, null);
                return false; // ignore children
            }
        }
        else if (tagName === 'source') {
            // ignore source
            return false;
        }
        return true;
    };
    /**
     * Return the ICU message content of the node, if it is an ICU Message.
     * @param node node
     * @return message or null, if it is no ICU Message.
     */
    XmbMessageParser.prototype.getICUMessageText = function (node) {
        var children = node.childNodes;
        if (children.length === 0) {
            return null;
        }
        var firstChild = null;
        // find first child that is no source element.
        var i;
        for (i = 0; i < children.length; i++) {
            var child = children.item(i);
            if (child.nodeType !== child.ELEMENT_NODE || child.tagName !== 'source') {
                firstChild = child;
                break;
            }
        }
        if (firstChild && firstChild.nodeType === firstChild.TEXT_NODE) {
            if (this.isICUMessageStart(firstChild.textContent)) {
                var messageText = dom_utilities_1.DOMUtilities.getXMLContent(node);
                if (i > 0) {
                    // drop <source> elements
                    var reSource = new RegExp('<source[^>]*>.*</source>', 'g');
                    return messageText.replace(reSource, '');
                }
                else {
                    return messageText;
                }
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @param elementNode elementNode
     * @param message message to be altered
     */
    XmbMessageParser.prototype.processEndElement = function (elementNode, message) {
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param name name
     * @return id as number
     */
    XmbMessageParser.prototype.parsePlaceholderIndexFromName = function (name) {
        var indexString = '';
        if (name === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = name.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @param name name
     * @return id as number
     */
    XmbMessageParser.prototype.parseICUMessageIndexFromName = function (name) {
        var indexString = '';
        if (name === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = name.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @param phElement phElement
     */
    XmbMessageParser.prototype.parseTagnameFromPhElement = function (phElement) {
        var exElement = dom_utilities_1.DOMUtilities.getFirstElementByTagName(phElement, 'ex');
        if (exElement) {
            var value = dom_utilities_1.DOMUtilities.getPCDATA(exElement);
            if (!value || !value.startsWith('<') || !value.endsWith('>')) {
                // oops
                return null;
            }
            if (value.charAt(1) === '/') {
                return value.substring(2, value.length - 1);
            }
            else {
                return value.substring(1, value.length - 1);
            }
        }
        else {
            return null;
        }
    };
    XmbMessageParser.prototype.addXmlRepresentationToRoot = function (message, rootElem) {
        var _this = this;
        message.parts().forEach(function (part) {
            var child = _this.createXmlRepresentationOfPart(part, rootElem);
            if (child) {
                rootElem.appendChild(child);
            }
        });
    };
    XmbMessageParser.prototype.createXmlRepresentationOfPart = function (part, rootElem) {
        switch (part.type) {
            case parsed_message_part_1.ParsedMessagePartType.TEXT:
                return this.createXmlRepresentationOfTextPart(part, rootElem);
            case parsed_message_part_1.ParsedMessagePartType.START_TAG:
                return this.createXmlRepresentationOfStartTagPart(part, rootElem);
            case parsed_message_part_1.ParsedMessagePartType.END_TAG:
                return this.createXmlRepresentationOfEndTagPart(part, rootElem);
            case parsed_message_part_1.ParsedMessagePartType.EMPTY_TAG:
                return this.createXmlRepresentationOfEmptyTagPart(part, rootElem);
            case parsed_message_part_1.ParsedMessagePartType.PLACEHOLDER:
                return this.createXmlRepresentationOfPlaceholderPart(part, rootElem);
            case parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF:
                return this.createXmlRepresentationOfICUMessageRefPart(part, rootElem);
        }
    };
    /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    XmbMessageParser.prototype.createXmlRepresentationOfStartTagPart = function (part, rootElem) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var tagMapping = new tag_mapping_1.TagMapping();
        var nameAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    XmbMessageParser.prototype.createXmlRepresentationOfEndTagPart = function (part, rootElem) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var tagMapping = new tag_mapping_1.TagMapping();
        var nameAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        phElem.setAttribute('name', nameAttrib);
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('</' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    XmbMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = function (part, rootElem) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var tagMapping = new tag_mapping_1.TagMapping();
        var nameAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    XmbMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = function (part, rootElem) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var nameAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            nameAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for icu message refs in the message.
     * @param part part
     * @param rootElem rootElem
     */
    XmbMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = function (part, rootElem) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var nameAttrib = 'ICU';
        if (part.index() > 0) {
            nameAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
    };
    return XmbMessageParser;
}(abstract_message_parser_1.AbstractMessageParser));
exports.XmbMessageParser = XmbMessageParser;
