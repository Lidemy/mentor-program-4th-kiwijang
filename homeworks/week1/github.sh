#!/bin/bash
# 使用方式為(請在 bash 中輸入):
# 
# ./github.sh <要搜尋的帳號>
# 或
# sh github.sh <要搜尋的帳號>
# 
# 如: sh github.sh aszx87410

url='https://api.github.com/users/'$1

echo '搜尋網址:' $url
echo "取得結果:"
echo -e "=======================================================\n"
echo "使用者暱稱:"
curl -s $url | sed -E 's/\},\s*\{/\},\n\{/g' | grep '"name"' | cut -d '"' -f 4  
echo -e "\n"
echo "介紹:"
curl -s $url | sed -E 's/\},\s*\{/\},\n\{/g' | grep '"bio"' | cut -d '"' -f 4
echo -e "\n"
echo "地點:"
curl -s $url | sed -E 's/\},\s*\{/\},\n\{/g' | grep '"location"' | cut -d '"' -f 4
echo -e "\n"
echo "個人網站:"
curl -s $url | sed -E 's/\},\s*\{/\},\n\{/g' | grep '"blog"' | cut -d '"' -f 4