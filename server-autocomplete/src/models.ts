class TrieNode {
    children: { [key: string]: TrieNode };
    isEndOfWord: boolean;

    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}
export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(prefix: string): string[] {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this.getAllWords(node, prefix);
    }

    private getAllWords(node: TrieNode, prefix: string): string[] {
        const result: string[] = [];
        if (node.isEndOfWord) {
            result.push(prefix);
        }
        for (const [char, childNode] of Object.entries(node.children)) {
            result.push(...this.getAllWords(childNode, prefix + char));
        }
        return result;
    }
}
