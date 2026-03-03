@echo off
REM Verification Script for GitHub Upload (Windows)
REM Run this before uploading to GitHub

echo.
echo Verifying project is safe for GitHub upload...
echo.

REM Check if .gitignore exists
if exist ".gitignore" (
    echo [OK] .gitignore file exists
) else (
    echo [ERROR] .gitignore file missing!
    exit /b 1
)

REM Check if backend/.env.example exists
if exist "backend\.env.example" (
    echo [OK] backend/.env.example exists
) else (
    echo [ERROR] backend/.env.example missing!
    exit /b 1
)

REM Check if backend/.env exists
if exist "backend\.env" (
    echo [OK] backend/.env exists (for local use only)
) else (
    echo [WARNING] backend/.env doesn't exist
)

REM Initialize git if not already
if not exist ".git" (
    echo.
    echo Initializing git repository...
    git init
)

echo.
echo Files that will be uploaded to GitHub:
echo ----------------------------------------
git add .
git status --short

echo.
echo Checking for sensitive files...

REM Check if .env would be committed
git ls-files --error-unmatch backend\.env >nul 2>&1
if %errorlevel% equ 0 (
    echo [ERROR] DANGER: backend/.env will be uploaded!
    echo         Run: git rm --cached backend/.env
    exit /b 1
) else (
    echo [OK] backend/.env is properly ignored
)

REM Check if node_modules would be committed  
git ls-files --error-unmatch backend\node_modules >nul 2>&1
if %errorlevel% equ 0 (
    echo [ERROR] WARNING: node_modules will be uploaded!
    exit /b 1
) else (
    echo [OK] node_modules is properly ignored
)

echo.
echo Final Safety Checks:
git check-ignore backend\.env >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] backend/.env is ignored
) else (
    echo [ERROR] backend/.env is NOT ignored!
    exit /b 1
)

git check-ignore backend\node_modules >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] node_modules is ignored
) else (
    echo [ERROR] node_modules is NOT ignored!
    exit /b 1
)

echo.
echo ========================================
echo All checks passed! Safe to upload!
echo ========================================
echo.
echo Next steps:
echo 1. git commit -m "Initial commit: Pizza e-commerce website"
echo 2. git remote add origin https://github.com/YOUR-USERNAME/pizza-ecommerce.git
echo 3. git branch -M main
echo 4. git push -u origin main
echo.
pause
