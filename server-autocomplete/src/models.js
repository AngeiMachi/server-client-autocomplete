"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = void 0;
var TrieNode = /** @class */ (function () {
    function TrieNode() {
        this.children = {};
        this.isEndOfWord = false;
    }
    return TrieNode;
}());
var Trie = /** @class */ (function () {
    function Trie() {
        this.root = new TrieNode();
    }
    Trie.prototype.insert = function (word) {
        var node = this.root;
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var char = word_1[_i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    };
    Trie.prototype.search = function (prefix) {
        var node = this.root;
        for (var _i = 0, prefix_1 = prefix; _i < prefix_1.length; _i++) {
            var char = prefix_1[_i];
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this.getAllWords(node, prefix);
    };
    Trie.prototype.getAllWords = function (node, prefix) {
        var result = [];
        if (node.isEndOfWord) {
            result.push(prefix);
        }
        for (var _i = 0, _a = Object.entries(node.children); _i < _a.length; _i++) {
            var _b = _a[_i], char = _b[0], childNode = _b[1];
            result.push.apply(result, this.getAllWords(childNode, prefix + char));
        }
        return result;
    };
    return Trie;
}());
exports.Trie = Trie;
