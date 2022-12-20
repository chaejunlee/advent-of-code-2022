import data from "./data.mjs";

const rows = data.split("\n");

const schedules = rows.map(row => row.split(",").map(element => element.split("-")));

const isOverlapping = (schedule) => {
  const a = schedule[0];
  const b = schedule[1];
  const aStart = parseInt(a[0]);
  const bStart = parseInt(b[0]);

  if (aStart > bStart) return isOverlapping([b, a]);

  const aEnd = parseInt(a[1]);
  const bEnd = parseInt(b[1]);

  if (aStart === bStart) return true;
  return bEnd <= aEnd;
}

// const part1 = schedules.reduce((acc, schedule) => {
//   if (isOverlapping(schedule)) {
//     acc++;
//   }
//   return acc;
// }, 0);

const isOverlappingAtAll = (schedule) => {
  const a = schedule[0];
  const b = schedule[1];
  const aStart = parseInt(a[0]);
  const bStart = parseInt(b[0]);

  if (aStart > bStart) return isOverlappingAtAll([b, a]);

  const aEnd = parseInt(a[1]);
  const bEnd = parseInt(b[1]);

  if (aStart === bStart) return true;
  return bStart <= aEnd;
}

const part2 = schedules.reduce((acc, schedule) => {
  if (isOverlappingAtAll(schedule)) {
    acc++;
  }
  return acc;
}, 0);

console.log(part2);
