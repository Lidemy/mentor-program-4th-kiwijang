## hw1：交作業流程
> 請用文字一步步敘述應該如何交作業。

### 第一步、將檔案 clone 到本機資料夾
![gitclone](/homeworks/week1/img/git_w1_2.png)
1. 打開 cmd 或 git bash
1. 使用 ```cd <path>``` 移到要存放檔案的路徑
2. ```git clone <專案 url>```
檔案就會以一個資料夾的形式，從 github 下載到這個路徑底下了。
![folder](/homeworks/week1/img/git_w1_1.jpg)
3. ```git init```
讓這個檔案可以使用 git 的功能。

---

### 第二步、在本機開新分支，並從目前位置(master)移新分支上
1. ```git branch <branch 名稱>```
開新分支。
2. ```git checkout <branch名>```
移到新分支上。然後就可以開始寫作業了^^

---

### 第三步、撰寫作業時
1. ```git status```
使用此指令查看哪些檔案狀態改變了(如:新增、修改、刪除)。
2. ```git add .```
使用此指令檔案會 on stage (use "git add" to track)，
也就是說，把此目錄下 **所有狀態已改變的檔案**(.) **加入**(add)到
可以被 commit 的區域。
- 註解: 如果要整個專案改動都 add 請使用 (--all)，而非僅在此目錄下的變動 (.) 

> git 有 3 區：工作區、暫存區、儲存區。
你一旦 `git init` ，此目錄底下就是 **工作區**，git 就像個監視錄影機，監視著在工作區裡檔案的各種變動，當你對檔案 `git add .` git 會立刻「拍一張照片」記錄當下的檔案狀態並把照片放在檯子上— **暫存區**，你可以 `git commit -m "最初的悸動"` 寫下這張照片的註解，同時，照片會來到 git 的 **儲存區** 就像中藥櫃一樣，git 打開其中一個櫃子，並幫你在櫃子外貼上專屬編號、你的註解...等資訊，輕輕闔上。你隨時都可以回來這個櫃子找這張照片。
3. ```git commit -am '訊息內容'```

---

### 第四步、將本機分支 push 到遠端、並發 pr
1. ```git push <遠端分支名稱 譬如:origin master>```
將本機檔案 push 到雲端。
2. 到此專案的 github 頁面發 pull request。

#### 等待助教
等助教改完，助教會 merge 回雲端 master(助教還會順便刪你雲端分支)。
#### 請確認助教已經把雲端分支 merge 到雲端 master
而我就可以刪掉自己此週本機分支(其實不刪也可以只是會很亂xd)，然後 pull 最新的 master 到本機 master。

---

##### 補充:官網解釋參數
> -a
> --all
> - Tell the command to automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected.

使用 ```git commit -am '訊息內容'``` 時，要是你忘記 ```git add . ```，Git 在 commit 同時也會幫你把全部有**修改刪除**的地方 commit 出去(但是**新增**的檔案 git 不會幫你 git add 喔)。

---
###　突然想到
一開始會想把 commit 拆的細一點，改一點就說明這次 commit 在做哪一件事。
不過後來讓合作的其他人抱怨我的 commit 太多讓畫面很亂，所以就變成 message 寫很長，一個 commit 包很多檔案 xd

然後以為用 rebase 可以合併各個 commit，結果一不小心 rebase 了兩次，所有 commit 都變成雙胞胎 xdd

現在覺得分細一點也沒關西，主要是要用 rebase，可以少顯示一個 merge 的 commit xd

### 買了為自己學 git 的書
覺得那個賣電子書的 Leanpub 網站太酷了，他會設定最低多少錢，你可以往上提升書的價格。
![Leanpub](/homeworks/week1/img/git_w1_3.jpg)

---
### 參考資料
- [Git reset 的三種模式( soft mixed hard )比較](https://ithelp.ithome.com.tw/articles/10187303 )
> 從這篇文章知道「狀態」
- [官網 - 2.2 Git Basics - Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)

- [為你自己學 Git](https://gitbook.tw/)
> 從這本書知道 git 的 3 區與版控的一點點歷史。