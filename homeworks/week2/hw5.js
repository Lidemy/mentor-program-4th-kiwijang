function join(arr, concatStr) {
  let result = '';
  for (let i = 0; i < arr.length; i += 1) {
    if (result) {
      result += concatStr;
    }
    result += arr[i];
  }
  return result;
}

function repeat(str, times) {
  const arr = [];
  for (let i = 0; i < times; i += 1) {
    arr.push(str);
  }
  return join(arr, '');
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
