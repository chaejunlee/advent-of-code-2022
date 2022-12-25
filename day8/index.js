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

console.log(isVisible);

console.log(visibleTrees);

// 295 no
// 392 no