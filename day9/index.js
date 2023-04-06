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
let tracer = new Set();
tracer.add(JSON.stringify(knots[9]));

const follow = (knot) => {
  const prev = knots[knot - 1];
  const curr = knots[knot];
  const yDiff = (prev.y - curr.y);
  const xDiff = (prev.x - curr.x);

  if (Math.abs(yDiff) <= 1 && Math.abs(xDiff) <= 1) {
    return;
  }
  // calculating this part was awful
  // I thought it was just copy pasting previous points, but it was not.
  // need to do some serious calculations
  const yMove = yDiff == 0 ? 0 : yDiff < 0 ? -1 : 1;
  const xMove = xDiff == 0 ? 0 : xDiff < 0 ? -1 : 1;

  curr.x += xMove;
  curr.y += yMove;
}

const updateTracer = () => {
  tracer.add(JSON.stringify(knots[9]));
}

const moveHead = (direction) => {
  const head = knots[0];
  head.x += direction.x;
  head.y += direction.y;
}

moves.forEach(({ direction, move }) => {
  for (let i = 0; i < move; i++) {
    moveHead(dir[direction]);
    for (let knot = 1; knot <= 9; knot++) {
      follow(knot);
      updateTracer();
    }
  }
});

console.log(tracer.size);