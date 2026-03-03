#!/bin/bash

# Verification Script for GitHub Upload
# Run this before uploading to GitHub

echo "🔍 Verifying project is safe for GitHub upload..."
echo ""

# Check if .gitignore exists
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore file exists"
else
    echo "❌ .gitignore file missing!"
    exit 1
fi

# Check if .env is in .gitignore
if grep -q "\.env" .gitignore; then
    echo "✅ .env is in .gitignore"
else
    echo "❌ .env is NOT in .gitignore!"
    exit 1
fi

# Check if backend/.env exists (it should, but shouldn't be committed)
if [ -f "backend/.env" ]; then
    echo "✅ backend/.env exists (for local use)"
else
    echo "⚠️  backend/.env doesn't exist (you'll need to create it)"
fi

# Check if backend/.env.example exists
if [ -f "backend/.env.example" ]; then
    echo "✅ backend/.env.example exists (safe template)"
else
    echo "❌ backend/.env.example missing!"
    exit 1
fi

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Check what would be committed
echo ""
echo "📋 Files that will be uploaded to GitHub:"
echo "----------------------------------------"
git add . 2>/dev/null
git status --short

echo ""
echo "🔒 Checking for sensitive files..."

# Check if .env would be committed
if git ls-files --error-unmatch backend/.env 2>/dev/null; then
    echo "❌ DANGER: backend/.env will be uploaded!"
    echo "   Run: git rm --cached backend/.env"
    exit 1
else
    echo "✅ backend/.env is properly ignored"
fi

# Check if node_modules would be committed
if git ls-files --error-unmatch backend/node_modules 2>/dev/null; then
    echo "❌ WARNING: node_modules will be uploaded!"
    echo "   This will make your repo huge!"
    exit 1
else
    echo "✅ node_modules is properly ignored"
fi

# Search for potential passwords in staged files
echo ""
echo "🔍 Searching for potential passwords..."
if git diff --cached | grep -i "password.*=.*[a-zA-Z0-9]" | grep -v "your-password" | grep -v "example"; then
    echo "⚠️  WARNING: Found potential passwords in staged files!"
    echo "   Review carefully before uploading!"
else
    echo "✅ No obvious passwords found in staged files"
fi

echo ""
echo "📊 Summary:"
echo "----------------------------------------"
echo "Total files to upload: $(git status --short | wc -l)"
echo ""

# Final check
echo "🎯 Final Safety Checks:"
git check-ignore backend/.env > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ backend/.env is ignored"
else
    echo "❌ backend/.env is NOT ignored!"
    exit 1
fi

git check-ignore backend/node_modules > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ node_modules is ignored"
else
    echo "❌ node_modules is NOT ignored!"
    exit 1
fi

echo ""
echo "✅ All checks passed! Safe to upload to GitHub!"
echo ""
echo "Next steps:"
echo "1. git commit -m 'Initial commit: Pizza e-commerce website'"
echo "2. git remote add origin https://github.com/YOUR-USERNAME/pizza-ecommerce.git"
echo "3. git branch -M main"
echo "4. git push -u origin main"
echo ""
