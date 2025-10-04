const BinaryTree = require('./binary-tree');

test('height and depth 1', () => {
  let btree = new BinaryTree([1, 1, 1, 2, 3]);
  expect(btree.height(1)).toBe(0);
  expect(btree.depth(2)).toBe(0);
  expect(btree.path([]).value).toBe(2);
  expect(btree.path(['left']).value).toBe(1);
  expect(btree.path(['right']).value).toBe(3);
});

test('height 1', () => {
  let btree = new BinaryTree([1, 2, 3]);
  expect(btree.height(1)).toBe(0);
  expect(btree.height(2)).toBe(1);
  expect(btree.height(3)).toBe(0);
  expect(btree.height(4)).toBe(null);
});

test('depth 1', () => {
  let btree = new BinaryTree([1, 2, 3]);
  expect(btree.depth(1)).toBe(1);
  expect(btree.depth(2)).toBe(0);
  expect(btree.depth(3)).toBe(1);
  expect(btree.depth(4)).toBe(null)
});

test('rebalance', () => {
  let btree = new BinaryTree([1, 2, 3]);
  btree.rebalance();
  expect(btree.find(1)).not.toBeNull();
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(3)).not.toBeNull();
  expect(btree.values().length).toBe(3);
});

test('imbalanced tree 1', () => {
  let btree = new BinaryTree([1]);
  btree.insert(2);
  btree.insert(3);
  btree.insert(4);
  btree.insert(5);
  expect(btree.height(1)).toBe(4);
  expect(btree.height(5)).toBe(0);
  expect(btree.depth(1)).toBe(0);
  expect(btree.depth(2)).toBe(1);
  expect(btree.depth(3)).toBe(2);
  expect(btree.depth(4)).toBe(3);
  expect(btree.depth(5)).toBe(4);
});

test('imbalanced tree 2', () => {
  let btree = new BinaryTree([1]);
  expect(btree.isBalanced()).toBe(true);
  btree.insert(2);
  expect(btree.isBalanced()).toBe(true);
  btree.insert(3);
  expect(btree.isBalanced()).toBe(false);
  btree.insert(4);
  expect(btree.isBalanced()).toBe(false);
});

test('level order traversal 1', () => {
  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.levelOrderForEach((x) => { x.value = x.value + 1; return x });
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(3)).not.toBeNull();
  expect(btree.find(4)).not.toBeNull();
  expect(btree.find(5)).not.toBeNull();
  expect(btree.find(0)).toBeNull();
});

test('level order traversal 2', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.levelOrderForEach()).toThrow();
});

test('in order traversal 1', () => {
  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.inOrderForEach((x) => { x.value = x.value + 1; return x });
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(3)).not.toBeNull();
  expect(btree.find(4)).not.toBeNull();
  expect(btree.find(5)).not.toBeNull();
  expect(btree.find(0)).toBeNull();
});

test('in order traversal 2', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.inOrderForEach()).toThrow();
});

test('in order traversal 3', () => {
  let btree = new BinaryTree([1, 2, 3]);
  // Add the values of the left and right child to the value of each node
  btree.inOrderForEach((x) => {
    let rval = ((x.right !== null) ? x.right.value : 0);
    let lval = ((x.left !== null) ? x.left.value : 0);
    x.value += lval + rval;
    return x
  });
  expect(btree.path(['left']).value).toBe(1);
  expect(btree.path([]).value).toBe(6);
  expect(btree.path(['right']).value).toBe(3);
});



test('pre order traversal 1', () => {
  let btree = new BinaryTree([1, 2, 3]);
  // Add the values of the left and right child to the value of each node
  btree.preOrderForEach((x) => {
    let rval = ((x.right !== null) ? x.right.value : 0);
    let lval = ((x.left !== null) ? x.left.value : 0);
    x.value += lval + rval;
    return x
  });
  expect(btree.path(['left']).value).toBe(1);
  expect(btree.path([]).value).toBe(6);
  expect(btree.path(['right']).value).toBe(3);
});

test('pre order traversal 2', () => {
  let btree = new BinaryTree([1, 2, 3]);
  // Add the values of the left and right child to the value of each node
  btree.preOrderForEach((x) => {
    let rval = ((x.right !== null) ? x.right.value : 0);
    let lval = ((x.left !== null) ? x.left.value : 0);
    x.value += lval + rval;
    return x
  });
  expect(btree.path(['left']).value).toBe(1);
  expect(btree.path([]).value).toBe(6);
  expect(btree.path(['right']).value).toBe(3);
});
