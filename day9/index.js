const data = require('./data.js');

/**
 * if head moves, tail has to move too.
 * 
 */

const lines = data.split('\n');
const moves = lines.map(line => {
  let [direction, move] = line.split(' ')
  return { direction, move }
});

const dir = {
  'U': { x: 0, y: -1 },
  'D': { x: 0, y: 1 },
  'L': { x: -1, y: 0 },
  'R': { x: 1, y: 0 }
}

let head = { y: 0, x: 0 };
let tail = { y: 0, x: 0 };
let checker = new Set();
checker.add(JSON.stringify(tail));

for (const dir_char of moves) {
  const direction = dir[dir_char.direction];
  for (let i = 0; i < dir_char.move; i++) {
    const prevHead = { ...head };
    head.x += direction.x;
    head.y += direction.y;

    const yDiff = Math.abs(head.y - tail.y);
    const xDiff = Math.abs(head.x - tail.x);

    if (yDiff <= 1 && xDiff <= 1) {
      continue;
    }
    tail = prevHead;
    checker.add(JSON.stringify(tail));
  }
}

console.log(checker.size);