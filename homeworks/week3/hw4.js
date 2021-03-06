const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});

function isPalindrome(str) {
  const reverseStr = str.split('').reverse().join('');
  return str === reverseStr;
}

function solve(inputline) {
  console.log(isPalindrome(inputline) ? 'True' : 'False');
}

rl.on('close', () => {
  solve(lines[0]);
});
