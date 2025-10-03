class BinaryTree {
    root;

    constructor(arr) {
        this.root = BinaryTree.buildTree(arr);
    }

    static buildTree(array) {
        // Set() converts array to set which removes duplicates
        array = [...new Set(array)];
        array.sort((a, b) => { return a - b }); // to sort properly
        return BinaryTree.recBuild(array);
    }

    static recBuild(array) {
        if (array.length === 0) {
            return null
        };
        const midIdx = Math.floor(array.length / 2);
        const midVal = array[midIdx];
        array.splice(midIdx, 1);

        return new BNode(
            BinaryTree.recBuild(array.slice(0, midIdx)),
            BinaryTree.recBuild(array.slice(midIdx)),
            midVal);
    }

    depth(value) {
        let cnode = this.root;
        let steps = 0;
        while (true) {
            if (cnode === null) {
                return null;
            }

            if (cnode.value === value) {
                return steps;
            }

            if (value < cnode.value) {
                cnode = cnode.left;
            } else {
                cnode = cnode.right;
            }

            steps += 1;
        }
    }

    find(value) {
        let cnode = this.root;
        let steps = 0;
        while (true) {
            if (cnode === null) {
                return null;
            }

            if (cnode.value === value) {
                return cnode;
            }

            if (value < cnode.value) {
                cnode = cnode.left;
            } else {
                cnode = cnode.right;
            }
        }
    }

    height(value) {
        let startNode = this.find(value);
        if (startNode === null) { return null };

        let queue = [[0, startNode]];
        let longest = 0;
        while (true) {
            if (queue.length === 0) {
                return longest;
            }

            let h, p;
            [h, p] = queue.pop();
            longest = Math.max(longest, h);

            if (p.left !== null) {
                queue.splice(0, 0, [h + 1, p.left]);
            }

            if (p.right !== null) {
                queue.splice(0, 0, [h + 1, p.right]);
            }
        }
    }

    values() {
        let startNode = this.root;
        let queue = [startNode];
        let output = [];
        while (true) {
            if (queue.length === 0) {
                return output;
            }

            let p = queue.pop();
            output.push(p.value);

            if (p.left !== null) {
                queue.push(p.left);
            }

            if (p.right !== null) {
                queue.push(p.right);
            }
        }
    }

    rebalance() {
        const values = this.values();
        this.root = BinaryTree.buildTree(values);
    }

    isBalanced() {
        let fhelper = (node) => {
            if (node === null) {
                return 0;
            }

            const ls = fhelper(node.left);
            const rs = fhelper(node.right);

            if (ls === -1 || rs === -1 || Math.abs(ls - rs) > 1) {
                return -1;
            }

            return Math.max(ls, rs) + 1;
        }

        return fhelper(this.root) > 0;
    }

    levelOrderForEach(callback) {
        if (callback == null) {
            throw new Error("No callback function provided!");
        }

        let queue = [this.root];
        while (queue.length > 0) {
            let cnode = queue.pop();
            cnode = callback(cnode);

            if (cnode.left !== null) {
                queue.push(cnode.left);
            }

            if (cnode.right !== null) {
                queue.push(cnode.right);
            }
        }
    }

    inOrderForEach(callback) {
        if (callback == null) {
            throw new Error("No callback function provided!");
        }

        let queue = [];
        let cnode = this.root;
        while (cnode !== null || queue.length > 0) {
            while (cnode !== null) {
                queue.push(cnode);
                cnode = cnode.left;
            }

            cnode = queue.pop();
            cnode = callback(cnode);
            cnode = cnode.right;
        }
    }

    insert(value) {
        let cnode = this.root;
        while (true) {
            if (value < cnode.value) {
                if (cnode.left === null) {
                    cnode.left = new BNode(null, null, value);
                    return;
                } else {
                    cnode = cnode.left;
                }
            }
            if (value > cnode.value) {
                if (cnode.right === null) {
                    cnode.right = new BNode(null, null, value);
                    return;
                } else {
                    cnode = cnode.right;
                }
            }
        }
    }

    delete(value) {
        if (this.root.value === value) {
            this.root = null;
            return;
        }

        // Find the node to delete and the parent
        let parent = this.root;
        let node = null;
        while (true) {
            if (parent === null) {
                break;
            }

            if (parent.right.value === value) {
                node = parent.right;
                break;
            }

            if (parent.left.value === value) {
                node = parent.left;
                break;
            }

            if (value < parent.value) {
                parent = parent.left;
            } else {
                parent = parent.right;
            }
        }

        // Delete leaf node
        if (node.isLeaf()) {
            if (parent.right === node) {
                parent.right = null;
            } else {
                parent.left = null;
            }
            return;
        }

        // Delete node with single child
        if (node.hasSingleChild()) {

            return;
        }
    }

    /*
        Returns the node at the position indicated by the
        list of 'right' and 'left' elements in the list.
    */
    path(list) {
        let cnode = this.root;
        for (let i = 0; i < list.length; i++) {
            cnode = (list[i] === 'left') ? cnode.left : cnode.right;
        }

        return cnode;
    }
}

class BNode {
    value;
    right;
    left;

    constructor(left, right, val) {
        this.right = right;
        this.left = left;
        this.value = val;
    }

    isLeaf() {
        return (this.left === null && this.right === null);
    }

    hasSingleChild() {
        return (this.left === null && this.right !== null) ||
               (this.right === null && this.left !== null)
    }

    hasTwoChildren() {
        return (this.left !== null && this.right !== null);
    }

    getSingleChild() {
        if (this.left !== null) {
            return this.left;
        } else {
            return this.right;
        }
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

module.exports = BinaryTree;