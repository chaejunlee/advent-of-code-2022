const data = require('./data.js').data;

let result = 0;

for (let i = 0; i < data.length; i++) {
  let subroutine = {};
  for (let j = 0; j < 4; j++) {
    if (subroutine[data[i + j]] === undefined) subroutine[data[i + j]] = 1;
    else subroutine[data[i + j]]++;
  }
  let checker = 0;
  for (const key in subroutine) {
    if (subroutine[key] > 1) break;
    checker++;
  }
  console.log(subroutine, checker);
  if (checker === 4) result = i + 3;
  if (result !== 0) break;
}
// 00:14:20
console.log(result);

result = 0;

for (let i = 0; i < data.length; i++) {
  let subroutine = {};
  for (let j = 0; j < 14; j++) {
    if (subroutine[data[i + j]] === undefined) subroutine[data[i + j]] = 1;
    else subroutine[data[i + j]]++;
  }
  let checker = 0;
  for (const key in subroutine) {
    if (subroutine[key] > 1) break;
    checker++;
  }
  console.log(subroutine, i);
  if (checker === 14) result = i + 14;
  if (result !== 0) break;
}
// 16:46
console.log(result);