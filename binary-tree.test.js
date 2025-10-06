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


test('in order traversal basic', () => {
  const mockAddOne = jest.fn(x => {
    // clone is necessary to prevent mutation of the argument
    let clone = structuredClone(x);
    clone.value += 1; return clone
  });

  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.inOrderForEach(mockAddOne);
  expect(mockAddOne.mock.calls).toHaveLength(4);
  expect(mockAddOne.mock.calls[0][0].value).toBe(1);
  expect(mockAddOne.mock.calls[1][0].value).toBe(2);
  expect(mockAddOne.mock.calls[2][0].value).toBe(3);
  expect(mockAddOne.mock.calls[3][0].value).toBe(4);
});

test('level order traversal basic', () => {
  const mockAddOne = jest.fn(x => {
    // clone is necessary to prevent mutation of the argument
    let clone = structuredClone(x);
    clone.value += 1; return clone
  });

  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.levelOrderForEach(mockAddOne);
  expect(mockAddOne.mock.calls).toHaveLength(4);
  expect(mockAddOne.mock.calls[0][0].value).toBe(3);
  expect(mockAddOne.mock.calls[1][0].value).toBe(2);
  expect(mockAddOne.mock.calls[2][0].value).toBe(4);
  expect(mockAddOne.mock.calls[3][0].value).toBe(1);
});

test('pre order traversal basic', () => {
  const mockAddOne = jest.fn(x => {
    // clone is necessary to prevent mutation of the argument
    let clone = structuredClone(x);
    clone.value += 1; return clone
  });

  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.preOrderForEach(mockAddOne);
  expect(mockAddOne.mock.calls).toHaveLength(4);
  expect(mockAddOne.mock.calls[0][0].value).toBe(3);
  expect(mockAddOne.mock.calls[1][0].value).toBe(2);
  expect(mockAddOne.mock.calls[2][0].value).toBe(1);
  expect(mockAddOne.mock.calls[3][0].value).toBe(4);
});

test('post order traversal basic', () => {
  const mockAddOne = jest.fn(x => {
    // clone is necessary to prevent mutation of the argument
    let clone = structuredClone(x);
    clone.value += 1; return clone
  });

  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.postOrderForEach(mockAddOne);
  expect(mockAddOne.mock.calls).toHaveLength(4);
  expect(mockAddOne.mock.calls[0][0].value).toBe(1);
  expect(mockAddOne.mock.calls[1][0].value).toBe(2);
  expect(mockAddOne.mock.calls[2][0].value).toBe(4);
  expect(mockAddOne.mock.calls[3][0].value).toBe(3);
});

test('throw error: level order traversal', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.levelOrderForEach()).toThrow();
});

test('throw error: in order traversal', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.inOrderForEach()).toThrow();
});

test('throw error: pre order traversal', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.preOrderForEach()).toThrow();
});

test('throw error: post order traversal', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.postOrderForEach()).toThrow();
});





test('delete root with no children', () => {
  let btree = new BinaryTree([1]);
  btree.delete(1);
  expect(btree.find(1)).toBeNull();
});

test('delete root with one left child', () => {
  let btree = new BinaryTree([1, 2]);
  btree.delete(2);
  expect(btree.find(1)).not.toBeNull();
  expect(btree.find(2)).toBeNull();
});

test('delete root with one right child', () => {
  let btree = new BinaryTree([1]);
  btree.insert(2)
  btree.delete(1);
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(1)).toBeNull();
});

test('delete root with two children 1', () => {
  let btree = new BinaryTree([1, 2, 3]);
  btree.delete(2);
  expect(btree.find(1)).not.toBeNull();
  expect(btree.find(2)).toBeNull();
  expect(btree.find(3)).not.toBeNull();
});

test('delete root with two children 2', () => {
  let btree = new BinaryTree([1, 2, 3, 4, 5, 6, 7]);
  btree.delete(4);
  expect(btree.find(4)).toBeNull();
});

test('delete node not in tree', () => {
  let btree = new BinaryTree([1]);
  btree.delete(4);
  expect(btree.find(1)).not.toBeNull();
  expect(btree.find(4)).toBeNull();
});

test('delete node from empty tree', () => {
  let btree = new BinaryTree([]);
  btree.delete(1);
  expect(btree.find(1)).toBeNull();
});