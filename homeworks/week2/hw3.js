function reverse(str) {
    const arr = [];
    const strArr = str.split('');
    for (let i = 0; i < str.length; i++) {
        arr.push(strArr.pop());
    }
    console.log(arr.join(''));
}

reverse('hello');
