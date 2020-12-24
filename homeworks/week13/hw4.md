## 一、 Webpack 是做什麼用的？可以不用它嗎？

### 👾(1-1)模組開發的歷史 - 如何方便日後管理與減少程式碼體積?

當開發網頁時，一是我們可以將各個功能寫在很多個 js 檔裡載到 html 裡用，二則是通通寫在一個 js 檔裡。
一有個缺點就是當分了太多個檔案時，可能會在網頁載入時因為一次載入大量各別 scripts 造成網路瓶頸。(request 太多次)
二通通寫在一起時，當網頁規模變得越來越大時，各個功能間的全域變數容易混在一起、檔案大小、可讀性、可維護性並不太容易很好。
所以為了克服二的缺點，有人使用 IIFE 來包裹各個功能的 js 檔案，並搭配 task runners (如: Gulp、Grunt) 來將各個檔案連結在一起。
但使用 task runner 有個缺點，檔案確實可以因 IIFE 依照功能細切方便管理、也可以用 task runner 將檔案包成一個檔案減少 html 載入 script 的次數、也讓各個功能可以重複使用，但是這讓建置難以優化(因為你很難找出哪些程式碼是否有被使用)，而且就算你只是要用某個 library 裡的一個方法，也要載入整個 library 才能用。

### 👉👈(1-2)模組系統的瀏覽器支援問題 - 開發環境與執行環境的整合

這時 Node.js 出現了，讓 js 可以在瀏覽器以外的環境運行，也讓人們可以使用 CommonJS 來模組化程式碼。
而 webpack 就是運行在 Node.js 上的一種模組打包工具，然而在瀏覽器上並不支援 CommonJS，為了開發環境與最後執行環境的整合， bundlers 和工具(如:Browserify, RequireJS, SystemJS)被發明來讓 CommonJS 也能應用在瀏覽器上。
好消息是，在 ES6 的版本以後讓 js 的模組系統可以直接運行在瀏覽器上(可以直接使用原生 js 語法，就不用使用 CommonJS 和 Browserify 那些工具來轉換了)，也就是說模組的開發環境與最後執行環境已經可以使用原生模組系統整合在一起了。

![es6](/homeworks/week13/img/es6.PNG)

> 圖源: can i use es6 瀏覽器支援度

### 🚽(1-3)模組之間的相依性 - 如何知道哪些程式碼有在被使用?

解決了模組系統的瀏覽器支援問題，接著就是使用模組時的相依性問題了，如何知道哪些程式碼有在被使用?
webpack 不同於老派的 Task Runners 和 Google Closure Compiler 都需要手動先宣告所有的相依性。
bundlers 會依據你的 import 和 export 來自動建置你的相依性，搭配 plugins 和 loaders 可以讓開發體驗更順暢。(除了可使用 js 版本轉換的工具，css 和圖片也可以幫你模組化打包)

- 參考資料: [webpack 官網- why webpack](https://webpack.js.org/concepts/why-webpack/)

### 🌈(1-4)小結

- Webpack 是做什麼用的？  
  webpack 是將模組化的程式碼(支援 ESM 和 CommonJS)打包成一包 js 的工具(或多包 js，任君自行設定)。
- 可以不用它嗎？  
  不需要模組化、不用在意瀏覽器載入次數、不想讓工具自動偵測哪些程式碼不被使用，就不用打包，就可以不用它。

## 二、gulp 跟 webpack 有什麼不一樣？

gulp 是 Task Runner，webpack 是 module bundler。
排程工具和模組打包工具的差別在:

- 排程工具著重在模組執行順序，需要手動管理模組間的相依性、手動管理各種任務。
- 模組打包工具提供一個程式入口，幫你產生模組間的相依性，並幫助使用者搭配各種 plugins 和 loaders 轉換成最終執行環境(瀏覽器)可直接使用的程式碼。

## 三、CSS Selector 權重的計算方式為何？

```
!important > inline style > ID > Class/psuedo-class/attribute > Element
      0,          0,         0,                 0,                 0
```

依照這個位子去算權重，譬如:

```
body h3 a → 0,0,0,0,3
body>h3>a → 0,0,0,0,3
body h3.myClass a → 0,0,0,1,3
body h3.myClass::before → 0,0,0,2,2
body h3 a:hover→ 0,0,0,1,3
body h3 a[href^="https"]→ 0,0,0,1,3
```

### 🌂(3-1)什麼時候會用到?

問題來源: https://t.codebug.vip/questions-3075688.htm

有一個 `<section>` 裡的 `<article>` 的背景色被設定為白色。

```html
<section class="main_section">
  <article>
    ...
  </article>
</section>
```

```css
.main_section article {
  background-color: #fff;
  /* ... */
}
```

(此權重: 0,0,0,1,1)  
你想把 `<article>` 的背景色設定為白色以外的顏色，所以你給他一個 class name `.special-bg`。

```html
<section class="main_section">
  <article class="special-bg">
    ...
  </article>
</section>
```

```css
.special-bg {
  background-color: #276a7f;
}
```

(此權重: 0,0,0,1,0)  
結果發現怎麼都改不了....????  
你發現可以用 !important 解決所有問題。

```css
.special-bg {
  background-color: #276a7f !important;
}
```

(此權重: 1,0,0,1,0)  
日子久了到處都是 !important.......

無法改變原因:

- (.main_section article 此權重: 0,0,0,1,1)
- (.special-bg 此權重: 0,0,0,1,0)  
  11>10 下面權重就是比較小...  
  其實只要比 0,0,0,1,1 大都可以。  
  每個位子都加一有哪些方法?  
  1,0,0,1,1  
  0,1,0,1,1  
  0,0,1,1,1  
  0,0,0,2,1  
  0,0,0,1,2  
  以此案例來看，不用 !mportant 的話要改 inline style、id 還要去 html 改，所以用現有的 class 和 element 比較實在。

```css
/* 0,0,0,1,1 */
/* 再寫一個一樣的，電腦從上面讀下來越後面的會覆蓋前面的 */
.main_section article {
  background-color: blue;
  /* ... */
}
/* 0,0,0,1,2 */
/* 多一個 element */
section.main_section article {
  background-color: blue;
  /* ... */
}
/* 0,0,0,1,3 */
/* 多二個 element */
body section.main_section article {
  background-color: blue;
  /* ... */
}
/* 0,0,0,1,4 */
/* 多三個 element xd */
html body section.main_section article {
  background-color: blue;
  /* ... */
}
/* 0,0,0,2,0 */
/* 多一個 class，少一個 element :P */
.main_section .special-bg {
  background-color: pink;
  /* ... */
}
/* 0,0,0,2,1 */
/* 多一個 class */
.main_section article.special-bg {
  background-color: green;
  /* ... */
}
/* 0,0,0,2,2 */
/* 多一個 class，多一個 element */
section.main_section article.special-bg {
  background-color: green;
  /* ... */
}
```

...各種排列組合等著你去挖掘 xd

### 📌(3-2)注意點

Q: 你這樣寫想讓顏色變 blue，_明明通通加起來都是 3_，但是怎麼蓋不掉????QQ

```css
/* 0,0,0,2,1 */
/* 多一個 class */
.main_section article.special-bg {
  background-color: green;
  /* ... */
}
/* 0,0,0,1,2 */
/* 多一個 element */
section.main_section article {
  background-color: blue;
  /* ... */
}
```

A: css 權重是一種位數的概念，21 不會等於 12，不要以為權重就是所有位數的總和。  
(21 > 12，所以 12 覆蓋不掉 21。或者你可以向大雄學習，把他們當成錢來看，21 元 > 12 元)

---

---------------- 以下為 w13-h1.h2.h3 作業 memo --------------------

## hw1：改寫陽春部落格

覺得用 SCSS 後，用 BEM 啥的命名方式好像沒啥重要了。

## hw2：留言版 plugin

> 這是一個「帶你動手做」的作業，在 MTR04 裡面會有一個教學，一步步帶你改寫上一週寫的 SPA 留言板，把它改成一個 plugin 的形式，並且運用到 Webpack 以及其它這週所學到的工具。這個作業跟第九週留言板比較像，一樣都會有教學帶著你做，但是這個作業的難度比較高，所以這個作業你並不需要真的 100% 理解。大家只要稍微知道 webpack 有哪些基本設定以及目的即可。

![config](/homeworks/week13/img/config.PNG)

> 裝完東西後，設定東西

![webpack](/homeworks/week13/img/webpack.PNG)

> 下指令打包(以 index.js 為入口)，結果會打包到 ../dist/main.js 裡，所以在 html 只用引用一個 main.js 即可使用。

## hw3：改寫第八週 Twitch 作業

Promise 好棒>< 感覺就是把東西包在一個 Promise 裡，然後他的功用就是幫你看看有沒有執行完，執行完可以傳一個 Promise 到下一個 .then() 裡接著用，async/await 則是 Promise 的語法糖。
覺得 Promise 比 rxjs 的 operators 好懂又直覺多了 xDD

### 🙄🙄🙄 所以 Promise、async/await、RxJS 的差別????

被非同步的不可控荼毒的人的救星。  
async 幫你把 function 包成 Promise 物件，且可以在 async function 裡使用 await 來去告訴 JS 引擎要停下來等待這個非同步程式碼執行完畢。

- [async function - MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)
  > 當 async 函式被呼叫時，它會回傳一個 Promise。如果該 async 函式回傳了一個值，Promise 的狀態將為一個帶有該回傳值的 resolved。如果 async 函式拋出例外或某個值，Promise 的狀態將為一個帶有被拋出值的 rejected。
  > async 函式內部可以使用 await 表達式，它會暫停此 async 函式的執行，並且等待傳遞至表達式的 Promise 的解析，解析完之後會回傳解析值，並繼續此 async 函式的執行。

RxJS 萬宗歸一，同步、非同步、事件都幫你包成一個 Observable 讓你可以接著使用 RxJS 的 API 來進行操作。

- [30 天精通 RxJS (01)：認識 RxJS by JerryHong](https://ithelp.ithome.com.tw/articles/10186104)

  > **非同步常見的問題**  
  > 競態條件 (Race Condition)  
  > 記憶體洩漏 (Memory Leak)  
  > 複雜的狀態 (Complex State)  
  > 例外處理 (Exception Handling)  
  > 各種不同的 API  
  > 我們除了要面對非同步會遇到的各種問題外，還需要煩惱很多不同的 API  
  > DOM Events  
  > XMLHttpRequest  
  > fetch  
  > WebSockets  
  > Server Send Events  
  > Service Worker  
  > Node Stream  
  > Timer  
  > 上面列的 API 都是非同步的，但他們都有各自的 API 及寫法！如果我們使用 RxJS，上面所有的 API 都可以透過 RxJS 來處理，就能用同樣的 API 操作 (RxJS 的 API)。

- [30 天精通 RxJS (02)： Functional Programming 基本觀念](https://ithelp.ithome.com.tw/articles/10186465)

  > Functional Programming 強調沒有 Side Effect，也就是 function 要保持純粹，只做運算並返回一個值，沒有其他額外的行為。  
  > 這裡列舉幾個前端常見的 Side Effect，但不是全部  
  > 發送 http request  
  > 在畫面印出值或是 log  
  > 獲得使用者 input  
  > Query DOM 物件

- [JS 原力覺醒 Day16 - Async / Await：Promise 語法糖 by Mooji](https://ithelp.ithome.com.tw/articles/10223362?sc=rss.iron)

  > 不過有一個小缺點是因為使用 await 的話，因為 JS 引擎會一直等待 Promise 執行完畢，所以如果過度濫用的話，那就失去非同步的意義了，這點在使用時要多多注意，自己斟酌。

- 待補跟著做一遍><
  https://blog.techbridge.cc/2017/12/08/rxjs/

## 自我檢測

- P1 你知道 webpack 的目的以及原理
  基於 Node.js 的 module bundler!
  艱深偉大的原理(走馬看花 🐎):

  - [看完就懂 webpack 打包原理 by incess](https://my.oschina.net/incess/blog/3159342)
  - [透過製作 Babel-plugin 初訪 AST by ArvinH](https://blog.techbridge.cc/2018/09/22/visit-ast-with-babel-plugin/)

- P1 你熟悉如何使用 webpack 進行模組化開發/P3 你熟悉如何使用 gulp 建構自動化工作流程  
  不到熟悉，知道而已 😰

- P1 你知道如何使用 Promise  
  [Promise](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  > `new Promise( /* executor */ function(resolve, reject) { ... } );`
  > Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。
  > try catch 怎麼包，之後如用到要再研究一下... 👀
- [callback, promise, async/await 使用方式教學以及介紹 Part II (Error Handling 介紹)](https://yu-jack.github.io/2019/05/02/promise-2/)

- P2 你知道如何使用 fetch
  fetch 回來的東西是 promise 物件!

- P2 你知道 gulp 的目的以及原理
  基於 Node.js 的 Task Runner!

  - [Gulp 基礎與原理](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/738993/)
    > Glob 是一種用來匹配路徑與文件的模式。有點類似於正則表達式，但是語法又有點差異。
    > 這種模式，被廣泛用於命令行、Shell 等場景，大家熟悉的 .gitignore 文件也是使用這種模式。
  - [Gulp 套件介紹](https://ithelp.ithome.com.tw/articles/10185517)
    > 挖 還可以排程執行 powershell 😲 CI/CD 好深奧的感覺 😊

- P2 你知道什麼是 uglify 與 minify
  寫完 code 時，我們可以根據自己需求做 minify 或是 uglify。

  - minify
    把你寫好的 code 變小(如:將空格語換行去掉、變數名稱改成只有一個英文字母)
  - uglify
    把你寫好的 code 順序或邏輯打亂、讓想從前端研究你的 code 的人很難一目了然。
  - [前端也需要編譯？Transpile、Compile、Minify、Uglify 基本介紹 by Alex Tzeng, 曾苔眠](https://ithelp.ithome.com.tw/articles/10191992)

* P2 你知道 CSS Sprites 與 Data URI 的優缺點
  CSS Sprites 和 Data URI 都是可以減少圖片 request 次數的好方法。

  - CSS Sprites
    應用: Compass 有提供製作 CSS Sprites 的工具(僅限 png)[Spriting with Compass](http://compass-style.org/help/tutorials/spriting/)還可以幫你把位子產生出來，你只要用 class 就可以取到對應的圖片。
  - Data URI
    data URI schema，允許在網頁裡以字串形式直接內嵌圖檔、CSS 檔案。將圖檔轉成 Base64 編碼後內嵌在 html 裡。
    優缺點可參考: [淺嚐 Data URI by 黑暗執行緒](https://blog.darkthread.net/blog/data-uri)
  - 以上是關於圖片的優化方式
    另外還有 SVG Sprite 和 Icon Font、JPEG2000、WebP、HEVC @@ 感覺還要看很多壓縮和編碼的文章 😭 好累...(先存起來放 😊)
    - [What Are Icon Fonts? By Pluralsight](https://www.pluralsight.com/blog/creative-professional/icon-fonts)
    - [SVG vs Image, SVG vs Iconfont - 凹凸实验室](https://aotu.io/notes/2018/11/23/SVG_vs_Image_vs_iconfont/index.html)
    - [AVIF 圖片格式簡介](https://www.mdeditor.tw/pl/pHMN/zh-tw)
    - [壓縮演算法 - 笑談印刷](http://www.netprint101.com/text/43373744-410.html)
      > 壓縮的使用是要取決於整個系統製成的考量，在成本（處理、傳輸、儲存）、效能（資料量、壓縮、解壓縮）、品質（失真）間折衝的決斷得之(Trade-off)。

* P3 你知道 CSS 優化的一些小技巧

  - [writing-efficient-css-selectors](https://csswizardry.com/2011/09/writing-efficient-css-selectors/)

    > 1. Avoid Universal Rules
    > 1. Don't qualify ID Rules with tag names or classes
    > 1. Don't qualify Class Rules with tag names
    > 1. Use the most specific category possible
    > 1. Avoid the descendant selector
    > 1. Tag Category rules should never contain a child selector
    > 1. Question all usages of the child selector
    > 1. Rely on inheritance
    > 1. Use scoped stylesheets

  - [css-selector-performance](https://vanseodesign.com/css/css-selector-performance/)
    > Selectors have an inherent efficiency, and to quote Steve Souders, the order of more to less efficient CSS selectors goes thus:
    >
    > 1. ID, e.g. #header
    > 1. Class, e.g. .promo
    > 1. Type, e.g. div
    > 1. Adjacent sibling, e.g. h2 + p
    > 1. Child, e.g. li > ul
    > 1. Descendant, e.g. ul a
    > 1. Universal, i.e. \*
    > 1. Attribute, e.g. [type="text"]
    > 1. Pseudo-classes/-elements, e.g. a:hover
