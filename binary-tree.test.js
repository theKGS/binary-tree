const BinaryTree = require('./binary-tree');

test('test 1', () => {
  let hmap = new BinaryTree([1,1,1,2,3]);
  expect(hmap.height(1)).toBe(0);
  expect(hmap.depth(2)).toBe(0);
});

test('test 2', () => {
  let hmap = new BinaryTree([1,2,3]);
  expect(hmap.height(2)).toBe(1);
  expect(hmap.depth(2)).toBe(2);
});