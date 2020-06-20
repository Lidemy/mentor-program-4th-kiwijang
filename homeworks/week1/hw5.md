## hw5：簡答題

### 請解釋後端與前端的差異。
1. 後端與前端的差異
- 後端 - 負責與 DB 溝通並將撈到的資料傳給前端使用。
- 前端 - 負責使用(html、css、javascript)將後端傳來的資料顯示在 browser 上。

### 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。
1. 前端使用 browser 的物件偵測到使用者輸入 'JavaScript' 字串、按下 Enter 的動作，此動作觸發了一個方法。
2. 這個方法讓前端發送 request 到後端，若連線成功，後端收到 request 並回送 response 給前端。
3. 前端以 js 讀取 response 並以 html 和 css 顯示查詢結果的畫面。 

### 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用
1. ```date``` 顯示或設定日期。

2. ```exit``` 結束 CMD.EXE 程式 (指令直譯器)。

3. ```ipconfig``` 顯示 IP 位址...等 (其實還不太懂網路相關東西xd)。
使用 ```ipconfig /?``` 查看說明
```
預設是僅顯示每個繫結到 TCP/IP 之介面卡的 IP 位址、子網路遮罩及預設閘道。對於 Release 與 Renew，如果沒有指定介面卡名稱，則會釋放或更新所有繫結到
TCP/IP 介面卡的 IP 位址租用。

對於 Setclassid 與 Setclassid6，如果沒有指定 ClassId，則將移除 ClassId。

範例:
    > ipconfig                       ... 顯示資訊
    > ipconfig /all                  ... 顯示詳細資訊
    > ipconfig /renew                ... 更新所有介面卡
    > ipconfig /renew EL*            ... 更新所有名稱開頭為 EL 的連線
    > ipconfig /release *Con*        ... 釋放所有符合的連線，
                                         例如 "Wired Ethernet Connection 1" 或
                                              "Wired Ethernet Connection 2"
    > ipconfig /allcompartments      ... 顯示所有區間的相關資訊
    > ipconfig /allcompartments /all ... 顯示所有區間的詳細資訊
```

### 挑戰題
現在請你寫一個 shell script，可以傳入一個數字 n，然後會產生 1~n 個檔案，檔名是 `{number}.js`。
舉例來說：`./num.sh 10`會產生`1.js`、`2.js`...`10.js`。

- 在 shell script 裡面寫迴圈吧！
``` bash
#!/bin/bash

read -p "輸入你要產生幾個 js(請輸入正整數): " num
i=1
while [ $i != $(($num+1)) ]
do
        touch "$i.js"
        i=$(($i+1))
done
echo "產生成功!目前位在:"
pwd
echo "內有檔案:"
ls
```

### 超級挑戰題
請寫一個`github.sh`，可以傳入一個參數 username，執行之後就會輸出這個 GitHub 使用者的暱稱、介紹、地點跟個人網站。

- 你知道嗎？用這個網址可以取得使用者的資料：https://api.github.com/users/aszx87410

- cut, grep, sed, awk 這些指令都是字串處理的好夥伴

``` bash
#!/bin/bash
read -p "請輸入 github 帳號: " user
touch curlResult.txt
url='https://api.github.com/users/'${user}
curl $url > curlResult.txt
echo "取得結果:"
echo " "
echo "使用者暱稱:"
sed -E 's/\},\s*\{/\},\n\{/g' curlResult.txt | grep '"name"' | cut -d '"' -f 4  
echo " "
echo "介紹:"
sed -E 's/\},\s*\{/\},\n\{/g' curlResult.txt | grep '"bio"' | cut -d '"' -f 4
echo " "
echo "地點:"
sed -E 's/\},\s*\{/\},\n\{/g' curlResult.txt | grep '"location"' | cut -d '"' -f 4
echo " "
echo "個人網站:"
sed -E 's/\},\s*\{/\},\n\{/g' curlResult.txt | grep '"blog"' | cut -d '"' -f 4
```

### 小結
硬幹的東西xd 而且裡面還沒有照鳥哥教學寫 PATH (因為一時看不懂，以後有時間和需求再回頭補 PATH 是什麼xD) 應該多寫些判斷不然很容易壞掉xdd 入門 shell script 覺得蠻開心的xD 不過以後工作上有可能會用到的應該是 power shell。