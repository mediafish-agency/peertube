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
exports.Xliff2MessageParser = void 0;
var abstract_message_parser_1 = require("./abstract-message-parser");
var parsed_message_part_1 = require("./parsed-message-part");
var tag_mapping_1 = require("./tag-mapping");
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
var Xliff2MessageParser = /** @class */ (function (_super) {
    __extends(Xliff2MessageParser, _super);
    function Xliff2MessageParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handle this element node.
     * This is called before the children are done.
     * @param elementNode elementNode
     * @param message message to be altered
     * @return true, if children should be processed too, false otherwise (children ignored then)
     */
    Xliff2MessageParser.prototype.processStartElement = function (elementNode, message) {
        var tagName = elementNode.tagName;
        if (tagName === 'ph') {
            // placeholder are like <ph id="0" equiv="INTERPOLATION" disp="{{number()}}"/>
            // They contain the id and also a name (number in the example)
            // TODO make some use of the name (but it is not available in XLIFF 1.2)
            // ICU message are handled with the same tag
            // Before 4.3.2 they did not have an equiv and disp (Bug #17344):
            // e.g. <ph id="0"/>
            // Beginning with 4.3.2 they do have an equiv ICU and disp:
            // e.g. <ph id="0" equiv="ICU" disp="{count, plural, =0 {...} =1 {...} other {...}}"/>
            // and empty tags have equiv other then INTERPOLATION:
            // e.g. <ph id="3" equiv="TAG_IMG" type="image" disp="&lt;img/>"/>
            // or <ph equiv="LINE_BREAK" type="lb" disp="&lt;br/>"/>
            var isInterpolation = false;
            var isICU = false;
            var isEmptyTag = false;
            var equiv = elementNode.getAttribute('equiv');
            var disp = elementNode.getAttribute('disp');
            var indexString = null;
            var index = 0;
            var emptyTagName = null;
            if (!equiv) {
                // old ICU syntax, fixed with #17344
                isICU = true;
                indexString = elementNode.getAttribute('id');
                index = Number.parseInt(indexString, 10);
            }
            else if (equiv.startsWith('ICU')) {
                // new ICU syntax, fixed with #17344
                isICU = true;
                if (equiv === 'ICU') {
                    indexString = '0';
                }
                else {
                    indexString = equiv.substring('ICU_'.length);
                }
                index = Number.parseInt(indexString, 10);
            }
            else if (equiv.startsWith('INTERPOLATION')) {
                isInterpolation = true;
                if (equiv === 'INTERPOLATION') {
                    indexString = '0';
                }
                else {
                    indexString = equiv.substring('INTERPOLATION_'.length);
                }
                index = Number.parseInt(indexString, 10);
            }
            else if (new tag_mapping_1.TagMapping().isEmptyTagPlaceholderName(equiv)) {
                isEmptyTag = true;
                emptyTagName = new tag_mapping_1.TagMapping().getTagnameFromEmptyTagPlaceholderName(equiv);
            }
            else {
                return true;
            }
            if (isInterpolation) {
                message.addPlaceholder(index, disp);
            }
            else if (isICU) {
                message.addICUMessageRef(index, disp);
            }
            else if (isEmptyTag) {
                message.addEmptyTag(emptyTagName, this.parseIdCountFromName(equiv));
            }
        }
        else if (tagName === 'pc') {
            // pc example: <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt"
            // dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">IMPORTANT</pc>
            var embeddedTagName = this.tagNameFromPCElement(elementNode);
            if (embeddedTagName) {
                message.addStartTag(embeddedTagName, this.parseIdCountFromName(elementNode.getAttribute('equivStart')));
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
    Xliff2MessageParser.prototype.processEndElement = function (elementNode, message) {
        var tagName = elementNode.tagName;
        if (tagName === 'pc') {
            // pc example: <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt"
            // dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">IMPORTANT</pc>
            var embeddedTagName = this.tagNameFromPCElement(elementNode);
            if (embeddedTagName) {
                message.addEndTag(embeddedTagName);
            }
            return;
        }
    };
    Xliff2MessageParser.prototype.tagNameFromPCElement = function (pcNode) {
        var dispStart = pcNode.getAttribute('dispStart');
        if (dispStart.startsWith('<')) {
            dispStart = dispStart.substring(1);
        }
        if (dispStart.endsWith('>')) {
            dispStart = dispStart.substring(0, dispStart.length - 1);
        }
        return dispStart;
    };
    /**
     * reimplemented here, because XLIFF 2.0 uses a deeper xml model.
     * So we cannot simply replace the message parts by xml parts.
     * @param message message
     * @param rootElem rootElem
     */
    Xliff2MessageParser.prototype.addXmlRepresentationToRoot = function (message, rootElem) {
        var _this = this;
        var stack = [{ element: rootElem, tagName: 'root' }];
        var id = 0;
        message.parts().forEach(function (part) {
            switch (part.type) {
                case parsed_message_part_1.ParsedMessagePartType.TEXT:
                    stack[stack.length - 1].element.appendChild(_this.createXmlRepresentationOfTextPart(part, rootElem));
                    break;
                case parsed_message_part_1.ParsedMessagePartType.PLACEHOLDER:
                    stack[stack.length - 1].element.appendChild(_this.createXmlRepresentationOfPlaceholderPart(part, rootElem, id++));
                    break;
                case parsed_message_part_1.ParsedMessagePartType.ICU_MESSAGE_REF:
                    stack[stack.length - 1].element.appendChild(_this.createXmlRepresentationOfICUMessageRefPart(part, rootElem));
                    break;
                case parsed_message_part_1.ParsedMessagePartType.START_TAG:
                    var newTagElem = _this.createXmlRepresentationOfStartTagPart(part, rootElem, id++);
                    stack[stack.length - 1].element.appendChild(newTagElem);
                    stack.push({ element: newTagElem, tagName: part.tagName() });
                    break;
                case parsed_message_part_1.ParsedMessagePartType.END_TAG:
                    var closeTagName = part.tagName();
                    if (stack.length <= 1 || stack[stack.length - 1].tagName !== closeTagName) {
                        // oops, not well formed
                        throw new Error('unexpected close tag ' + closeTagName);
                    }
                    stack.pop();
                    break;
                case parsed_message_part_1.ParsedMessagePartType.EMPTY_TAG:
                    var emptyTagElem = _this.createXmlRepresentationOfEmptyTagPart(part, rootElem, id++);
                    stack[stack.length - 1].element.appendChild(emptyTagElem);
                    break;
            }
        });
        if (stack.length !== 1) {
            // oops, not well closed tags
            throw new Error('missing close tag ' + stack[stack.length - 1].tagName);
        }
    };
    /**
     * the xml used for start tag in the message.
     * Returns an empty pc-Element.
     * e.g. <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">
     * Text content will be added later.
     * @param part part
     * @param rootElem rootElem
     * @param id id number in xliff2
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfStartTagPart = function (part, rootElem, id) {
        var tagMapping = new tag_mapping_1.TagMapping();
        var pcElem = rootElem.ownerDocument.createElement('pc');
        var tagName = part.tagName();
        var equivStart = tagMapping.getStartTagPlaceholderName(tagName, part.idCounter());
        var equivEnd = tagMapping.getCloseTagPlaceholderName(tagName);
        var dispStart = '<' + tagName + '>';
        var dispEnd = '</' + tagName + '>';
        pcElem.setAttribute('id', id.toString(10));
        pcElem.setAttribute('equivStart', equivStart);
        pcElem.setAttribute('equivEnd', equivEnd);
        pcElem.setAttribute('type', this.getTypeForTag(tagName));
        pcElem.setAttribute('dispStart', dispStart);
        pcElem.setAttribute('dispEnd', dispEnd);
        return pcElem;
    };
    /**
     * the xml used for end tag in the message.
     * Not used here, because content is child of start tag.
     * @param part part
     * @param rootElem rootElem
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfEndTagPart = function (part, rootElem) {
        // not used
        return null;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an empty ph-Element.
     * e.g. <ph id="3" equiv="TAG_IMG" type="image" disp="&lt;img/>"/>
     * @param part part
     * @param rootElem rootElem
     * @param id id number in xliff2
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfEmptyTagPart = function (part, rootElem, id) {
        var tagMapping = new tag_mapping_1.TagMapping();
        var phElem = rootElem.ownerDocument.createElement('ph');
        var tagName = part.tagName();
        var equiv = tagMapping.getEmptyTagPlaceholderName(tagName, part.idCounter());
        var disp = '<' + tagName + '/>';
        phElem.setAttribute('id', id.toString(10));
        phElem.setAttribute('equiv', equiv);
        phElem.setAttribute('type', this.getTypeForTag(tagName));
        phElem.setAttribute('disp', disp);
        return phElem;
    };
    Xliff2MessageParser.prototype.getTypeForTag = function (tag) {
        switch (tag.toLowerCase()) {
            case 'br':
            case 'b':
            case 'i':
            case 'u':
                return 'fmt';
            case 'img':
                return 'image';
            case 'a':
                return 'link';
            default:
                return 'other';
        }
    };
    /**
     * the xml used for placeholder in the message.
     * Returns e.g. <ph id="1" equiv="INTERPOLATION_1" disp="{{total()}}"/>
     * @param part part
     * @param rootElem rootElem
     * @param id id number in xliff2
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfPlaceholderPart = function (part, rootElem, id) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var equivAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            equivAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('id', id.toString(10));
        phElem.setAttribute('equiv', equivAttrib);
        var disp = part.disp();
        if (disp) {
            phElem.setAttribute('disp', disp);
        }
        return phElem;
    };
    /**
     * the xml used for icu message refs in the message.
     * @param part part
     * @param rootElem rootElem
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = function (part, rootElem) {
        var phElem = rootElem.ownerDocument.createElement('ph');
        var equivAttrib = 'ICU';
        if (part.index() > 0) {
            equivAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('id', part.index().toString(10));
        phElem.setAttribute('equiv', equivAttrib);
        var disp = part.disp();
        if (disp) {
            phElem.setAttribute('disp', disp);
        }
        return phElem;
    };
    return Xliff2MessageParser;
}(abstract_message_parser_1.AbstractMessageParser));
exports.Xliff2MessageParser = Xliff2MessageParser;
