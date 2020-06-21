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
