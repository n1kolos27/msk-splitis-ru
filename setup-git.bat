@echo off
chcp 65001 >nul
cd /d "D:\Главная"
git config --global --add safe.directory "D:/Главная"
git status
git branch
git remote -v

