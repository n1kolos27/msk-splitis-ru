@echo off
chcp 65001 >nul
cd /d "D:\Главная"
echo ============================================
echo Статус Git репозитория
echo ============================================
echo.
echo Remote repositories:
git remote -v
echo.
echo Tags:
git tag -l
echo.
echo Последний коммит:
git log --oneline -1
echo.
echo Ветка:
git branch
echo.
echo ============================================
echo Репозиторий на GitHub:
echo https://github.com/n1kolos27/msk-splitis-ru
echo ============================================

