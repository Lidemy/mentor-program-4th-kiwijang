## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. [<template>](https://www.w3schools.com/tags/tag_template.asp)  
    隱藏 `<template>` 區塊，要用的時候再用 js 複製一份顯示。(奇耙)
2. [<time>](https://www.w3schools.com/tags/tag_time.asp)  
    語意化標籤，讓機器知道這裡是在講時間。
3. [<video>](https://www.w3schools.com/tags/tag_video.asp)  
    嵌入影片的標籤。
    ``` html
    <video width="320" height="240" controls>
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
      Your browser does not support the video tag.
    </video>
    ```
    - `<video>` 內可包含多個 `<source>` (不一樣的來源與格式)，瀏覽器會以第一個支援的來源優先使用。
    - 在 `<video></video>` 之間的字只會在瀏覽器不支援該格式時顯示。
    - `<video>` 屬性
      - controls 決定是否有撥放等按鈕的控制條(功能根據瀏覽器顯示)
      - muted	讓影片一開始為靜音
      - autoplay 影片準備好就會自動撥放，根據 [Autoplay Policy](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
      只能允許 autoplay 要和 muted 一起使用，或是自己去瀏覽器設定允許有聲 autoplay —— [Web Autoplay 的限制](https://jiepeng.me/2019/03/17/autoplay-policy-note)

## 請問什麼是盒模型（box modal）
所有 HTML 元素都像一個盒子，由外到內為: margin(邊界)、border(邊框)、padding(邊距)、content。  
常用的屬性為 `box-sizing`，預設為 `box-sizing: content-box;`  
當我們設置 content 的寬高時，content 外層的盒模型屬性(margin、border、padding)會被往外/往內擠，讓其他元素位移、影響效能。  
所以為了這個問題，可以設定成 `box-sizing: border-box;`  
這樣當寬高就包含 border、padding、content，只有在設定 margin 時才會擠到別元素了。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
- div、h1、p 預設為 `display: block;`  
  左右撐滿。  
  調什麼都可以(可以自己設寬高、padding、margin)  
- span、a 預設為 `display: inline;`  
  並排。  
  寬高 auto、可調 margin 左右(上下無法調)，padding、border 左右會往外擠，padding、border 調上下會上下生長可是不會造成上下元素位移。  
- button、input、select 預設為 `display: inline-block;`  
  並排的 block。  
  可像 inline 一樣並排，但寬高等屬性像 block 一樣什麼都可以調。  
  
## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
- static  
  瀏覽器預設的排版方式。  
以下都脫離瀏覽器的 static 自動排版，不會擠到其他元素:  
- relative  
  以元素自己左上角為原點，去移動 top、left、right、bottom。  
- fixed  
  以瀏覽器左上角為原點做定位，不管怎麼移都固定在那裡。  
- absolute  
  根據某個元素的左上角為原點(往上層找不是 static 的元素)去定位。  
  都找不到就會以 body 的左上角為原點做定位。  
- sticky  
  IE9 不支援。  
  平常是 static，滾到設定的 top、left、right、bottom 時就會黏在那裡。  