## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫
雜湊無法解密，加密可以解密。  
相同內容做雜湊後的結果會一樣，所以會需要加鹽再雜湊，避免駭客利用彩虹表破解密碼。

## `include`、`require`、`include_once`、`require_once` 的差別
都是用來引入檔案，引不到檔案會出現錯誤息。  
- include 和 include_once  
後者只引入一次。引不到檔案，程式不會停止。  
- require 和 require_once  
後者只引入一次。引不到檔案，程式會停止執行。  

## 請說明 SQL Injection 的攻擊原理以及防範方法
讓使用者直接下 sql 執行語法，讓駭客可以拼字串來執行非原本用途的 sql 查詢。(譬如: 本來只是新增，被註解掉、變成刪除)
防範方法為：避免在程式中使用來自使用者端的字串直接下查詢。
要對來自使用者端的字串做處理，以 PHP 為例是使用 `prepare` 和 `bind_param` 來將字串變 sql 參數做查詢。
``` php
$sql = sprintf(
    "insert into naomi_comments(user_id,content)
    values(?,?)",
    $id,
    $content
  );
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $id, $content);
  $result = $stmt->execute();
```
另外也可先在使用者端做驗證，來避免使用者無心的操作造成問題。前後端都驗證會更安全。

##  請說明 XSS 的攻擊原理以及防範方法
XSS 全稱為 Cross Site Scripting，中翻跨網站指令碼攻擊。
根據這篇文章[摘喵喵 - 【網頁安全】給網頁開發新人的 XSS 攻擊 介紹與防範](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267)
XSS 分為:
1. Stored XSS (儲存型)
1. Reflected XSS (反射型)
1. DOM-Based XSS (基於 DOM 的類型)
攻擊者利用存到資料庫的資料，讓網站顯示文字以外的東西。(譬如:打 `<script>` 標籤執行某些動作、在有 innerHTML 的地方讓 DOM 改變、讓網址列改變。)
防範方法為: 在瀏覽器上顯示資料前，先處理字串、跳脫字元，以防資料變成字串以外的程式碼。

另外，使用者應該少安裝來路不明的瀏覽器外掛程式，以防套件在你不知情的情況下偷走你的資料。

## 請說明 CSRF 的攻擊原理以及防範方法
CSRF，Cross Site Request Forgery(跨站請求偽造)。
攻擊者偽造成你，對網站進行你不知道的請求。
網站如果使用 cookie 儲存驗證身分，攻擊者可以偷走你的 cookie 來進行登入(偽造成跟你登入時一模一樣的 cookie)。
防範方法為:
- 網頁開發者要為 cookie 設定過期時間，並強制使用者定期更換密碼，讓偷走 cookie 的人不能即時更新偷到的 cookie。
- 設定 HttpOnly 讓攻擊者無法透過 javascript 來操作 cookie。
- 限制發出請求的網域，只接受白名單網域所發出的請求。
- 在使用者端加入由 server 產生的驗證 token，token 是由 server 產生、
加密存在 server 端，只有 server 知道密碼，並定時過期，
使用者若需使用功能，必須提供這個 server 給的 token 進行驗證，並在 token 過期前完成操作。
- 雙因素驗證: 使用者發送請求後，使用者須提供 server 除了帳密以外可以認定是本人的東西再次登入(譬如:手機接收簡訊、只有使用者知道的通關密碼)。
- 檢查使用者 ip 位置與電腦是否與平常使用的一樣。如果不一樣，須要求使用者重新登入。
- 限定加密連線 Secure，以防有人監聽你的封包。
這樣除非攻擊者直接到你未登出的電腦進行操作，不然很難取得你的 cookie、長時間使用你的 cookie 或偽造成你進行登入。