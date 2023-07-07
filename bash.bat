@echo off
chcp 65001 > nul
echo "------ Start ------"

set "filePath=%USERPROFILE%\Desktop\parameters.txt"

break > "C:\Users\neriya\Desktop\parameters.txt"

for %%A in (%*) do (
    echo %%A
    echo %%A >> "%filePath%"
)

pause 

