"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
var fs = __importStar(require("fs"));
/**
 * Created by martin on 17.02.2017.
 * Some (a few) simple utils for file operations.
 * Just for convenience.
 */
var FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    /**
     * Check for existence.
     * @param filename filename
     * @return wether file exists
     */
    FileUtil.exists = function (filename) {
        return fs.existsSync(filename);
    };
    /**
     * Read a file.
     * @param filename filename
     * @param encoding encoding
     * @return content of file
     */
    FileUtil.read = function (filename, encoding) {
        return fs.readFileSync(filename, encoding);
    };
    /**
     * Write a file with given content.
     * @param filename filename
     * @param newContent newContent
     * @param encoding encoding
     */
    FileUtil.replaceContent = function (filename, newContent, encoding) {
        fs.writeFileSync(filename, newContent, { encoding: encoding });
    };
    FileUtil.copy = function (srcFile, destFile) {
        var BUF_LENGTH = 64 * 1024;
        var buff = Buffer.alloc(BUF_LENGTH);
        var fdr = fs.openSync(srcFile, 'r');
        var fdw = fs.openSync(destFile, 'w');
        var bytesRead = 1;
        var pos = 0;
        while (bytesRead > 0) {
            bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
            fs.writeSync(fdw, buff, 0, bytesRead);
            pos += bytesRead;
        }
        fs.closeSync(fdr);
        fs.closeSync(fdw);
    };
    /**
     * Delete the folder and all of its content (rm -rf).
     * @param path path
     */
    FileUtil.deleteFolderRecursive = function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file) {
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileUtil.deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    /**
     * Delete folders content recursively, but do not delete folder.
     * Folder is left empty at the end.
     * @param path path
     */
    FileUtil.deleteFolderContentRecursive = function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file) {
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileUtil.deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
        }
    };
    /**
     * Delete a file.
     * @param path path
     */
    FileUtil.deleteFile = function (path) {
        fs.unlinkSync(path);
    };
    return FileUtil;
}());
exports.FileUtil = FileUtil;
