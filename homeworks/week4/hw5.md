## 請以自己的話解釋 API 是什麼
「應用程式介面」（英語：Application Programming Interface），簡稱 API。

「程式」是將我們要命令電腦的話(指令)透過流程控制、條件判斷，組織再一起的檔案，可以讓使用者透過輸入，來輸出想要的結果。

「應用程式」是電腦軟體的主要分類之一，針對使用者的應用目的所撰寫的電腦程式。
> 電腦軟體劃分為 **程式語言**(programming language)、**系統軟體**(system software)、**應用軟體**(application program、application software、app) 和介於這兩者之間的 **中介軟體**(middleware)。—— [wikipedia 軟體](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6)

「介面」是...

### 📑關於介面
![interface](/homeworks/week4/img/interface.png)
📓圖源: [API是什麼？認識 Web API、HTTP 和 JSON 資料交換格式](https://tw.alphacamp.co/blog/api-introduction-understand-web-api-http-json)

廣泛地來說，人與機械物品軟體之間的「中介」就是「介面(Interface)」，介面提供一個接口，讓我們只要打開介面就可以取得我們想要的事。

譬如，要從咖啡機拿到咖啡，我們只用按「介面」按鈕，就可以達成，完全不用管管線怎麼跑、怎麼用電加熱...。

總結，「應用程式介面」（英語：Application Programming Interface），簡稱 API。API 提供一個預先設計好的介面，而應用程式可以藉這個介面去訪問特定的資源。

### 📑關於 RESTful 風格的 API
以 week4 作業來看，要將前端與後端串接再一起，需要接口 —— API。
看起來 API 就是一個網址 URI。
而前端透過(HTTP 動詞與 URI)與後端來回溝通。

這種前端透過(HTTP 動詞與 URI)與後端來回溝通的方式，被稱為 RESTful 風格(行為模式)的 API。
![api](/homeworks/week4/img/API.PNG)
📓圖源: [什麼是REST? 認識 RESTful API 路由語義化設計風格](https://tw.alphacamp.co/blog/rest-restful-api)

### 📑使用 API 過程 (Web API)
(前端)
首先根據 HTTP 協定的動詞，對這個網址發出 http request。
發出 http request 的程式首先會先看瀏覽器的 DNS 快取(Cache)有沒有對應 IP(瀏覽器沒有 DNS 快取的話會去 hosts 文件找)，沒有的話，就去 DNS Server 查這個 URI 的 IP 位置。
(前端先找要把包裹寄去哪。
👤前端:伺服器先生家的地址在哪呢?
👥瀏覽器:你要的答案就在 browser 快取/系統 hosts 文件 或是 DNS Server 那。)。

前端拿到 IP 以後就發 http request 去 server。
(前端照著 HTTP 協定指定的格式寫上地址(IP) 寄包裹(http request) 給後端伺服器)。

傳輸過程: 基於 TCP 協定，這個包裹因為運輸車容量太小了，被分裝成一份份的小包裹(可被傳輸的單位)進行傳輸，每個被切分的小包裹
都有編號。而這些小包裹一一到達 server 後，會再照編號順序組裝回來。

(後端)
server 收到 http request 後，檢查請求方的目的地 IP 是否是自己，不是的話就直接丟掉。
(🧞‍♂️伺服器:這包裹不是我ㄉ囧(無情的丟掉)。)
是自己的 IP 的話就送到系統、對資料組裝、處理，經過程式的 routing 功能找到這個請求的 http 動詞與 URI 的對應函式，函式裡可能會去 DB 拿東西、進行商業邏輯的判斷...等。
最後程式會根據 HTTP 協定的格式回傳 http response 給請求方(前端)。(HTTP 除了規定溝通格式以外，還規定一定要「有求必應」(有 request 就要有 response)。)

> 關於後端的補充: 我們會在路由系統裡，定義「收到什麼 HTTP request，就執行什麼動作」。Web 開發框架通常會內建路由系統，學習框架的第一件事，就是要學習如何使用框架提供的路由系統。—— [什麼是REST? 認識 RESTful API 路由語義化設計風格](https://tw.alphacamp.co/blog/rest-restful-api)


🔖 下圖為 Internet 的應用 —— WWW(簡稱 Web)基於 HTTP 協定的溝通圖，這個看起來是 SSR (server side render)，在 server 端產完 html 後，把 html response 給前端。
![res req](/homeworks/week4/img/15-2www.png)
📓參考: [Client-side Render 和 SSR 的差別](https://noob.tw/client-server-side-render/)

🔖 下圖為基於 UDP 協定的 DNS 協定。
發 http request 前，會到 DNS 伺服器查詢 IP 位置，可是這麼長的網址不是要查很久嗎?(請看下面 [DNS](#dns) 的解釋)。總之會從最後一個(第一網域開始查)，是一個是樹狀結構的查詢，在不同層也許會跟不同 DNS 伺服器要 IP。
![dns](/homeworks/week4/img/dns.PNG)
📓圖源: [粘添壽 網路規劃與管理技術：DNS 系統功能](https://www.youtube.com/watch?v=KIv5Ks13uIM&list=PLWCTS9kq2MwQ88XuCjWXAu4ij4OQTkVqp&index=62)

🔖 下圖為 TCP/IP 協定的架構圖。網卡就是一種 Network Interface。
![tcp/ip](/homeworks/week4/img/tcpip0.PNG)
📓圖源: [Fundamentals of Network Communication](https://www.coursera.org/lecture/fundamentals-network-communications/tcp-ip-architecture-and-routing-examples-RJ6pg?authMode=signup&isNewUser=true)

---

### 先備知識(問題集)
#### 🧤 Internet 與 WWW 差別? 網路到底是指什麼?
網路就是 Internet，以 Internet 為基礎，所有電腦都可以連接再一起。
World Wide Web 簡稱 Web，以 Internet 為基礎的應用程式，它讓所有電腦可以共享訊息、透過超連結跳到另一個網頁(借 URL 與 HTTP 找到對應資源)。
- [粘添壽 15-1 WWW 系統簡介](http://tsnien.idv.tw/Internet_WebBook/chap15/15-2%20WWW%20%e7%b3%bb%e7%b5%b1%e6%a6%82%e5%bf%b5.html)
- [互联网（Internet）和万维网（World Wide Web）有什么区别？](https://www.zhihu.com/question/20597473)

#### 🧤 OSI 網路架構模式、網際網路的 TCP/IP 通訊協定?為什麼要分層?一定要照 TCP/IP 協定的順序傳資料嗎?
網路架構說明了從硬體到軟體，兩台裝置之間是如何連接再一起的、如何溝通的。
OSI 有七層，TCP/IP 通訊協定以此為基礎分成四層。
分層可以方便使用者管理與理解整個龐大的網路架構。
不一定要照 TCP/IP 順序也可以傳，只是資料的格式會不統一，收發上會比較不方便。如 NET101 說道:要規模化就要標準化。

🔖 下圖為 OSI 與 TCP/IP 的合圖。
![osi2](/homeworks/week4/img/osi2.jpg)
🔖 下圖為傳送時附加的 header，也可以看到使用 Socket API 進行 TCP 協定。 
![tcp/ip4](/homeworks/week4/img/tcpip4.PNG)

參考資料: 
- [OSI 七層](https://bubble727.pixnet.net/blog/post/9621330)
- [OSI 七層網路與 HTTP 封包之間的關係](https://icodding.blogspot.com/2015/12/osi-http.html)
- [第六章電腦網路 - 亞洲大學資訊電機學院](http://www.ccs.asia.edu.tw/ezfiles/2/1002/img/367/ITTCH061.pdf)
- [Berkeley Sockets API - I](https://www.coursera.org/lecture/fundamentals-network-communications/berkeley-sockets-api-i-O8FEw)
- [TCP/IP、Http、Socket 來探討一下](https://twgame.wordpress.com/2015/02/03/tcpiphttpsocketudp/)
  > socket 待補相關知識...

#### 🧤 HTTP 協定是什麼?在 OSI 的哪一層?
在應用層。HTTP 協定只負責伺服器和客戶端之間文件的傳輸工作，並不理會文件格式（如，HTML、VBScript、JavaScript 等等），文件格式是由瀏覽器上相對應的直譯程式來處理。—— [粘添壽 15-5 HTTP 傳輸協定](http://www.tsnien.idv.tw/Internet_WebBook/chap15/15-5%20HTTP%20%E5%82%B3%E8%BC%B8%E5%8D%94%E5%AE%9A.html)

#### 🧤 http request、http response?
基於 HTTP 協定，兩台有網卡的電腦來往溝通的方式。

🔖 下圖為 http request、http response 過程。
![res req](/homeworks/week4/img/req_res.jpg)
📓圖源: [OData – Everything that you need to know (Part 1)](https://blogs.sap.com/2016/02/08/odata-everything-that-you-need-to-know-part-1/)

#### 🧤 TCP、UDP?在 OSI 的哪一層?
🔖 下圖說明如何判斷掉封包了(利用 CHECKSUM)。
![udp](/homeworks/week4/img/udp.PNG)

🔖 下圖為 UDP 和 TCP 封包內容。
![udp](/homeworks/week4/img/udp0.PNG)
![tcp](/homeworks/week4/img/tcp.PNG)
📓圖源: [The Internet: Crash Course Computer Science #29](https://www.youtube.com/watch?v=AEaKrq3SpW8&list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo&index=30)

🔖 下圖為 TCP 和 UDP 的差別。
可看這動畫會更清楚差別。 [【啟芳看動畫學計概】UDP和TCP的比較](https://www.youtube.com/watch?v=E_UQkVDlDf8)
![tcpip2](/homeworks/week4/img/tcpudp2.PNG)
📓圖源: [Berkeley Sockets API - I
](https://www.coursera.org/lecture/fundamentals-network-communications/berkeley-sockets-api-i-O8FEw)

##### 其他不錯的動畫
[【啟芳看動畫學計概】分封交換的演進由來](https://www.youtube.com/watch?v=EIltNIpn_9c)
[【啟芳看動畫學計概】由送信簡介TCP/IP](https://www.youtube.com/watch?v=8TWGBvqbppM)

#### 🧤 URL 和 URI 差別?它們都是唯一的嗎?
URL 是 URI 的子集。只找到 URL 是不知道要做什麼的，只有找到 URI 才知道資源是啥，要幹什麼事情。使用 URL 只能找到路徑，定位不到具體的資源。而使用 URI 是肯定能找到對應資源。
所以 URI 是唯一的，資源重複會發生錯誤(不知道到底哪個才是真的)。

![res req](/homeworks/week4/img/uri_url.jpg)
📓圖源: [OData – Everything that you need to know (Part 1)](https://blogs.sap.com/2016/02/08/odata-everything-that-you-need-to-know-part-1/)
📓參考: [URL 和 URI 區別？](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/53793/)

#### 🧤 DNS 是什麼?我可以知道它在哪理嗎?
🔖 下圖為網域(Domain) 的結構。
網域名稱系統（英語：Domain Name System，縮寫：DNS）是網際網路的一項服務。讓人可以從域名找到 IP，也可以從 IP 找到域名。可以下  `nslookup` 來查 IP 與網域名稱資訊。從最後一個網域(第一網域)開始往前樹狀查詢。
![domain](/homeworks/week4/img/domain_structure.PNG)

- [如何清除DNS快取 (Flush DNS)](http://punk-it123.blogspot.com/2011/11/dns-flush-dns.html)
- [WHOIS,DNS,nslookup的指令](https://blog.xuite.net/leocat999/aming/214503310-WHOIS%2CDNS%2Cnslookup%E7%9A%84%E6%8C%87%E4%BB%A4)


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
HTTP status code 表明 HTTP 要求是否已經被完成。回應分五種:
- 1xx 資訊回應
- 2xx 成功回應
- 3xx 重定向
- 4xx 用戶端錯誤
- 5xx 伺服器錯誤

200 OK 頁面應更新為新頁面、301 Found、400 Bad Request、404 Not Found、500 Internal Server Error。

1. 415 Unsupported Media Type
伺服器要求 json 結果你傳 form-data 就會出現這個。
被請求資源的多媒體類型不被伺服器支援，因此該請求被拒絕。

2. 304 Not Modified
檔案沒有更新，可繼續使用被快取起來的資源。

3. 204 No Content
伺服器成功處理了請求，沒有返回任何內容。

參考:
- [HTTP狀態碼](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

- Base URL: https://api.example.com/v1

- ResturantController
  提供餐廳資料的 CRUD，首行為 HTTP 動詞、說明、path，後面有請求參數 parameter、回應格式 response。

1. get   所有餐廳資料  /resturant
    - parameter
      無。
    - response
      200
      ``` json
      {
        "isSuccess": true,
        "returnCode": "string",
        "returnMessage":  "string",
        "data": [{
          "id": 0,
          "name": "string",
          "photoUrls": [
            "string"
          ]
        }]
      } 
      ```     
1. get   單一餐廳資料  /resturant/:id
  範例: /resturant/10
    - parameter
      - 必填 
        | 欄位名| 型態 | 說明|
        |---|---|---|
        | id | integer($int64) | 餐廳 id |

    - response
    200
      ``` json
      {
        "isSuccess": true,
        "returnCode": "string",
        "returnMessage":  "string",
        "data": {
          "id": 0,
          "name": "string",
          "photoUrls": [
            "string"
          ]
        }
      } 
      ```     

1. post  刪除餐廳 /resturant/DelResturant
    - parameter
      - 必填 
        | 欄位名| 型態 | 說明|
        |---|---|---|
        | id | integer($int64) | 餐廳 id |

    - response
    200
      ``` json
      {
        "isSuccess": true,
        "returnCode": "string",
        "returnMessage":  "string"
      } 
      ```     

1. post  新增餐廳  /resturant/CreateResturant
    - parameter
      - 必填 object
      ``` json
      {
        "name": "string",
        "photoUrls": [
          "string"
        ]
      } 
      ```   
    - response
    200
      ``` json
      {
        "isSuccess": true,
        "returnCode": "string",
        "returnMessage":  "string"
      } 
      ```     
1. post  更改餐廳資料  /resturant/UpdResturant
    - parameter
      - 必填
      ``` json
      {
        "id": 0,
        "name": "string",
        "photoUrls": [
          "string"
        ]
      } 
      ```   
    - response
    200
      ``` json
      {
        "isSuccess": true,
        "returnCode": "string",
        "returnMessage":  "string",
      } 
      ```     
---

## 自我檢測
1. 你知道網路背後大概的運作模式
    這兩個咚咚還沒看完@@
    - [TCP/IP 協定與 Internet 網路 ](http://tsnien.idv.tw/Internet_WebBook/Internet.html)
      本書是針對系統工程師維護或架設網路設計的教材，著重於 Ethernet 網路架設、IP 網路連結、TCP Socket 介面、RPC 網路程式開發。
      了解基礎建設之後，接著再介紹主從式架構，以及 Internet 網路應用系統，Internet 網路發展數十年，基本架構還是不變。
      對於有意從事 MIS 工作者，是不可或缺的基本能力。
    - [網路規劃與管理技術](http://www.tsnien.idv.tw/Manager_WebBook/NetworkManager.htm)
      讓學生了解 TCP/IP 網路的運作原理。
      使學生具有規劃與管理資訊網路之能力。

1. 你知道什麼是 Request 跟 Response
  前後端溝通的方式: 請求與回應。

1. 你知道什麼是 DNS 以及運作原理
  網域名稱系統 Domain Name System，往上看 [DNS](#dns)。

1. 你知道 HTTP 與 HTTPS 的差異
  對封包有無加密。HTTPS 用 TLS 來加密封包。

1. 你知道 localhost 跟 127.0.0.1 是什麼
  localhot：是不經網絡卡傳輸的，它不受網路防火牆和網絡卡相關的的限制。
  127.0.0.1：是通過網絡卡傳輸的，它依賴網絡卡，並受到網路防火牆和網絡卡相關的限制。
  IPV6 協議將 127.0.0.1 解析為 ::1 (127.0.0.1 ipv6的形式)

    > 關於從網域找 IP 補充: 我們在瀏覽器輸入 google.com (網域) 的時候，電腦會先去解析它對應到哪個 IP，快取沒有的話就去 hosts 檔案找。
    所以我們可以利用網域→IP 特性，到 hosts 檔案把有問題的網域對應的 IP 改成自己的，這樣就算去拜訪有危險的網域，也不會真的前往他們的 server。
    [利用 hosts 檔案保護你的上網環境](https://blog.miniasp.com/post/2009/03/26/Using-hosts-file-protect-your-networking-environment)

1. 你知道 GET 與 POST 的差別
GET 為取得資源、有限制大小，資料以 Query String（一種Key/Vaule的編碼方式）加在我們要請求的地址(URL)後面。
POST 為傳送資源，資料帶在 body(payload) 裡，可以透過 header 的 請求標頭 Accept、設定傳到伺服器的資料格式(Content-Type)。

    > Content-Type 常見的格式類型如下：(來源: [Postman 常見的 Content-type](https://medium.com/hobo-engineer/ricky%E7%AD%86%E8%A8%98-postman-%E5%B8%B8%E8%A6%8B%E7%9A%84-content-type-b17a75396668))
    text/html ： HTML格式
    text/plain ：純文本格式
    text/xml ： XML格式
    image/gif ：gif圖片格式
    image/jpeg ：jpg圖片格式
    image/png：png圖片格式
    以application開頭的媒體格式類型：
    application/xhtml+xml ：XHTML格式
    application/xml ： XML數據格式
    application/atom+xml ：Atom XML聚合格式
    application/json ： JSON數據格式
    application/pdf ：pdf格式
    application/msword ： Word文檔格式
    application/octet-stream ： 二進制流數據（如常見的文檔下載）
    application/x-www-form-urlencoded ：`<form></form>`中默認的格式，form表單數據被編碼為key/value格式發送到服務器（表單默認的提交數據的格式）
    另外一種常見的媒體格式是上傳文檔之時使用的：
    multipart/form-data ： 需要在表單中進行文檔上傳時，就需要使用該格式
    以上就是我們在日常的開發中，經常會用到的若干content-type的內容格式。

1. 你知道常用的 HTTP Header
可，google 到很多。

1. 你知道什麼是 API
如上文。

1. 你會使用 node.js 寫出串接 API 的程式
用套件，如 hw1-4。

1. 你知道 HTTP method 有哪些
GET、POST、DELET、PUT、PATCH、OPTION....

1. 你知道基本的 HTTP statud code，像是 200、301、400、404、500
如上文。