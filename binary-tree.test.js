const BinaryTree = require('./binary-tree');

test('test 1', () => {
  let btree = new BinaryTree([1,1,1,2,3]);
  expect(btree.height(1)).toBe(0);
  expect(btree.depth(2)).toBe(0);
});

test('test height 1', () => {
  let btree = new BinaryTree([1,2,3]);
  expect(btree.height(1)).toBe(0);
  expect(btree.height(2)).toBe(1);
  expect(btree.height(3)).toBe(0);
  expect(btree.height(4)).toBe(null);
});

test('test depth 1', () => {
  let btree = new BinaryTree([1,2,3]);
  expect(btree.depth(1)).toBe(1);
  expect(btree.depth(2)).toBe(0);
  expect(btree.depth(3)).toBe(1);
  expect(btree.depth(4)).toBe(null)
});

test('test rebalance', () => {
  let btree = new BinaryTree([1,2,3]);
  btree.rebalance();
  expect(btree.find(1)).not.toBeNull();
  expect(btree.find(2)).not.toBeNull();
  expect(btree.find(3)).not.toBeNull();
  expect(btree.values().length).toBe(3);
});