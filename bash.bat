@echo off
chcp 65001 > nul
echo "Hello World!"

echo Parameter 1: %1
echo Parameter 2: %2
echo Parameter 3: %3
echo Parameter 4: %4
echo Parameter 5: %5
echo Parameter 6: %6
echo Parameter 7: %7
echo Parameter 8: %8
echo Parameter 9: %9

set "filePath=%USERPROFILE%\Desktop\parameters.txt"

break > "C:\Users\neriya\Desktop\parameters.txt"

for %%A in (%*) do (
    echo %%A >> "%filePath%"
)

