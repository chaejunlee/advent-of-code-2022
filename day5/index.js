'use strict';

const data = require('./data.js').data;

let crates = [
  [],
  ['D', 'L', 'J', 'R', 'V', 'G', 'F'],
  ['T', 'P', 'M', 'B', 'V', 'R', 'J', 'S'],
  ['V', 'H', 'M', 'F', 'D', 'G', 'P', 'C'],
  ['M', 'D', 'P', 'N', 'G', 'Q'],
  ['J', 'L', 'H', 'N', 'F'],
  ['N', 'F', 'V', 'Q', 'D', 'G', 'T', 'Z'],
  ['F', 'D', 'B', 'L'],
  ['M', 'J', 'B', 'S', 'V', 'D', 'N'],
  ['G', 'L', 'D']
]

let lines = data.split("\n").map(line => line.trim().split(" "));

const operations = lines.map(line => {
  return [line[1], line[3], line[5]].map(Number);
})

// operations.forEach(operation => {
//   const [amount, from, to] = operation;

//   for (let i = 0; i < amount; i++) {
//     crates[to].push(crates[from].pop())
//   }
// })

operations.forEach(operation => {
  const [amount, from, to] = operation;

  let movingItems = [];
  for (let i = 0; i < amount; i++) {
    movingItems.push(crates[from].pop())
  }

  movingItems.reverse().forEach(item => crates[to].push(item))
})

console.log(crates.map(crate => crate.reverse()[0]).join(""))