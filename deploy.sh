#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

echo 'www.dengsong.icu' >> CNAME
echo "访问它：http://www.dengsong.icu" >> README.md

git init
git add .
git commit -m "deploy"
git branch -M main
git remote add origin git@github.com:DSzhongweizi/DSzhongweizi.github.io.git
git push -f origin main

cd -