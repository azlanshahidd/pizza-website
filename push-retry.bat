@echo off
echo ========================================
echo Retrying GitHub Push with Better Settings
echo ========================================
echo.

REM Configure Git for better network handling
D:\Git\bin\git.exe config http.postBuffer 524288000
D:\Git\bin\git.exe config http.lowSpeedLimit 0
D:\Git\bin\git.exe config http.lowSpeedTime 999999

echo Attempting push (this may take a few minutes)...
echo.

REM Try push with retry
:retry
D:\Git\bin\git.exe push origin main 2>&1 | findstr /C:"Everything up-to-date" /C:"branch 'main' set up"
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Files uploaded to GitHub
    echo ========================================
    echo.
    echo Verify at: https://github.com/azlanshahidd/pizza-website
    echo.
    pause
    exit /b 0
)

echo Push attempt completed. Checking status...
D:\Git\bin\git.exe status
echo.
echo If files are not on GitHub, press any key to retry...
pause
goto retry
