const BinaryTree = require('./binary-tree');

test('test 1', () => {
  let btree = new BinaryTree([1, 1, 1, 2, 3]);
  expect(btree.height(1)).toBe(0);
  expect(btree.depth(2)).toBe(0);
});

test('test height 1', () => {
  let btree = new BinaryTree([1, 2, 3]);
  expect(btree.height(1)).toBe(0);
  expect(btree.height(2)).toBe(1);
  expect(btree.height(3)).toBe(0);
  expect(btree.height(4)).toBe(null);
});

test('test depth 1', () => {
  let btree = new BinaryTree([1, 2, 3]);
  expect(btree.depth(1)).toBe(1);
  expect(btree.depth(2)).toBe(0);
  expect(btree.depth(3)).toBe(1);
  expect(btree.depth(4)).toBe(null)
});

test('test rebalance', () => {
  let btree = new BinaryTree([1, 2, 3]);
  btree.rebalance();
  expect(btree.find(1)).not.toBeNull();
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(3)).not.toBeNull();
  expect(btree.values().length).toBe(3);
});

test('test imbalanced tree', () => {
  let btree = new BinaryTree([1]);
  btree.rawInsert(2);
  btree.rawInsert(3);
  btree.rawInsert(4);
  btree.rawInsert(5);
  expect(btree.height(1)).toBe(4);
  expect(btree.height(5)).toBe(0);
  expect(btree.depth(1)).toBe(0);
  expect(btree.depth(2)).toBe(1);
  expect(btree.depth(3)).toBe(2);
  expect(btree.depth(4)).toBe(3);
  expect(btree.depth(5)).toBe(4);
});

test('test level order traversal 1', () => {
  let btree = new BinaryTree([1, 2, 3, 4]);
  btree.levelOrderForEach((x) => {return x + 1})
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(3)).not.toBeNull();
  expect(btree.find(4)).not.toBeNull();
  expect(btree.find(5)).not.toBeNull();
  expect(btree.find(1)).toBeNull();
});

test('test level order traversal 2', () => {
  let btree = new BinaryTree([]);
  // Wrapping necessary when using toThrow
  expect(() => btree.levelOrderForEach()).toThrow();
});
