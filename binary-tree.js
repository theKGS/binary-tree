class BinaryTree {
    root;

    constructor(arr) {
        this.root = BinaryTree.buildTree(arr);
    }

    static buildTree(array) {
        // Set() converts array to set which removes duplicates
        array = [...new Set(array)];
        array.sort( (a, b) => {return a - b}); // to sort properly
        console.log(array);
        return BinaryTree.recBuild(array);
    }

    static recBuild(array) {
        if (array.length === 0) {
            return null
        };

        console.log("array " + array);

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
        while(true) {
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


b = new BinaryTree([1, 2, 3, 4, 51, 12, 5, 6, 7]);
prettyPrint(b.root);
console.log(b.depth(51));
console.log(b.depth(12));
console.log(b.depth(4));
console.log(b.depth(69));