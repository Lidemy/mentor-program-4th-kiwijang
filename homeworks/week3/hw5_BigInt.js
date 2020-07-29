
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});
function whoWin(x) {
  const playerA = x[0];
  const playerB = x[1];
  const biggerWin = x[2];
  if (playerA === playerB) {
    return 'DRAW';
  }
  if ((biggerWin && playerA > playerB) || (!biggerWin && playerA < playerB)) {
    return 'A';
  }
  return 'B';
}
/* global BigInt */
function solve(inputlines) {
  inputlines.shift();
  const arr = inputlines.map((game) => {
    const gameArr = game.split(' ');
    gameArr[0] = BigInt(gameArr[0]);
    gameArr[1] = BigInt(gameArr[1]);
    gameArr[2] = gameArr[2] === '1';
    return gameArr;
  });
  arr.forEach((x) => {
    console.log(whoWin(x));
  });
}

rl.on('close', () => {
  solve(lines);
});
