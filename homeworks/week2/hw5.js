function join(arr, concatStr) {
    let result = '';
    for (let i = 0; i < arr.length; i++) {
        if (result) {
            result += concatStr;
        }
        result += arr[i];
    }
    return result;
}

function repeat(str, times) {
    let arr = [];
    for (let i = 0; i < times; i++) {
        arr.push(str)
    }
    return join(arr, '');
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));