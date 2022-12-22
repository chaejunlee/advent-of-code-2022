const data = require('./data.js').data;

/**
 * What can be improved:
 * 
 * 1. I want to cut it under 10 minute mark.
 * I think I should ignore the explanatory sentences
 * and just go for the inputs and outputs.
 * 
 * 2. Places where I used for-loops could be improved,
 * by using array methods. Though, I am not sure how to.
 * I think the code is pretty readable.
 * 
 * 3. I used subroutine as plain object. I think I could
 * use Map instead. I think using Map would be more appropriate
 * in this case.
 * 
 * 4. Moving from part 1 to part 2 was pretty smooth this time.
 * It was pretty awesome.
 * 
 * 5. The place where I used checker could be improved. I think
 * I could have used filter or other methods to improve the 
 * code.
 * 
 * What I learned:
 * 
 * 1. I used Map() to store the character and its count. Using
 * Map() reduced the code length and increased the readability.
 * The charchecker and the for-loop were replaced by a single
 * line of code, subroutine.size. Awesome.
 */

function signalChecker(signal, length) {
  let startMarker = -1;
  for (let i = 0; i < signal.length; i++) {
    let subroutine = new Map();
    for (let j = 0; j < length; j++) {
      const char = signal[i + j];
      if (subroutine.has(char))
        subroutine.set(char, subroutine.get(char) + 1);
      else subroutine.set(char, 1);
    }
    // console.log(subroutine, charCounter);
    if (subroutine.size === length)
      return startMarker = i + length;
  }
  return startMarker; // probably -1
}

console.log(signalChecker(data, 4), signalChecker(data, 14));

// Part 1: 00:14:20
// Part 2: 00:16:46