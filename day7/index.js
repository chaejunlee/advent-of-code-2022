const data = require('./data.js').data;

// cd * ls => everything in the current directory
// cd .. can be ignored?

const lines = data.split("\n").map(line => line.trim());

// strcuture
// name of current directory
// pointer to parent directory
// pointers to child directories

let answer = 0;

function makeNode(start) {
  const node = { _size: 0 };
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("$ cd")) {
      return { index: i - 1, node };
    }

    const words = line.split(" ");
    if (words[0] === "dir")
      node[words[1]] = 0;
    else
      node._size += Number(words[0]);
  }
  return { index: lines.length - 1, node };
}

function makeTree(parent, dirname, start) {
  let root = { parent: parent, current: dirname, child: {}, _size: 0, index: start };
  let words = {};
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    // console.log(i);
    if (line.startsWith("$ ls")) {
      const newNode = makeNode(i + 1);
      root.child = newNode.node;
      i = newNode.index;
      continue;
    }
    if (line.startsWith("$ cd ..")) {
      root.index = i;
      return root;
    }
    if (line.startsWith("$ cd")) {
      words = line.split(" ");
      const result = makeTree(root.current, words[2], i + 1);

      root.child[words[2]] = result.child;
      i = result.index;
      continue;
    }
  }
  root.index = lines.length - 1;
  return root;
}

const root = makeTree(null, '/', 1);

function dfs(node) {
  for (const key in node) {
    if (key === '_size') continue;
    node._size += dfs(node[key]);
  }
  if (node._size <= 100_000)
    answer += node._size;
  //console.log(node)
  return node._size;
}

for (const key in root.child) {
  if (key === '_size') continue;
  const size = dfs(root.child[key]);
  if (size <= 100_000) answer += size;
  root._size += size;
}

console.log(answer);

console.dir(root._size - 40_000_000);

let minSize = 70_000_000;

function checkSize(node) {
  for (const key in node) {
    if (key === '_size') {
      const size = node[key];
      console.log(size)
      if (size >= (root._size - 40_000_000) && size <= minSize)
        minSize = size;
    }
    checkSize(node[key]);
  }
}
checkSize(root.child)
console.log(minSize);

// not 19628923