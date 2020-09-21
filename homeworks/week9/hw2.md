## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
[根據 MySQL 8.0 說明書](https://dev.mysql.com/doc/refman/8.0/en/string-type-syntax.html)

1. `[NATIONAL] VARCHAR(M) [CHARACTER SET charset_name] [COLLATE collation_name]`  
    - M 表示欄位最長是多少字元。  
    M 的範圍是 0 到 65,535 ($2^16$ − 1) 字元(一個字元 1 bit 的話，每個欄位大小範圍: 0KB ~ 64KB($2^6$*$2^10$)；一個字元 16 bit 的話，每個欄位大小範圍: 0KB ~ 1MB(64KB * 16=1024KB))。
    - 有效的最大長度取決於這一列(row)的最大尺寸(size)和字元(character)的設定。
    - 譬如，utf8 的每個字元可以具有 3 位元組的大小，所以一個設定為 utf8 字元的 VARCHAR 欄位代表可以裝下 21,844 個字元(一個字元 1 bit 的話，原本 65,535 / 3 - 1，大概 21.4KB 以下(21,844 / $2^10$))。
    > 原文: A variable-length string. M represents the maximum column length in characters. The range of M is 0 to 65,535. The effective maximum length of a VARCHAR is subject to the maximum row size (65,535 bytes, which is shared among all columns) and the character set used. For example, utf8 characters can require up to three bytes per character, so a VARCHAR column that uses the utf8 character set can be declared to be a maximum of 21,844 characters. See Section 8.4.7, “Limits on Table Column Count and Row Size”.
    
    - VARCHAR 的值會有一個 1 位元組或 2 位元組的前綴。前綴長度代表這個值佔了幾個位元組(bytes)。如果該值小於 255 bytes 就用一個長度位元組(one length byte)，如果長度大於 255 bytes 就用兩個長度位元組(two length bytes)。
    > 原文: MySQL stores VARCHAR values as a 1-byte or 2-byte length prefix plus data. The length prefix indicates the number of bytes in the value. A VARCHAR column uses one length byte if values require no more than 255 bytes, two length bytes if values may require more than 255 bytes.

    - VARCHAR 是 CHARACTER VARYING 的速記(shorthand)。NATIONAL VARCHAR 是以 SQL 標準來定義 VARCHAR 欄位需要預先指定字元集(character set)。

    - 而 MySQL 的預設字元集(character set)是 utf8。
    > 原文: VARCHAR is shorthand for CHARACTER VARYING. NATIONAL VARCHAR is the standard SQL way to define that a VARCHAR column should use some predefined character set. MySQL uses utf8 as this predefined character set. Section 10.3.7, “The National Character Set”. NVARCHAR is shorthand for NATIONAL VARCHAR.

2. `TEXT[(M)] [CHARACTER SET charset_name] [COLLATE collation_name]`
    - 最大長度 65,535 ($2^16$ − 1) 字元，如果該值有多位元組的字元，有效的最大長度會比較小。(譬如:設定 12 可以裝下 12 個半形的字、但只能裝得下 6 個全形的字。)

    - 每個 TEXT 的值會有 2 位元組的前綴，來表示 TEXT 的值用了多少位元組。    
    > 原文: A TEXT column with a maximum length of 65,535 ($2^16$ − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each TEXT value is stored using a 2-byte length prefix that indicates the number of bytes in the value.

    - MySQL 會留 TEXT type 的大小的欄位來裝 M 個字元長度。
    > 原文: An optional length M can be given for this type. If this is done, MySQL creates the column as the smallest TEXT type large enough to hold values M characters long.

### 小結
看起來定義都一樣有前綴(prefix)，欄位最大 65,535 字元。
VARCHAR 可以自訂最大字元大小(0 到 65,535)，TEXT 不能自訂長度、最大到 65,535 字元。 

根據 MySQL 8.0 說明書 [11.3.4 The BLOB and TEXT Types](https://dev.mysql.com/doc/refman/8.0/en/blob.html)
> In most respects, you can regard a BLOB column as a VARBINARY column that can be as large as you like. Similarly, you can regard a TEXT column as a VARCHAR column. BLOB and TEXT differ from VARBINARY and VARCHAR in the following ways:
> - For indexes on BLOB and TEXT columns, you must specify an index prefix length. For CHAR and VARCHAR, a prefix length is optional. See Section 8.3.5, “Column Indexes”.
> - BLOB and TEXT columns cannot have DEFAULT values.
- 當要設定索引的時候，BLOB/TEXT 必須指定索引前綴(prefix)長度，CHAR/VARCHAR 的前綴長度可填可不填。
- BLOB/TEXT 不能有預設值。

> Each BLOB or TEXT value is represented internally by a separately allocated object. This is in contrast to all other data types, for which storage is allocated once per column when the table is opened.
- BLOB/TEXT 是指向物件。其他資料類型是當資料表打開的時候才指向各個欄位。

因為看不懂這句話到底是在說什麼。
所以查到，這篇文章 [Choosing Between VARCHAR and TEXT in MySQL 2020-02-19](https://www.navicat.com/en/company/aboutus/blog/1308-choosing-between-varchar-and-text-in-mysql) 說道:  
> TEXT is stored off table with the table having a pointer to the location of the actual storage.
Using a TEXT column in a sort will require the use of a disk-based temporary table, as the MEMORY (HEAP) storage engine.

大意應該就是 CHAR/VARCHAR 的資料是 inline table，資料本體就在 table 裡。
而 BLOB/TEXT 的資料是存指標(pointer)，資料本體在 table 外面。所以需要磁碟空間來暫存這些資料本體。

參考: 
- [維基百科 - 位元組](https://zh.wikipedia.org/wiki/%E5%AD%97%E8%8A%82)
- [How many bits or bytes are there in a character?](https://stackoverflow.com/questions/4850241/how-many-bits-or-bytes-are-there-in-a-character)
  > all contemporary versions of Windows use 16-bits internally per character.

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
HTTP 是一種無狀態的、採用請求/回應訊息交換模式的傳輸協定。要在網路上識別使用者的身份，必須透過一些機制來保存狀態。而 Cookie 就是其中一種保持狀態的機制。

回應的時候 server 端可以使用 Set-Cookie header 要求瀏覽器設定 cookie(另外還可以設定過期日 `Expires` 或時間長度 `Max-Age`、限定加密連線 `Secure` 、不能讓 js 存取的 `HttpOnly`、作用網域 `Domain`、網址路徑 `Path`):   
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
``` 
而之後的請求瀏覽器會將之前儲存的所有 cookie 傳給 server 端:  
```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```
![cookie](/homeworks/week9/img/cookie.png)
圖源: [Piraveena Paralogarajah - Sessions and cookies](https://medium.com/@piraveenaparalogarajah/sessions-and-cookies-2c0919552f29)

參考資料:
- [MDN - HTTP cookies](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies)
- [Wiill - 解釋 Cookie 的特性](https://blog.miniasp.com/post/2008/02/22/Explain-HTTP-Cookie-in-Detail)

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
跟著 [BE101] 裡用 cookie 實作 token，後來改成用 session 替代，再來:
- 使用 php 的 `password_hash()`、`password_verify()`，利用 hash 解決密碼明碼問題。參見: handle_register.php 15 行、handle_login.php 36 行。
- 使用 php 的 `htmlspecialchars()` 解決 xss 問題。 參見: utils.php 24~26 行。
- 使用 php 的 `prepare statement` 來解決駭客可以直接拼字串來對資料庫進行操作的 sql injection 問題。參見: handle_login.php 17~28 行。

潛在的問題:
- 前端驗證沒有做:
  1. 密碼沒有限制一定要訂大小寫、特殊符號、數字等限制，很容易重複。
  2. 登入沒有限制輸入次數或雙因素驗證，可以讓駭客暴力破解。
  3. 前端欄位沒有限制長度，太長的話會存進去 DB 但是會被 DB 截斷。
- 後端驗證沒有做:
同前端驗證、檢查長度和型態。
- 表單的 CSRF token 沒做。

## 自我檢測
- P1 你知道 PHP 是什麼  
  後端語言，web server 接收請求傳送回應，而 php 可以處理請求並傳回應給 web server。  
- P1 你知道前端與後端的差別  
  前端:供使用者操作的介面，後端:包含 web server、後端語言處理。  
- P1 你知道什麼是資料庫  
  拿來儲存資料的程式。  
- P1 你了解基本的 SQL 語法，包括 Select、Insert Into、Delete 與 Update  
  - Select
    ```sql
    SELECT table_column1, table_column2, table_column3... 
    FROM table_name;
    ```
  - Insert Into
    ```sql
    INSERT INTO table_name (column1, column2, column3...) 
    VALUES (value1, value2, value3...);
    ```
    注意 values 有 s。
  - Delete
    ```sql
    DELETE FROM table_name
    WHERE column_name operator value;
    ```
    要記得加 where 不然會刪掉全部資料。
  - Update    
    ```sql
    UPDATE table_name
    SET column1=value1, column2=value2, column3=value3···
    WHERE some_column=some_value;
    ```
    要記得加 where 不然會修改全部資料。

- P1 你能夠寫出基本的 CRUD 應用  
  可。  
- P1 你知道什麼是 Session  
  http 是無狀態的、一種採用請求/回應來進行訊息交換的傳輸協定。
  http 協定的目的在確保用戶端將請求封包發送給目標伺服器，並成功接收來自服務端地回應封包，這個基本的封包交換被稱為一個 http 交易(Transaction)。

  由於 http 是無狀態的通訊協定，每個 HTTP Transaction 都像兩個沒記憶的人在交流(他們只會記得當下的一問一答)，但有時候需要將這些一問一答互相關聯，變成有意義的一連串問答。
  (維根斯坦的語言遊戲說：維根斯坦認為，一個單詞、一個句子只有在玩有規則的遊戲時才有意義。)

  總之，現在需要建立兩者之間的語境，所以要在應用層建立一個上下文(Context)來儲存多次訊息交換的狀態，我們將其稱為 Session(會話/階段)。
  ![Session](/homeworks/week9/img/session.png)
  參考: [HTTP: The Definitive Guide by David Gourley, Brian Totty, Marjorie Sayer, Anshu Aggarwal, Sailu Reddy](https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch01s04.html
)
- P1 你知道什麼是 Cookie  
  Cookie 是一種讓網頁保存狀態的機制。

- P1 你知道 Session 與 Cookie 的差別  
  Session 像是一個有範圍(生命週期)的容器，而在這之中可以使用 Cookie 來儲存範圍內各個請求回應的狀態。  
  首先可以透過 Server 端的回應標頭 `Set-Cookie` 要求瀏覽器將該 Cookie 儲存在 Client 端，並在之後的請求透過請求標頭 `Cookie` 來傳遞存在 Client 端的值。
