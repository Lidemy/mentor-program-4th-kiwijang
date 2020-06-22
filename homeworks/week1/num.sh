#!/bin/bash
# $1 為傳進來的參數，$0 為檔名
# 資料來源:
# https://www.runoob.com/linux/linux-shell-passing-arguments.html?fbclid=IwAR34LxgZswLmHMnMWK4KWdn21gdNuDLH763zxQnmRu-j7pzzOlAbxA6eyOw
#
# 使用方式為(請在 bash 中輸入):
# ./num.sh <要產生幾個 js 檔案>
# 或
# sh num.sh <要產生幾個 js 檔案>
# 
# 如: sh num.sh 5

i=1
while [ $i != $(($1+1)) ]
do
	touch "$i.js"
	i=$(($i+1))	
done
echo "產生成功!目前位在:"
pwd
echo "內有檔案:"
ls
