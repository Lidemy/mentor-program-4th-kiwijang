## 什麼是 DOM？
### DOM 的定義
Document Object Model 文件物件模型。是 HTML、XML、SVG 檔案與程式之間的介面。  
在瀏覽器中，瀏覽器將靜態文件解析成 DOM 後，可以透過 javascript 去操作這些 DOM 物件。  
DOM 是由 Node(節點) 所構成，因為可以長得像樹所以被叫成 DOM Tree。  
而所有節點的原點是 Document Node。(如下圖)  

(下圖)以 HTML 文件為例，瀏覽器將 HTML 文件變成 DOM 後的各個 Node 節點。  
![tree](/homeworks/week7/img/pic_htmltree.gif)  
圖源: [w3schools - JavaScript HTML DOM](https://www.w3schools.com/js/js_htmldom.asp)  

---
### HTML DOM API
瀏覽器除了把 html 解析成 DOM 物件，還提供了 HTML DOM API，讓我們可以使用 javascript 操作這些 DOM；就像我們可以使用 javascript 提供的 API 去操作 javascript 物件一樣。  

(下圖)我們可以從瀏覽器物件 `window` 中取用的各個物件，譬如 DOM 裡的 document、BOM 裡的 location、Javascript 裡的 Object。  
![window](/homeworks/week7/img/window.PNG)
圖源: [Browser environment, specs](https://javascript.info/browser-environment#bom-browser-object-model)  

---
### EventTarget Interface
我們還可以使用 `document.addEventListener()` 是因為 node 有繼承 EventTarget。  
下圖為 DOM 的 Document 是繼承自 Node，並繼承自 EventTarget  
![node](/homeworks/week7/img/node.PNG)  
圖源: [MDN - document](https://developer.mozilla.org/zh-TW/docs/Web/API/Document)  
更多詳細資料可以參考: [whatwg - dom](https://dom.spec.whatwg.org/)  

---
### 小結
所以我們可以使用瀏覽器的 HTML DOM API 來操作 DOM 的節點，訪問、新增、刪除、修改節點，還可以使用事件監聽 DOM 元素。  

下圖為瀏覽器產生畫面的過程，可以看到 Event 是何時改變 DOM tree 的。  
![event](/homeworks/week7/img/event.PNG)
圖源: [Overview of events and handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Overview_of_Events_and_Handlers)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
所有的事件傳遞過程，一定會先補獲再冒泡。  
Event object 會從 window 開始往下傳，傳到觸發事件的 node(這個 node 的 html 會以 DOM 的形式記錄在 Event object 的 target 裡)，然後往回繼續傳回 window。  

(圖一)  
![eventflow](/homeworks/week7/img/bubble.png)
圖源: [w3c - UI Events](https://www.w3.org/TR/uievents/)  

這整個事件傳遞機制分成三階段:  
- 捕獲(Capture Phase): 事件從 window 往下傳到目標的 parent。
- 目標(Target Phase): 事件到達目標，如果 event type 被指定不要冒泡，那事件傳遞會在這一階段完畢時停止。
- 冒泡(Bubbling Phase): 跟捕獲反向，從目標的 parent 往上傳到 window。  


我們可以使用不同的方式來註冊事件(在 html 上、或在 js 裡)，而 `target.addEventListener(type, listener[, useCapture])` 是其中一種註冊方式。  

來看例子：  
```
document.getElementById('myEle').addEventListener('click',(e)=>{//...})
```  
我們在 `id="myEle"` 的元素上註冊了一個事件監聽，當監聽到這裡發送 `click` 事件時，就會執行後面的方法。
這個方法就像一個 listener，坐在 `id="myEle"` 的元素上聽有沒有事件類型(type)是 `click`。 事件觸發後會傳一個 Event object 來給 listener(就是上面例子的 e)。  

下圖是 `click` 事件觸發後帶來的 Event object。Event object 內記載了自己是從哪裡開始被註冊監聽的(currentTarget)、和自己要去到哪裡(target)。  

```
                            捕獲階段的方向
|-----------------------|                  |--------------------|  
|  event.currentTarget  | ---- event ----> |    event.target    |
|-----------------------|                  |--------------------|
  the element that                           the element that
  the event listener                         triggered the event.
  is attached to.
```  
參考:  
- [quirksmode-Event order](https://www.quirksmode.org/js/events_order.html)
- [A simplified explanation of event propagation in JavaScript.](https://www.freecodecamp.org/news/a-simplified-explanation-of-event-propagation-in-javascript-f9de7961a06e/amp/?fbclid=IwAR2RpHVWZ1O2nUkIz5Va79dDMiRbF0I_S7slAx59O3d6KLERIBRojIVWDKw)
- [What is the exact difference between currentTarget property and target property in javascript](https://stackoverflow.com/questions/10086427/what-is-the-exact-difference-between-currenttarget-property-and-target-property)  

順帶一提，可以自己 new 一個 EventTarget 和一個 Event 來玩。  
[MDN - Creating and triggering events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
[MDN - Event()](https://developer.mozilla.org/en-US/docs/Web/API/Event)
[MDN - CustomEvent()](https://developer.mozilla.org/zh-TW/docs/Web/API/CustomEvent/CustomEvent)  
``` javascript
let elem = new EventTarget();
let evt = new Event('hina');
// element listen for the event.
elem.addEventListener('hina',()=>console.log('onechandaisuki'), false);
// element dispatch the event. 這樣會觸發到 hina 事件，接著就執行監聽器後面的方法、印出結果。
elem.dispatchEvent(evt);
// onechandaisuki
// true
```  
其實就是 EventTarget、Event、EventListener👂，三個東西在被觸發、執行。  
```
|-------------|                                                                        
| EventTarget | ---- 👂addEventListener('監聽某事件的觸發', ()=>{//一旦觸發到就執行}) 
|----🙄💥----|                                                   /\
      ||                                                          || 
      || 事件被使用者觸發了!                                        || 被監聽器聽到事件的觸發✅
      \/                                                          ||       
  |-------|______________________________________________________ || 
  | Event | (被觸發)〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉〉|
  |       |_______________________________________________________/
  |-------|
```  
## 什麼是 event delegation，為什麼我們需要它？
event delegation(事件委派) 又名 event propagation(事件傳遞)。  
所有事件傳遞都會有捕獲和冒泡階段(除非你特別去設定不要再傳了)。  

被註冊事件監聽的元素，可能是一個巢狀的 html (譬如:你註冊在 ul 上，而它代表一整個 ul 與它裡面的元素們)，如下:  
``` html
<ul>
  <li>1</li>
  <li>2</li>
  <ul>
    <li>3-1</li>
    <li>3-2</li>
  </ul>
</ul>
```  
所以父元素一旦註冊監聽事件了，包含在它裡面的元素們也會一起被監聽。  
當裡面的其中一個元素觸發(triggered)了被監聽的事件，這個元素就會被當作第二階段的 target(目標)，以此作為一個折返點，傳事件回去 currentTarget(註冊監聽事件的地方)。  

就像你丟東西給狗，狗會撿回來給你那樣，請看著(圖一)想像有人從 window 丟東西，掉到 target，然後狗狗一路追著東西跑，在 target 撿到東西後再跑回 window。(註:事件傳遞的路線是固定的，不像狗狗不一定會照同樣路線來回。)  

所以，所有有 addEventListener 的地方(有註冊事件監聽的地方)，都是一個可以等狗撿東西回來的地方。  

(下圖)在 li#a 的地方註冊事件監聽，然後去點它巢狀結構裡面的元素。我們可以利用 currentTarget 和 target 去模擬捕獲到目標再冒泡的過程。  
![event delegation](/homeworks/week7/img/eventDelegation.gif)  

### 為什麼我們需要它
當我們有太多元素要註冊事件監聽時，不用一一註冊父元素裡面的每一個子元素，可以利用事件傳遞的特性，註冊事件監聽在父元素來達到同樣的觸發效果，但因為點到的東西不一定是你想要的(可能你只希望點在按鈕時才觸發，點到其他東西時不要觸發)，這時就只要判斷子元素是否是你要的 target 就好了。  

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
### event.preventDefault()
> 如果事件可以被取消，就取消事件（即取消事件的預設行為）。但不會影響事件的傳遞，事件仍會繼續傳遞。 - [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/preventDefault)  

有些元素會有預設的動作，譬如點 submit 按鈕會送出表單後導到 action 頁面，點擊 a 會跳去超連結。原因是觸發到這些元素上的預設事件，所以我們可以利用 `event.preventDefault()` 來取消這些事件的預設行為。  

(下圖)預設事件會執行送出表單後導到 action 頁面的動作，加入 `event.preventDefault()` 後就不會執行事件預設的動作了。  
![preventdefault](/homeworks/week7/img/preventdefault.gif)  

### event.stopPropagation()
> 停止事件繼續傳遞。 - [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/stopPropagation)  

事件傳遞一定會經過先補獲後冒泡的過程，我們可以使用 `event.stopPropagation()` 來阻止事件繼續傳遞，哪個地方放了 `event.stopPropagation()` 事件傳遞就會停在那個監聽器的元素。  

(下圖)事件傳遞停止在 `event.stopPropagation()` 那裡。
![stoppropagation](/homeworks/week7/img/stoppropagation.gif)  

### event.stopImmediatePropagation()
> 除了停止事件繼續傳遞外，也阻止事件被傳入同元素中註冊的其它相同事件類型之監聽器。 - [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/stopImmediatePropagation)   

因為可以在同一個元素上對同一個事件加上多個監聽器，當我們在其中一個 `event.stopPropagation()` 時，事件會傳遞到這批事件監聽器後才停止傳遞。  
為了讓事件停止傳遞在這一行監聽器，可以使用 `event.stopImmediatePropagation()`，這樣這行之後註冊在同一個元素、同一個事件的事件監聽器完全不會被觸發，因為沒有事件傳遞了。  

(下圖)事件傳遞停止傳入同元素中註冊的其它相同事件類型之監聽器。  
![stopim](/homeworks/week7/img/stopim.gif)

## 自我檢測
P1 你知道 JavaScript 跑在網頁上跟跑在 Node.js 上差在哪裡  
跑在不同的環境上，有不一樣的 API。  
P1 你知道 DOM 是什麼  
將結構變成 DOM 物件，並可藉 API 對之進行操作。  
P1 你知道如何用 JavaScript 操控 DOM 物件  
可。  
P1 你知道如何幫一個按鈕加上 event listener  
可。  
P1 你知道捕獲與冒泡是什麼  
事件傳遞機制中有三階段:捕獲、目標、冒泡。  
P1 你知道什麼是事件代理（delegation）  
事件傳遞機制的應用。  
P2 你知道怎麼用 JavaScript 更改元素的 style  
可。  
P2 你知道 preventDefault 與 stopPropagation 的差異  
取消預設行為與取消事件傳遞。  
