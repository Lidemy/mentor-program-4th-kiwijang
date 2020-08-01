const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(num) {
  if (num === 1) {
    return false;
  }
  for (let i = 2; i < num; i += 1) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(linesArr) {
  linesArr.forEach((x, index) => {
    if (index !== 0) {
      const result = isPrime(Number(x)) ? 'Prime' : 'Composite';
      console.log(result);
    }
  });
}

rl.on('close', () => {
  solve(lines);
});
