const data = require('./data').data;

const lines = data.split("\n").map(line => line.trim());

/**
 * I thought of the algorithm correctly, but I was stupid
 * enough that I could not implement it correctly.
 * 
 * Very unimpressed with myself.
 *  
 * */

const DecimalsToSNAFU = (decimal) => {
  let minus = false;
  const snafu = [];
  while (decimal > 1n) {
    const remainder = decimal % 5n;
    switch (remainder) {
      case 0n:
        snafu.push('0');
        minus = false;
        break;
      case 1n:
        snafu.push('1');
        minus = false;
        break;
      case 2n:
        snafu.push('2');
        minus = false;
        break;
      case 3n:
        snafu.push('=');
        minus = true;
        break;
      case 4n:
        snafu.push('-');
        minus = true;
        break;
      default:
    }
    decimal = (decimal) / 5n;
    if (decimal === 0n) {
      if (minus) snafu.push('1');
      break;
    }
    if (minus) decimal += 1n;
  }
  snafu.reverse();
  return snafu.join('');
}

const SNAFUToDecimals = (snafu) => {
  let decimal = BigInt(snafu[0]);
  for (let i = 1; i < snafu.length; i++) {
    switch (snafu[i]) {
      case '=':
        decimal = decimal * 5n - 2n;
        break;
      case '-':
        decimal = decimal * 5n - 1n;
        break;
      case '0':
        decimal = decimal * 5n;
        break;
      case '1':
        decimal = decimal * 5n + 1n;
        break;
      case '2':
        decimal = decimal * 5n + 2n;
        break;
      default:
    }
  }
  return decimal;
}

let sumOfSNAFUs = 0n;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  sumOfSNAFUs += SNAFUToDecimals(line);
  console.log(line, sumOfSNAFUs);
}

console.log(DecimalsToSNAFU(sumOfSNAFUs));

// 21--01-0=2101000-12-

// 12345 -> 0
// 2469 / 5 = 493 ... 4 -> -1
// 494 / 5 = 98 ... 4 -> -1
// 99 / 5 = 19 ... 4 -> -1
// 20 / 5 = 4 ... 0 -> 0
// 4 / 5 = 0 ... 4 -> -1

// 98 / 5 = 19 ... 3
// 19 / 5 = 3 ... 4
// 3 / 5 = 0 ... 3
