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
