@echo off

rem Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js isn't install
    echo Please install Node.js on the webpage:https://nodejs.org/en/download/current
    pause
    exit
)

echo install dependency...
call npm install

echo install python...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Python didn't installed
    pause
    exit
)

echo installing python module
call pip install scrapy
call pip install selenium


echo making output folder win32...
mkdir win32

echo building project...
npm run build

echo The program exe file should now be in win32 folder.
pause
