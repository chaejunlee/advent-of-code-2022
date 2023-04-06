const data = require('./data.js');

/**
 * if head moves, tail has to move too.
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

let knots = [
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
  { y: 0, x: 0 },
];
let checker = new Set();
checker.add(JSON.stringify(knots[9]));

for (const dir_char of moves) {
  const direction = dir[dir_char.direction];
  for (let i = 0; i < dir_char.move; i++) {
    knots[0].x += direction.x;
    knots[0].y += direction.y;

    for (let knot = 1; knot <= 9; knot++) {
      const yDiff = (knots[knot - 1].y - knots[knot].y);
      const xDiff = (knots[knot - 1].x - knots[knot].x);

      if (Math.abs(yDiff) <= 1 && Math.abs(xDiff) <= 1) {
        continue;
      }

      const yMove = yDiff == 0 ? 0 : yDiff < 0 ? -1 : 1;
      const xMove = xDiff == 0 ? 0 : xDiff < 0 ? -1 : 1;

      // calculating this part was awful
      // I thought it was just copy pasting previous points, but it was not.
      // need to do some serious calculations
      knots[knot].x += xMove;
      knots[knot].y += yMove;
    }
    checker.add(JSON.stringify(knots[9]));
  }
}

console.log(checker.size);