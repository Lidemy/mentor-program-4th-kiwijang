// split push pop join
function reverse(str) {
    const arr = [];
    const strArr = str.split('');
    for (let i = 0; i < str.length; i++) {
        arr.push(strArr.pop());
    }
    console.log(arr.join(''));
}

reverse('hello');

// 迴圈倒著做就好
function reverse(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }
  console.log(result);
}

reverse('hello');