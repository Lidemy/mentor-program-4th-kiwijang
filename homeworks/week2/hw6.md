``` javascript
function isValid(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= 0) return 'invalid'
    }
    for (var i = 2; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1] + arr[i - 2]) return 'invalid'
    }
    return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 通常 js 引擎會在正式執行前先進行一次預編譯，將函數宣告提升(hoisting)到當前作用域頂端。
預編譯找到有 `function` 的地方，知道有一個帶有參數且名為 isValid(arr) 函式。
2. 執行第 12 行，呼叫 isValid() 函式並傳入參數 [3,5,8,13,22,35]。
3. 執行第 2 行，帶入參數。

---

4. 執行第 3 行，跑 for 迴圈，迴圈裡初始值 var 宣告了一個 i = 0 (i 為 0)，條件為 i < arr.length (i 要小於參數 arr 陣列的長度)
5. 執行第 4 行，目前 i = 0 ，跑 if 條件， arr[0] <= 0 嗎? (根據參數 arr 的值 arr[0] = 3)， 3 <= 0 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 5 行，此次迴圈結束。
7. 執行第 3 行，目前 i = 0，0 < 6 (i < arr.length) 成立，執行 i++ (0=0+1)，i 為 1。
8. 執行第 4 行，arr[1] <= 0 (5 <= 0)嗎? 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 5 行，此次迴圈結束。
7. 執行第 3 行，目前 i = 1，1 < 6 (i < arr.length) 成立，，執行 i++ (1=1+1)，i 為 2。
8. 執行第 4 行，arr[2] <= 0 (8 <= 0)嗎? 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 5 行，此次迴圈結束。
7. 執行第 3 行，目前 i = 2，2 < 6 (i < arr.length) 成立，，執行 i++ (2=2+1)，i 為 3。
8. 執行第 4 行，arr[3] <= 0 (13 <= 0)嗎? 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 5 行，此次迴圈結束。
7. 執行第 3 行，目前 i = 3，3 < 6 (i < arr.length) 成立，，執行 i++ (3=3+1)，i 為 4。
8. 執行第 4 行，arr[4] <= 0 (22 <= 0)嗎? 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 5 行，此次迴圈結束。
7. 執行第 3 行，目前 i = 4，4 < 6 (i < arr.length) 成立，，執行 i++ (4=4+1)，i 為 5。
8. 執行第 4 行，arr[5] <= 0 (35 <= 0)嗎? 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 5 行，此次迴圈結束。

---
22. 執行第 6 行，目前 i = 2，2 < 6 (i < arr.length) 成立，，執行 i++ (2=2+1)，i 為 3。
8. 執行第 7 行，arr[i] !== arr[i-1] + arr[i-2] (arr[3] !== arr[2] + arr[1]，13 !== 8 + 5) 嗎? 不成立，程式沒進入條件區塊並離開第 4 行。
6. 執行第 8 行，此次迴圈結束。
7. 執行第 6 行，目前 i = 3，3 < 6 (i < arr.length) 成立，，執行 i++ (3=3+1)，i 為 4。
8. 執行第 7 行，arr[4] !== arr[3] + arr[2] (22 !== 13 + 8) 嗎? 成立，程式進入條件區塊，return 'invalid'，退出條件，退出 for 迴圈，退出函式。
9. 執行第 10 行，執行完畢。

---

## 挑戰題

現在有一個排序好的陣列 arr，裡面的元素都是正整數而且保證不會重複。

給你一個數字 n，請寫出一個函式 search 回傳 n 在這個陣列裡面的 index，沒有的話請回傳 -1。
[LIOJ 1047](https://oj.lidemy.com/problem/1047)

- [LIOJ 1047 - 循序搜尋法](https://oj.lidemy.com/status/a809d85344b66968b27e6a87bdd7951b)
- [我的 LIOJ 1047 - 二分搜尋法](https://oj.lidemy.com/status/5d7878d2ea7458f238f30fdd1eb38fef)

#### 二分搜尋法

``` javascript

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
});

var lines = [];

rl.on("line", function (line) {
    lines.push(line);
});

rl.on("close", function () {
    solve(lines);
});

function solve(lines) {
    let [n, m] = lines[0].split(" ");
    let arrA = [];
    for (let i = 0; i < n; i++) {
        arrA[i] = Number(lines[i + 1]);
    }
    n = Number(n);
    for (let i = n + 1; i < lines.length; i++) {
        let p = Number(lines[i]);
        console.log(search(arrA, p));
    }
}

function search(A, P) {
    let l = 0;
    let r = A.length - 1;
    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        if (A[m] === P) {
            return m;
        } else if (A[m] > P) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    return -1;
}
```
參考資料
- [淺談二分搜尋法 - huli](https://blog.techbridge.cc/2016/09/24/binary-search-introduction/)
- [JavaScript 四捨五入、無條件捨去、無條件進位](http://www.eion.com.tw/Blogger/?Pid=1173)
> 若數字為正 Math.ceil() 為無條件進位(到天花板)，Math.floor() 為無條件捨去(超過地板的地方都掰掰)
> 數字為負則相反 Math.ceil() 捨去小數點以後，Math.floor() 無條件進位(多 -1)
![捨去進位](/homeworks/week2/img/w2_0.png)

---

## 超級挑戰題
- 用二進位相加的方向去想，可以先試著把 2 個 bit 相加看看結果
- 關鍵字：加法器，full adder

在這次的課程中有教到位元運算，你知道位元運算可以達到什麼目標嗎？讓我來告訴你！只用位元運算，就可以寫出相加兩個數字的功能。所以這一週的超級挑戰題就是：「挑戰寫出一個 function，可以接收兩個正整數，而且回傳相加的結果，並且在 function 裡面不能出現 `+-*/` 任何一個符號」

``` js
function add(a, b) {
    // xor 取得不用進位的 bits
    let sum = a ^ b;
    // and 找到要進位的地方 並 left shift 進 1 位
    let carry = (a & b) << 1;

    // 直到 0000 前都繼續上面兩個動作
    while (sum & carry) {
        return add(sum, carry);
    }
    return sum ^ carry;
}
```
參考資料
- [How do I convert an integer to binary in JavaScript?](https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript)
- [How to convert binary representation of number from string to integer number in JavaScript?](https://stackoverflow.com/questions/11103487/how-to-convert-binary-representation-of-number-from-string-to-integer-number-in)
- [位元運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
- [Number](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [位元AND運算(&), 位元OR運算(|), 位元XOR運算(^)](http://www.86duino.com/?p=1411&lang=TW)
> 這個網站的圖超清楚!
#### & (AND)
  0 0 1 1   運算元1
  0 1 0 1   運算元2
  ———-
  0 0 0 1   (運算元1 & 運算元2)    –    回傳結果
#### | (OR)
  0 0 1 1    運算元1
  0 1 0 1    運算元2
  ———-
  0 1 1 1 (運算元1 | 運算元2)    –    回傳結果
#### ^ (XOR)
  0 0 1 1    運算元1
  0 1 0 1    運算元2
  ———-
  0 1 1 0    (運算元 ^ 運算2)    –    回傳結果

- [wildlyinaccurate/add.js](https://gist.github.com/wildlyinaccurate/8859257)
- [Add Two Numbers Without The "+" Sign (Bit Shifting Basics)](https://www.youtube.com/watch?v=qq64FrA2UXQ)
> 這個影片說的超清楚!
xor 拿來找沒有進位的數字
and 拿來找進位
<< 進位

---

## 超級超級挑戰題

在數字很大的時候，因為 JS 裡面數字上限的關係，一般的數學運算會出錯，所以在最新的 JS 裡面多了一個資料型態，叫做 BigInt，只要在後面加個 n 就可以得到正確的結果：

``` js
console.log(124902814902890825902840917490127902791247902479027210970941724092174091274902749012740921759037590347438758957283947234273942304239403274093275902375902374092410937290371093719023729103790123n*1239128192048129048129021830918209318239018239018239018249082490182490182903182390128390128903182309812093812093820938190380192381029380192381092380192380123802913810381203n)
```

問題來了，你有沒有辦法在不使用 BigInt 這個型別的前提之下，依舊完成兩個很大的數字的乘法？請你寫一個 function 叫做 multiply，會接收兩個格式是數字的「字串」，回傳兩個數字相乘之後的結果（一樣會是一個字串）：

#### 大數乘法

``` js
function multiply(a, b) {
    // 利用字串反轉，讓個位數對齊
    let a1 = a.split('').reverse()
    let b1 = b.split('').reverse()
    let result = [];
    // 型態轉換:把字串轉數字，並進行位數相*的計算
    for (let i = a1.length - 1; i >= 0; i--) {
        for (let j = b1.length - 1; j >= 0; j--) {
            // 補 0
            !result[i + j] && (result[i + j] = 0);

            result[i + j] += parseInt(a1[i]) * parseInt(b1[j]);
        }
    }
    // 進位
    for (let i = 0; i < result.length; i++) {
        let carry;
        // 補 0
        !result[i] && (result[i] = 0);
        carry = parseInt(result[i] / 10);
        if (carry > 0) {
            // 補 0
            !result[i + 1] && (result[i + 1] = 0);
            result[i + 1] += carry;
        }
        result[i] = result[i] % 10;
    }

    // 把反的陣列反轉回來，並變回字串
    return result.reverse().join('')
}
```

這邊 a 跟 b 之所以會是字串，是因為前面提過的，JS 的 number 型態沒辦法儲存這麼大的數字，所以要改用字串的型態來存。所以 `multiply('3', '5')` 應該要回傳 `'15'`，而上面的超大數字相乘，也應該出現正確的數字。

參考資料
- [大數乘法](http://www2.lssh.tp.edu.tw/~hlf/class-1/lang-c/big_num3.htm)
- [大数乘法的 javascript 实现 ](http://kaifage.com/notes/226/multiplying-large-numbers-basic-implement.html)
