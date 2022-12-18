import data from "./data.mjs";

const rucksacks = data.split("\n");

// for each rucksack, split it into two halfs
const firstHalfs = rucksacks.map(rucksack => rucksack.slice(0, rucksack.length / 2));
const secondHalfs = rucksacks.map(rucksack => rucksack.slice(rucksack.length / 2));

// console.log(firstHalfs[0].length, secondHalfs[0].length);

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
  const firstHalf = firstHalfs[i];
  const secondHalf = secondHalfs[i];
  let highChar = 0;
  for (let k = 0; k < firstHalf.length; k++) {
    const first = getPriority(firstHalf[k]) + 1;
    for (let l = 0; l < secondHalf.length; l++) {
      const second = getPriority(secondHalf[l]) + 1;
      if (first === second) {
        highChar = (highChar < first) ? first : highChar;
      }
    }
  }
  result += highChar;
}

console.log(result);