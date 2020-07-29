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
  const playerALen = x[0].length;
  const playerBLen = x[1].length;
  const biggerWin = x[2];
  // 字串長度相等
  if (playerALen === playerBLen) {
    // 且每個字都一樣
    if (playerA === playerB) {
      return 'DRAW';
      // 比字典序 '0' < '1' < '2' < ... < '9' < 'a' < 'b' < ... < 'z'
    }
    if ((biggerWin && playerA > playerB) || (!biggerWin && playerA < playerB)) {
      return 'A';
    }
  }
  // 字串長度不相等，比長度
  if ((biggerWin && playerALen > playerBLen) || (!biggerWin && playerALen < playerBLen)) {
    return 'A';
  }
  return 'B';
}

function solve(inputlines) {
  inputlines.shift();
  const arr = inputlines.map((game) => {
    const gameArr = game.split(' ');
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
