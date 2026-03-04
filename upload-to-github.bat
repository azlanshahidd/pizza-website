@echo off
echo ========================================
echo Uploading Pizza Website to GitHub
echo ========================================
echo.

REM Check if Git is available
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not found in PATH
    echo Please close this window and reopen Command Prompt
    echo Or add Git to PATH manually
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to initialize Git
    pause
    exit /b 1
)
echo ✓ Git initialized
echo.

echo Step 2: Adding remote repository...
git remote add origin https://github.com/azlanshahidd/pizza-website.git 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Remote already exists, updating...
    git remote set-url origin https://github.com/azlanshahidd/pizza-website.git
)
echo ✓ Remote repository added
echo.

echo Step 3: Adding all files...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo ✓ All files added
echo.

echo Step 4: Committing files...
git commit -m "Initial commit: Complete pizza e-commerce website with backend"
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to commit
    echo Make sure Git is configured with your name and email
    echo Run these commands:
    echo   git config --global user.name "azlanshahidd"
    echo   git config --global user.email "your-email@example.com"
    pause
    exit /b 1
)
echo ✓ Files committed
echo.

echo Step 5: Setting main branch...
git branch -M main
echo ✓ Branch set to main
echo.

echo Step 6: Pushing to GitHub...
echo.
echo You will be prompted for credentials:
echo Username: azlanshahidd
echo Password: Use your GitHub Personal Access Token (not your password)
echo.
echo If you don't have a token, create one at:
echo https://github.com/settings/tokens
echo.
git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to push to GitHub
    echo.
    echo Common issues:
    echo 1. Wrong credentials - Use Personal Access Token, not password
    echo 2. Repository doesn't exist - Make sure azlanshahidd/pizza-website exists
    echo 3. No internet connection
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ SUCCESS! All files uploaded to GitHub
echo ========================================
echo.
echo Your repository: https://github.com/azlanshahidd/pizza-website
echo.
echo Next steps:
echo 1. Verify files at: https://github.com/azlanshahidd/pizza-website
echo 2. Deploy backend to Render
echo 3. Deploy frontend to GitHub Pages or Netlify
echo.
echo See DEPLOYMENT.md for detailed deployment instructions
echo.
pause
