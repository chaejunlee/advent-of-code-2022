import data from "./data.mjs";

/**
 * What can be improved:
 * 
 * 1. I don't like the nested forEach statements.
 * I think I can use some sort of find function
 * to find the corresponding character.
 * 
 * 2. I wasted so much time figuring out the logic
 * for getting priorities of each characters.
 * 
 * 3. I don't like the top level for loop.
 * I think that could be improved, too.
 * 
 * What I learned:
 * 
 * 1. I learned how to use the spread operator
 * to convert a string into an array of characters.
 * 
 * 2. I learned how to use the charCodeAt function
 * to get the ASCII code of a character.
 * 
 * 3. I learned how to use the slice function
 * to split a string into two halves.
 * 
 */


const rucksacks = data.split("\n");

// for each rucksack, split it into two halfs
const firstHalfs = rucksacks.map(rucksack => rucksack.slice(0, rucksack.length / 2));
const secondHalfs = rucksacks.map(rucksack => rucksack.slice(rucksack.length / 2));

const getPriority = (a) => {
  const aCode = a.charCodeAt(0) - "a".charCodeAt(0);
  if (aCode < 0)
    return a.charCodeAt(0) - "A".charCodeAt(0) + 26;
  return aCode;
}

// for each characters in the left half,
// find the corresponding character in the right half
let result = 0;

for (let i = 0; i < firstHalfs.length; i++) {
  let highChar = 0;
  const firstHalf = firstHalfs[i];
  const secondHalf = secondHalfs[i];

  [...firstHalf].forEach((first) => {
    const firstChar = getPriority(first) + 1;
    [...secondHalf].forEach((second) => {
      const secondChar = getPriority(second) + 1;
      if (firstChar !== secondChar) return;
      highChar = (highChar < firstChar) ? firstChar : highChar;
    });
  });
  result += highChar;
}

console.log("Part 1: " + result);

result = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
  const first = rucksacks[i];
  const second = rucksacks[i + 1];
  const third = rucksacks[i + 2];
  let highChar = 0;
  [...first].forEach((first) => {
    const firstChar = getPriority(first) + 1;
    [...second].forEach((second) => {
      const secondChar = getPriority(second) + 1;
      if (firstChar !== secondChar) return;
      [...third].forEach((third) => {
        const thirdChar = getPriority(third) + 1;
        if (secondChar !== thirdChar) return;
        highChar = (firstChar > highChar) ? firstChar : highChar;
      });
    });
  });
  result += highChar;
}

console.log("Part 2: " + result);