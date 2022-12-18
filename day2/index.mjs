import { data } from './data.mjs';

const rounds = data.split("\n").map((round) => round.split(" "));

// rock: A, X => 1
// paper: B, Y => 2
// scissors: C, Z => 3

// win => 6
// draw => 3
// lose => 0

const gameMap = {
  "A": {
    "X": 3 + 1,
    "Y": 6 + 2,
    "Z": 0 + 3,
  },
  "B": {
    "X": 0 + 1,
    "Y": 3 + 2,
    "Z": 6 + 3,
  },
  "C": {
    "X": 6 + 1,
    "Y": 0 + 2,
    "Z": 3 + 3,
  },
};

const getGameResult = (round) => {
  const [player1, player2] = round;
  return gameMap[player1][player2];
}

const getGameResults = (rounds) => rounds.map(getGameResult);

const getGameScore = (gameResults) => gameResults.reduce((acc, result) => acc + result, 0);

const gameResults = getGameResults(rounds);
const gameScore = getGameScore(gameResults);

console.log(gameScore);