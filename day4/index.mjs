import data from "./data.mjs";

const rows = data.split("\n");

/**
 * What can be improved:
 * 
 * 1. I found online that many people use RegExp
 * to pares the data. Maybe I should try that.
 * Parsing these data would be a great RegExp exercise.
 * 
 * 2. Making the parameters of the recursive function
 * bugged me. I think I could improve that.
 * 
 * 3. I thought my algorithm was right, but it was not.
 * I missed the case where if the start time of first
 * and the second are the same which is an overlap.
 * 
 * 4. There is a count_nonzero function in numpy.
 * I think I could use that kind of function
 * to improve the code. => I did it with using truthy values.
 * 
 * What I learned:
 * 
 * 1. I learned that adding .map(Number) to the end
 * of a map function will convert the array of strings
 * into an array of numbers.
 * 
 * 2. I tried to use recursive function to solve this problem.
 * However, I struggled with the parameters.
 * 
 * 3. I tried to DRY the code by passing a function as a 
 * parameter. I think it worked well. I could never do that
 * on the real test, but still it was a good DRY exercise.
 * 
 */

const schedules = rows.map(row => row.split(",").map(element => element.split("-").map(Number)));

const strongCondition = ([aStart, aEnd], [bStart, bEnd]) => bEnd <= aEnd;
const weakCondition = ([aStart, aEnd], [bStart, bEnd]) => bStart <= aEnd;

const isOverlapping = (schedule, endCondition) => {
  const [a, b] = schedule;

  const aStart = parseInt(a[0]);
  const bStart = parseInt(b[0]);

  if (aStart > bStart) return isOverlapping([b, a], endCondition);

  if (aStart === bStart) return true;

  return endCondition(a, b);
}

const part1 =
  schedules
    .map(schedule => isOverlapping(schedule, strongCondition))
    .reduce((acc, value) => acc + value, 0);

const part2 =
  schedules
    .map(schedule => isOverlapping(schedule, weakCondition))
    .reduce((acc, value) => acc + value, 0);

console.log(part1, part2);
