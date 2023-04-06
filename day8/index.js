const { data } = require('./data');

const lines = data.split("\n").map(line => line.trim());

/**
 * There were a lot of repetitive for loops with tricky
 * conditions. Tweaking the conditions was a pain. I messed
 * up with syncing the conditions with the loops. I thought of
 * DRYing the code, but I didn't because I thought it would
 * take more time. I was wrong. I should have DRYed the code.
 * Finding the errors between code took way more time.
 * 
 * I learned how to make fixed length 2D arrays in JS using
 * Array.fill().
 */

const rows = lines.length;
const cols = lines[0].length;

const isVisible = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

function checkTree(y, x, highestTree) {
  const tree = Number(lines[y][x]);
  if (tree > highestTree) isVisible[y][x] = 1;
  return Math.max(tree, highestTree);
}

function FromLeft() {
  for (let i = 0; i < rows; i++) {
    let highestTree = -1;
    for (let j = 0; j < cols; j++) {
      highestTree = checkTree(i, j, highestTree);
    }
  }
}

function fromRight() {
  for (let i = 0; i < rows; i++) {
    let highestTree = -1;
    for (let j = cols - 1; j >= 0; j--) {
      highestTree = checkTree(i, j, highestTree);
    }
  }
}

function fromTop() {
  for (let i = 0; i < cols; i++) {
    let highestTree = -1;
    for (let j = 0; j < rows; j++) {
      highestTree = checkTree(j, i, highestTree);
    }
  }
}

function fromBottom() {
  for (let i = 0; i < cols; i++) {
    let highestTree = -1;
    for (let j = rows - 1; j >= 0; j--) {
      highestTree = checkTree(j, i, highestTree);
    }
  }
}

FromLeft();
fromRight();
fromTop();
fromBottom();

const visibleTrees = isVisible.reduce((acc, row) => {
  return acc + row.reduce((acc, col) => acc + col, 0);
}, 0);

// console.log(isVisible);
function toLeft(y, x) {
  const tree = lines[y][x];
  let count = 0;
  for (let i = x - 1; i >= 0; i--) {
    count++;
    if (tree <= lines[y][i]) return count;
  }
  return count;
}

function toRight(y, x) {
  const tree = lines[y][x];
  let count = 0;
  for (let i = x + 1; i < cols; i++) {
    count++;
    if (tree <= lines[y][i]) return count;
  }
  return count;
}

function toTop(y, x) {
  const tree = lines[y][x];
  let count = 0;
  for (let i = y - 1; i >= 0; i--) {
    count++;
    if (tree <= lines[i][x]) return count;
  }
  return count;
}

function toBottom(y, x) {
  const tree = lines[y][x];
  let count = 0;
  for (let i = y + 1; i < rows; i++) {
    count++;
    if (tree <= lines[i][x]) return count;
  }
  return count;
}

let highestScore = 0;
function fromTree() {
  for (let i = 1; i < rows - 1; i++) {
    for (let j = 1; j < cols - 1; j++) {
      let top = toTop(i, j);
      let left = toLeft(i, j);
      let bottom = toBottom(i, j);
      let right = toRight(i, j);
      const count = left * right * top * bottom;
      console.log(i, j, lines[i][j], top, left, bottom, right, count);
      if (count > highestScore) {
        highestScore = count;
      }
    }
  }
}
fromTree();
console.log(highestScore);

console.log(Array(lines[0]).reverse());

// 295 no
// 392 no

// 4080 no
// 5929 no
// 13090 no
// 4120956 no
// 3720600 no
// 3347344 no