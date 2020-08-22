## 什麼是 Ajax？
Asynchronous JavaScript and XML，直翻非同步的 JavaScript 與 XML。(當然現在不只可以傳 XML，還可以傳 JSON、HTML、文字檔案...)

AJAX 是一個非同步收發資料的概念，而以下將以 XMLHttpRequest 物件(下文簡稱 XHR)做說明。

> 在 2006 年 XMLHttpRequest 正式被列入 W3C 標準中，現在已被所有的瀏覽器品牌與新版本所支援。 - [AJAX與Fetch API](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html)


所以 XMLHttpRequest 經多次改良，已經是一個穩定且支援度高的物件。使用方法大致上可分成下面五步驟：
1. 使用時先 new 一個 XMLHttpRequest 物件。
2. 追蹤目前 XHR 的階段(有兩種方法)：
    1. 可以用 addEventListener 來追蹤目前 XHR。 [XMLHttpRequestEventTarget - MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget)。
    2. 或用五階段的 `XMLHttpRequest.readyState` 來做判斷追蹤。 [readyState - MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/readyState)。
3. `XMLHttpRequest.open(method, url)` 設定要發送的 HTTP 方法、打開連結。
4. 在 `open()` 後，若有要設定 header 可以使用 `XMLHttpRequest.setRequestHeader(header, value)` 來設定。
5. `XMLHttpRequest.send()` 將 XHR 發送到 server。

XHR 的狀態都會在狀態追蹤中被追蹤，當所有資料都下載完畢時會在事件　`load` 中被追蹤到，可以在此對 response 資料作處理。  
XMLHttpRequest 使用範例:
``` javascript
function reqListener () {
  console.log(this.responseText);
}

var xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
// 也可以寫成 xhr.onload = reqListener;
xhr.open("GET", "http://www.example.org/example.txt"); 
xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json'); // 對應 response 的 Content-Type
xhr.send();
```
補充: [IIS 設定 MIME Type](https://shunnien.github.io/2018/09/13/mime-type-set-for-iis/)
> 因為作業才發現原來 MIME Type 可以自己設定(酷)。

## 用 Ajax 與我們用表單送出資料的差別在哪？
- Ajax 最吸引人的特點是「非同步」進行 Client 與 Server 的請求與回應。  
代表無須重整網頁就可以跟伺服溝通交換資料，並接著借 HTML DOM API 更新部分頁面。

- 表單送出資料: 以「同步」進行。  
在進行 request 時，會對 `<form>` 的 action 屬性所設定的 url 發送請求。一旦開始發送請求頁面會重新整理、維持重新整理的狀態直到收到 Server 端的 response。

「同步」是一次只能做一件事，所以還沒做完這件事時都要等待(卡在重整頁面的狀態)。

「非同步」是可以同時做很多事，就像做早餐，一開始你先烤土司，還沒烤好前你可以煎蛋、同時煎火腿，在等他們煮熟之前可以跑去倒杯咖啡。

如果是「同步」的做早餐你一定會花更多時間，等吐司烤完→煎蛋→煎火腿→倒杯咖啡。(「→」就是頁面一直在重新整理，重新整理完才能到下一步驟xd 所以除了看圈圈一直轉，你還會一直不耐煩的甩滑鼠，用滑鼠還能不能移動來確認電腦是當掉?還是還在跑?)

## JSONP 是什麼？
根據 [同源政策 (Same-origin policy) - MDN](https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy) 我們發現下面這些情況可以不被同源政策所管制：
> 1. JavaScript with `<script src="…"></script>`. Error details for syntax errors are only available for same-origin scripts.
> 2. CSS applied with `<link rel="stylesheet" href="…">`. Due to the relaxed syntax rules of CSS, cross-origin CSS requires a correct Content-Type header. Restrictions vary by browser: Internet Explorer, Firefox, Chrome, Safari (scroll down to CVE-2010-0051) and Opera.
> 3. Images displayed by `<img>`.
> 4. Media played by `<video>` and `<audio>`.
> 5. External resources embedded with `<object>` and `<embed>`.
> 6. Fonts applied with @font-face. Some browsers allow cross-origin fonts, others require same-origin.
> 7. Anything embedded by `<iframe>`. Sites can use the X-Frame-Options header to prevent cross-origin framing.

JSONP 就是利用不受同源政策所管制的 `<script src="…"></script>` 來進行跨來源的資料傳輸。

假設別的 Server 如下圖吐了一個 js 檔案到這個 Client 來(以下範例的 datas.js)。
![same_origin_policy](/homeworks/week8/img/same_origin_policy.png)  
圖源: [Same Origin Policy 同源政策 ! 一切安全的基礎](https://medium.com/@jaydenlin/same-origin-policy-%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96-%E4%B8%80%E5%88%87%E5%AE%89%E5%85%A8%E7%9A%84%E5%9F%BA%E7%A4%8E-36432565a226)  

範例:  
- index.html
``` html
<head>
  <!-- 先宣告 -->
  <script>
  function getData(datas) {
      // 對別的 Server 來的資料做處理
      console.log(datas);
  }
  </script>
  <!-- 一但載入這個資料，就呼叫方法來用 -->
  <script type="text/javascript" src="/app/datas.js"></script>
</head>
```
> **注意:** `function getData(datas){//...}` 一定要放在前面，不然直接呼叫後面方法會 is not defined  
- datas.js 的內容就是**一個方法**，而且偷渡了別的 Server 來的資料。
```
getData([
    {
        id: 1,
        animal: 'cat',
    }, {
        id: 2,
        animal: 'dog',
    },
]);
```
> 別的 Server 吐了一個 js 檔案到這個網域，這個檔案就是 JSONP(JSON with Padding) 將 JSON 資料填充到函式中。  

我們雖然不能直接跨域去請求該 Server 但可以載入他產生的 js 檔案，接著直接呼叫這個有填充物的函式後 `getData(填充物)`，會找到我們目前對應的宣告 `function getData(datas){// 做處理...}`，這樣就可以在這裡對填充物做處理了。

### 小結
填充物 JSONP 繞過同源政策，讓我們不用發送請求接收回應，就可以直接使用資源。

參考: 
- [用 JSONP 跨域 GET 簡易示範 ＆ 說明](https://medium.com/@brianwu291/jsonp-with-simple-example-4711e2a07443)
- [CORS - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 要如何存取跨網域的 API？
在請求和回應中設定 CORS 標頭。CORS 會利用 request header/response header 檢查網域，且將請求分成「簡單請求」和「預檢請求」。
### 簡單請求
會在 request header 帶著 `Origin: 所在網域`，對照 Server 端設定的白名單回傳 response header ` access-control-allow-origin: 可以接受的網域`。
### 預檢請求(preflight request)
預檢請求會在主要請求前先發送一個預檢請求多確認 Server 是否有提供該 HTTP 方法(跟簡單請求一樣會檢查網域)。
然後會限定主要請求必須在限定時間內請求完成 `Access-Control-Max-Age: 秒`。

更多詳細內容可以去看: [CORS - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
因為同源政策是瀏覽器實作的，譬如 `XMLHttpRequest` 和 `Fetch` 物件都受同源政策規範，所以我們在用這些物件的時候就會噴出 blocked by CORS policy 的錯誤。

而 week4 因為是用 node.js 的 `https.request(options[, callback])` 直接透過 https 協定去要資料，所以沒有實作同源政策的規範。

瀏覽器因為安全性的考量而實作同源政策。
而 node.js 只想負責提供收發資料的功能，安全性是使用者(你)要自己實作。

## 自我檢測
- P1 你知道什麼是 API  
介面。  
- P1 你知道什麼是 Ajax  
非同步收發資料的概念。  
- P1 你知道從網頁前端呼叫 API 與在自己電腦上寫程式呼叫的差異  
自己電腦上呼叫沒人會幫你檢查網域，除非你自己檢查。網頁上呼叫瀏覽器會幫你檢查網域是不是安全的之類的，或是根據某些安全政策去規範使用者如何使用。  
- P1 你知道什麼是同源政策（Same-origin policy）   
自己家的小孩要自己打xD(想到這個梗的作者也太有才xD) 要怎麼打別人家小孩請參考 CORS。  
- P1 你知道如何存取跨網域的資源（CORS）   
設定 header 或利用那些不受同源政策規範的內嵌方法繞過同源政策的限制。    
- P1 你知道什麼是 JSON   
檔案格式。  
- P2 你知道什麼是 JSONP 及其原理   
利用 `<script>` 繞過同源政策，偷渡別人家的小孩，然後你就可以打他了。
