## 🔖自我檢討注意點
1. **retrun 與 console.log**
功能歸功能、log 歸 log，這樣方法才能重複使用。
2. **語意**
is 開頭表示回傳 true 或 false。(如: `isPrime`)
命名以小駝峰 camel case 命名。
3. **型態**
寫程式時務必知道每一個變數型態是什麼。
4. **early return**
想辦法把 if else 壓平。

## hw1：好多星星
[LIOJ 1021](https://oj.lidemy.com/status/88ee9ae37bd95f3ba79bef6784b71fe2)
使用 javascript 內建重複字串的方法。
`'*'.repeat(i)` 完將結果印出來。

## hw2：水仙花數
[LIOJ 1025](https://oj.lidemy.com/status/54ba5ee2beef75c67c70214d9f6e7bb8)
#### 📌注意點
- **轉型!** 使用 `Number()` 和 `String()` 轉型。
- ES7 `**` 指數運算(exponentiation)。
  **原本**
  ``` javascript
  const x = Math.pow(3,7);
  ```
  **ES7**
  ``` javascript
  const x = 3 ** 7;
  ```
#### 📑找出範圍內水仙花數的過程
- 用迴圈產生輸入範圍的所有數字，將目前迴圈跑到數字傳到 `isNarc(目前數字i)` 方法裡
- 寫一個方法 `isNarc(目前數字i)` 判斷現在是否是水仙花數，回傳 `true`/`false`
  - 把目前數字i `split('')` 拆成陣列，
  - 用 `map()` 把目前數字i，轉成 `自己每個數字**自己位數次方`，結果變成新陣列
  - 用 `reduece()` 把新陣列的所有值加起來
  - 最後判斷如果 `加總後=原本數字`，就是水仙花數(`return true`)
- 根據判斷印出結果。

## hw3：判斷質數
[LIOJ 1020](https://oj.lidemy.com/status/23e11cabe2eed60efdb983fdc5c4f625)
#### 📌注意點
不須改變陣列值的時候用 forEach ，要改變陣列內元素用 map。
#### 📑找出範圍內質數的過程
- 用 `forEach(element, index)` 跳過 `index === 0` (題目給的:一共有幾個數字)，然後將數字一一傳給 `isPrime(目前數字x)` 方法裡
- 寫一個方法 `isPrime(目前數字num)` 判斷現在是否是質數，回傳 `true`/`false`
  - 判斷如果 **能被自己與1以外的數整除** `目前數字num % 自己與1以外的數 === 0`，就是不是質數(`return false`)，其他合數(`return true`)。而 1 不是質數也不是合數，題目要求回傳合數(`return true`)。
- 根據判斷印出結果。

## hw4：判斷迴文
[LIOJ 1030](https://oj.lidemy.com/status/350d9eaab4ab88c8cdcec30e81e3265c)
感覺是陣列與字串的練習。
將字串拆成陣列後反轉、再組回字串。
`str.split('').reverse().join('');`
最後判斷是否與原本相同，與反轉後相同就是迴文。

## hw5：聯誼順序比大小
[LIOJ 1004 - BigInt](https://oj.lidemy.com/status/c14b856fc158fcd8d3267c7e57006ced)
[LIOJ 1004 - 比字串長度、字典序](https://oj.lidemy.com/status/24881767029439def8cbb47262fbe735)

#### 📌注意點
1. 使用 `BigInt()` 確保數字精準度
題目要求: 要特別注意的是 A 與 B 可能是很大的數字，但保證長度為 512 個位數以內。
- `Number.MAX_SAFE_INTEGER` 名詞解釋：
Number 物件的一個屬性。
JavaScript 中 IEEE-754 雙精度範圍間的最大整數 ($2^{53}$ - 1)。
- `Number.MAX_VALUE` 名詞解釋：
Number 物件的一個屬性。
$2^{53}$是 JavaScript 原生的 Number 能夠表示的最大值。
📌**所以 $2^{53}$ = 9007199254740992 是 16 個位數。**
- `BigInt` 名詞解釋：
BigInt 是一個內建的物件。
提供了表示大於 $2^{53}$ 的整數的功能 ($2^{53}$是 JavaScript 原生的 Number 能夠表示的最大值)。
📌**所以 BigInt 讓 16 位數以上整數都可以保有數字的精準度**

2. 使用字串實作判斷
- 字串長度相等比 **字典序**(如下)，字串長度不相等比長度
'0' < '1' < '2' < ... < '9' < 'a' < 'b' < ... < 'z'

3. early reaturn 想辦法把 if else 壓平
- [no-lonely-if](https://eslint.org/docs/rules/no-lonely-if)
  不要在 else 裡只寫一個 if ，應寫成 
  ``` javascript
  else if(){
    //... 
  }
  ```
  不要再 else 裡寫 if else ，應寫成 
  ``` javascript
  else {
    if(){
      //...
    }
    return //...
  }
  ```
- [no-else-return](https://eslint.org/docs/rules/no-else-return)
  如果最後一個 else 有 return 值的話就搬出去 return(如上)
    ``` javascript
    else {
      if(){
        //...
      }
      return //...
    }
    ```
  更嚴格一點還有 else if 不要有 retrun 值，如果有要自成一個 if
  ``` javascript
  function foo() {
      if (error) {
          return 'It failed';
      }

      if (loading) {
          return "It's still loading";
      }
  }
  ```
反正就是盡量壓平...

## hw6：簡答題
總之就是:
- 轉型
- 命名要有意義
- 方法要用 return 的(功能歸功能/印歸印)
- 壓平判斷(early return、減少巢狀)

---

## 挑戰題
只有寫出一題，第二題 DP 等課程完再補xD
### BFS，廣度優先搜尋法
題目: [LIOJ1053 - 走迷宮](https://oj.lidemy.com/problem/1053)
我的答案: [LIOJ 1053](https://oj.lidemy.com/status/6cc7a759e6622c686b8d2c2f45258cae)

### 心得
> 感動 想好久寫好久QQ 圖論入門 QHQ

### 參考資料
1. [Graph Search Algorithms in 100 Seconds - And Beyond with JS](https://www.youtube.com/watch?v=cWNEl4HE2OE)
> 這影片超棒，講了 BFS 與 DFS，我主要是拿這影片內的 BFS 範例程式碼來用。
2. [Breadth First Search Algorithm | Shortest Path | Graph Theory](https://www.youtube.com/watch?v=oDqjPvD54Ss)
> 看了這影片才想到最後要從 endpoint 找回 startpoint 算走過的步數。

### 遇到的問題
#### 先備知識
1. 資料結構 queue (先進先出)，可搭配 stack 一起看。
1. 鄰接表 (Adjacency list)，在此題就是幫 queue 加一個 key 標籤的概念。
1. 演算法 BFS (廣度優先是如何搜尋的?)，可搭配 DFS 一起看。
#### 解問題
> 第一個問題: routes 和 points 怎麼來?
> 影片裡是所有機場名稱和機場路線，所以我改成找座標名稱和座標路線。
> 基本上就是找規律硬幹出來的 xD

> 問題二: 有牆壁怎麼辦? 要怎麼移除 adjacencyList(Map 物件) 的 key 和 value(陣列) 內的牆壁座標?
> 先找出所有牆壁座標，再一一刪除 key 和 value，而且也把 start 刪掉了，讓路線不會再回頭跑 start(不刪的話會 Time Limit Exceeded)。

> 問題三: 這樣所有點、所有可走路徑(刪掉所有牆壁)都準備好了，開始跑 bfs，可以印出所有經過的點，所以要怎麼拿到最小路徑數?
> bfs 的方法現在只能找出拜訪過的點(visited 陣列)和接下來要去拜訪的點(queue 陣列)，
> 我現在需要 「recounstruct path」我要從終點走回去起始點才能拿到題目要的: 走幾步最快到。
> 所以我需要紀錄走過的「路線」，(只記錄點沒用，因為沒辦法回溯)
> 拿到路線後開始找規律硬幹，用 while 迴圈回溯同時累計走幾步。

#### 所以寫這題，學到並使用到的主要概念
> 1. 把網格變成點和路徑 (grid to point, route)
> 2. 把牆壁變成點 (wall to point)
> 2. 使用 Map 物件把點和路徑組成有關聯的串列 (point, route to adjacencyList)
> 3. 實作 BFS 方法 (visited, queue, [from, to])
> - 使用 Set 物件紀錄走過的點(Set 物件不會有重複值)
> - 使用 array 中的 shift() 方法，來實作 queue 先進先出的資料結構特性
> - 這個方法讓我可以得到拜訪過(visited)和接下來要拜訪的點(queue)，為了回溯還要記錄走過的「路徑」(用 `queue.shift()`(就是 Map 物件的 key) 和 `destinations[i]`(正在走的點 ，adjacencyList 的 value 陣列裡的個點)，來組成`[queue.shift()-來的點(from), destinations[i]-正在走的點(to)]`，這樣紀錄 visited 和 queue.shift() 同時也可以記錄起點到終點經過的所有 [from,to] 路徑了。我把所有路徑存在 finalRoute 陣列裡)
> 4. finalRouteCount 回溯路徑並數走了幾步
> - 把 finalRoute 路徑連起來後會有很多「路線」。
> - 也就是說，finalRoute 現在有可能包含了沒走到終點的「路線」、和很多同時走到終點的「路線」。
> - 而可以頭尾走完的那條路線就是 bfs 最快到達的答案(可以從終點連到起始點) !
> - 所以開始找頭尾可以相連的路線。因為只有一個終點和起點、且要確定可頭尾走完，所以從尾(終點)開始往回走。
> - 在走的同時，每走過一個路徑就累加 1。這樣走到起點時就可以得到題目要的答案了! (灑花)

## 超級挑戰題
### 背包問題
待補..
## 超級超級挑戰題
### BFS，廣度優先搜尋法
遠目..