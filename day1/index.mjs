import { data } from './data.mjs';

const elfs = data.split("\n\n");

const addAllCalories = (acc, calorie) => acc + parseInt(calorie);
const splitByNewLine = (carrying) => carrying.split("\n").reduce(addAllCalories, 0);
const calories = elfs.map(splitByNewLine);

const sortedCalories = calories.sort().reverse();
console.log(sortedCalories[0] + sortedCalories[1] + sortedCalories[2]);
