const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});

function solve(count) {
  let str = '';
  for (let i = 1; i <= count; i += 1) {
    str += `${'*'.repeat(i)}\n`;
  }
  console.log(str);
}

rl.on('close', () => {
  solve(lines[0]);
});
