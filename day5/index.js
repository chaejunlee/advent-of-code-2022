'use strict';

const data = require('./data.js').data;

/**
 * What can be improved
 * 
 * 1. I thought I could work on the input, but
 * I think hard coding the crates is better.
 * 
 * 2. I changed the javascript format from .mjs to .js
 * because I thought CommonJS is more closer to vanilla JS.
 * 
 * 3. I used for loop to iterate the array. I think
 * I could use forEach() or map() to improve the code.
 *  => I think using for loop is pretty readable compared
 * to other solutions I found online.
 * 
 * 4. Now I am coding just to get the result. When I
 * searched on the reddit, there were some efficient 
 * solutions, too. It would be better to figure out
 * the most efficient algorithm as well. However, I
 * think the goal of this challenge is to solve it in
 * any way possible, in a short period time. I will
 * stick to this goal for now.
 * 
 * What I learned
 * 
 * 1. I can use trim() to remove the empty spaces from the
 * front and back of a string.
 * 
 * 2. I used push(), pop(), shift() and unshift() to insert
 * and remove items from the array. Need more study on the
 * built-in array methods.
 * 
 * 3. I used reverse()[0] to get the last item of the array.
 * I should have used something like pop() or other method
 * to get the last item of the array. => I used .at(-1)
 * 
 * 4. I tried to use for-of loop to iterate the array.
 * I think for loop used correctly increases the readability.
 * 
 * 5. I used map().join() to convert the result array to string.
 * 
 */

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
];

let lines = data.split("\n").map(line => line.trim().split(" "));

const operations = lines.map(line => [line[1], line[3], line[5]].map(Number))

operations.forEach(([amount, from, to]) => {
  for (let i = 0; i < amount; i++)
    crates[to].push(crates[from].pop())
})

console.log("Part 1: " + crates.map(crate => crate.at(-1)).join(""))

crates = [
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

operations.forEach(([amount, from, to]) => {
  let movingItems = [];
  for (let i = 0; i < amount; i++)
    movingItems.unshift(crates[from].pop());

  for (const item of movingItems)
    crates[to].push(item)
  // movingItems.forEach(item => crates[to].push(item));
})
// console.log(crates);
console.log("Part 2: " + crates.map(crate => crate.at(-1)).join(""))