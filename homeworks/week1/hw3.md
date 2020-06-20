## hw3：教你朋友 CLI
> 有天，你的麻吉 h0w 哥跑來找你說：「欸！能不能教我 command line 到底是什麼，然後怎麼用啊？我想用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。就交給你了，教學寫好記得傳給我，ㄅㄅ」

> 可...可惡，居然這樣子就跑走了。但因為他是你的麻吉，所以你也沒辦法拒絕。

> 因此這個作業要請你寫一篇簡短的文章，試圖教會 h0w 哥什麼是 command line 以及如何使用，並且要教他如何達成他想要的功能。

## 1. command line 到底是什麼?
我們現在打開電腦所看到的畫面稱為 GUI(Graphical User Interface)，可以操作介面來讓電腦執行對應的行為。

而 CLI(Command-Line Interface) 就是還沒圖形介面(GUI)可用時，我們與電腦之間的溝通方式(命令電腦執行對應的行為)。

## 2. 怎麼用?
就像你媽叫你吃飯一樣。
你媽就是使用者，你就是電腦。
> 媽: **吃飯** → 你: **喔(還不一定會去吃)**

> 使用者: **顯示文字檔案的內容** → 電腦: (去執行 **顯示文字檔案的內容** 的動作，只要輸入正確且指令存在電腦都會去執行(不像你...))

因為輸入一堆字實在太累人了(生命應浪費在美好的事物上)，所以 cli 將很多動作，縮寫成一句句的指令。只要照著遊戲規則走，就可以讓電腦執行你的指望啦~

## 3. 如何建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。

### 第一步
打開 cmd(Command shell 命令提示字元)就可以達到你的需求。

### 第二步
你要在哪裡建立新資料夾?
如果要換槽，譬如 d 槽，請打
```d:```
然後使用 cd <路徑> 轉到你要的位置(如果沒有換槽直接 cd 即可)。
- ```cd <路徑>```
> 恭喜你移到你想要放檔案的地方了。
### 第三步
使用 mkdir 在此路徑下新增資料夾(注意:這指令只能產生資料夾，產生檔案要用其他的指令)。
- ```mkdir wifi```
> 恭喜你新增了一個名為 wifi 的資料夾。
### 第四步
接著我們要在 wifi 裡面新增檔案，所以要移到 wifi 裡面。
- ```cd wifi```
然後在這裡新增一個檔案。
- ```type nul > afu.js```
顯示空值到 afu.js 裡。
> 恭喜你新增了一個名為 afu.js 的檔案。

這樣你就完成你想做的事了。
我們使用了 ```cd```、```mkdir```、```type```、```>``` (redirect)，共四個指令。

---
這時你也許會好奇 type 到底是什麼?有沒有除了 google 以外的解決方式?
這時可以使用 ```help``` 指令來幫助你。
- ```help type```

這時會顯示 ```type``` 的作用與用法
> ```顯示文字檔案的內容。 TYPE [drive:][path]filename```

你說你看不懂 ```[drive:][path]``` 是什麼?
我們來看看 ```cd``` 指令的解說
- ```help cd```
```
CHDIR [/D] [drive:][path]
CHDIR [..]
CD [/D] [drive:][path]
CD [..]

  ..   指定變更到上層目錄。

輸入 CD drive: 即可顯示指定磁碟機的目前工作目錄。
僅輸入 CD 而不加參數，即可顯示目前的磁碟機和目錄。

使用 /D 參數可以同時變更工作磁碟機及其工作目錄。

如果您啟用擴充命令，CHDIR 的變更如下:

目前的目錄字串會被轉換成與磁碟上名稱相同大小寫的字串。
所以如果磁碟上的目錄是 C:\Temp 的話，CD C:\TEMP 命令實
際上會轉換為 CD C:\Temp。

CHDIR 命令不會將空格當成分隔字元，所以如果您要切換到含
有空白字元的目錄時，就算您不使用引號來括住目錄名稱，也
一樣可以用 CD 命令切換到該目錄。例如:

    cd \winnt\profiles\username\programs\start menu

就相等於:

    cd "\winnt\profiles\username\programs\start menu"

如果您停用擴充命令，就必須輸入前一種命令。
```
這樣有比較懂 ```[drive:][path]``` 是什麼了嗎?
還是不懂的話也沒關西，因為被 ```[]``` 包起來的東西，是可有可無的、有沒有寫都沒關西。
[drive:] 磁碟機名字:
[path] 路徑

---
#### 我覺得比較難的地方 - 路徑
參考鳥哥的文章
- [第六章、Linux 檔案與目錄管理](http://linux.vbird.org/linux_basic/0220filemanager.php#dir_pathway)

#### 參考資料
- [Unix 與 MS-DOS 指令對照表](http://163.28.10.78/content/primary/info_edu/cy_sa/LinuxY/cmd/dos2unixcmd.htm)
- [保哥-介紹好用工具：Cmder ( 具有 Linux 溫度的 Windows 命令提示字元工具 )](https://blog.miniasp.com/post/2015/09/27/Useful-tool-Cmder)
- [程式語言的類別](http://www.chwa.com.tw/TResource/HS/book2/ch5/ch5-1.htm)
- [shell 是什麼？](https://ithelp.ithome.com.tw/articles/10207473)
- [Chapter 11 Shell 和 Shell Script](https://www.cyut.edu.tw/~ywfan/1109linux/201109chapter11shell%20script.htm)
> 所有的電腦都是由**硬體**和**軟體**構成的﹐**而負責主要運算**的部分就是所謂**作業系統的核心(kernel)**﹐kernel 必須能夠接受來自鍵盤的輸入﹐然後交由 CPU 進行處理﹐最後將執行結果輸出到螢幕上。

比方說﹐輸入 pwd 命令﹐我們知道這是 print working directory 的意思﹐**但作為 kernel 來說﹐它並不知道 pwd 是什麼﹐這時候﹐shell 就會幫我們將 pwd 翻譯為 kernel 能理解的程式碼**。所以﹐我們在使用電腦的時候﹐**基本上就是和 shell 打交道﹐而不是直接和 kernel 溝通**。
小結: shell 就是電腦的翻譯蒟蒻，我們輸入的指令 → Shell(**翻譯**) → Kernel(**運算**) 接受來自鍵盤的輸入﹐然後交由 CPU 進行處理﹐最後將執行結果輸出到螢幕上。

從字面來解析的話﹐shell 就是"殼"﹐kernel 就是"核"。shell 就是使用者和 kernel 之間的界面﹐將使用者下的命令翻譯給 kernel 處理。
![Leanpub](/homeworks/week1/img/cli_w1.jpg)
- [shell、cmd、dos和腳本語言區別和聯系](https://www.itread01.com/content/1499270537.html)
> cmd 屬於 windows 系統的一部分，dos 本身就是一個系統。
> 問題四：**腳本語言和普通的編程語言有什麽區別？**
編程語言 "編寫-編譯-鏈接-運行"，腳本語言是"解釋-執行"而非編譯，腳本語言的程序代碼即使最終的可執行文件，通過對應的解釋器解釋執行即可，所以更方便快捷。每種腳本語言都需要其對應的解釋器。如Perl、Python、Ruby、JavaScript等都是腳本語言，shell也屬於一種比較特殊的腳本語言。
- [Windows 命令](https://docs.microsoft.com/zh-tw/windows-server/administration/windows-commands/windows-commands)
> Windows has two command shells: The Command shell and PowerShell.
- [Keyboards & Command Line Interfaces: Crash Course Computer Science #22](https://www.youtube.com/watch?v=4RPtJ9UyHS0)

- [Screens & 2D Graphics: Crash Course Computer Science #23](https://www.youtube.com/watch?v=7Jr0SFMQ4Rs)

#### 小結
shell 真是神奇。讓我接觸了打字到 CLI 再到 GUI 的歷史。
也讓我知道硬體與使用者的溝通原來這麼深奧。
以後要補足的地方除了 cmd 的批次檔功能，更希望有機會使用 power shell 來幫助開發。
