const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});

function isNarc(i) {
  if (i >= 1 && i <= 9) {
    return true;
  }
  const iArr = String(i).split('');
  const result = iArr.map((x) => x ** String(i).length)
    .reduce((front, cur) => front + cur);
  if (result === i) {
    return true;
  }
  return false;
}

function solve(line) {
  const [inputNum1, inputNum2] = line.split(' ').map((x) => Number(x));

  for (let i = inputNum1; i <= inputNum2; i += 1) {
    if (isNarc(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines[0]);
});
