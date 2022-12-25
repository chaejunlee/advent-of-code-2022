const { data } = require('./data');

const lines = data.split("\n").map(line => line.trim());
// console.log(lines);

const rows = lines.length;
const cols = lines[0].length;

// console.log(rows, cols);

const isVisible = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

function FromLeft() {
  for (let i = 0; i < rows; i++) {
    let highestTree = -1;
    for (let j = 0; j < cols; j++) {
      const tree = Number(lines[i][j]);
      if (tree > highestTree) {
        highestTree = tree;
        isVisible[i][j] = 1;
      }
    }
  }
}

function fromRight() {
  for (let i = 0; i < rows; i++) {
    let highestTree = -1;
    for (let j = cols - 1; j >= 0; j--) {
      const tree = Number(lines[i][j]);
      if (tree > highestTree) {
        highestTree = tree;
        isVisible[i][j] = 1;
      }
    }
  }
}

function fromTop() {
  for (let i = 0; i < cols; i++) {
    let highestTree = -1;
    for (let j = 0; j < rows; j++) {
      const tree = Number(lines[j][i]);
      if (tree > highestTree) {
        highestTree = tree;
        isVisible[j][i] = 1;
      }
    }
  }
}

function fromBottom() {
  for (let i = 0; i < cols; i++) {
    let highestTree = -1;
    for (let j = rows - 1; j >= 0; j--) {
      const tree = Number(lines[j][i]);
      if (tree > highestTree) {
        highestTree = tree;
        isVisible[j][i] = 1;
      }
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

// 295 no
// 392 no

// 4080 no
// 5929 no
// 13090 no
// 4120956 no
// 3720600 no
// 3347344 no