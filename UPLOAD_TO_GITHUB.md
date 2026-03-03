# Upload to GitHub Repository

## Your Repository
**GitHub URL**: https://github.com/azlanshahidd/pizza-website

## Step-by-Step Instructions

### 1. Open Terminal/Command Prompt
- Open your terminal (Mac/Linux) or Command Prompt/PowerShell (Windows)
- Navigate to the pizza-ecommerce folder:
```bash
cd path/to/pizza-ecommerce
```

### 2. Initialize Git (if not already done)
```bash
git init
```

### 3. Add Your GitHub Repository as Remote
```bash
git remote add origin https://github.com/azlanshahidd/pizza-website.git
```

### 4. Add All Files to Git
```bash
git add .
```

### 5. Commit Your Files
```bash
git commit -m "Initial commit: Complete pizza e-commerce website with backend"
```

### 6. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### 7. Enter GitHub Credentials
When prompted, enter:
- **Username**: azlanshahidd
- **Password**: Your GitHub Personal Access Token (not your regular password)

> **Note**: If you don't have a Personal Access Token, create one at:
> https://github.com/settings/tokens
> - Click "Generate new token (classic)"
> - Give it a name like "pizza-website"
> - Select "repo" scope
> - Copy the token and use it as your password

---

## What Gets Uploaded?

✅ All frontend files (HTML, CSS, JS, images)
✅ All backend files (routes, models, config)
✅ Documentation files (README, guides)
✅ Package.json files
✅ .env.example (template file)

❌ .env files (protected by .gitignore)
❌ node_modules (will be installed on Render)
❌ Sensitive data

---

## After Upload - Next Steps

### 1. Verify Upload
Go to: https://github.com/azlanshahidd/pizza-website
Check that all files are there.

### 2. Deploy Backend to Render
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `azlanshahidd/pizza-website`
4. Configure:
   - **Name**: pizza-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub?retryWrites=true&w=majority&appName=Cluster0
   - `JWT_SECRET`: hungry-pizza-super-secret-key-2024-change-in-production
   - `NODE_ENV`: production
   - `PORT`: 5000
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., https://pizza-backend-xxxx.onrender.com)

### 3. Update Frontend API URL
After getting your Render backend URL, update the frontend:
- Open `frontend/js/script.js`
- Find: `const API_URL = 'http://localhost:5000/api';`
- Replace with: `const API_URL = 'https://your-render-url.onrender.com/api';`
- Do the same in `frontend/js/payment-page.js`
- Commit and push changes

### 4. Deploy Frontend
**Option A - GitHub Pages:**
1. Go to repository Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: /frontend
4. Save and wait for deployment
5. Your site will be at: https://azlanshahidd.github.io/pizza-website/

**Option B - Netlify:**
1. Go to https://app.netlify.com
2. "Add new site" → "Import from Git"
3. Connect GitHub → Select repository
4. Base directory: `frontend`
5. Deploy

---

## Troubleshooting

### "Permission denied" error
- Make sure you're using a Personal Access Token, not your password
- Token needs "repo" scope enabled

### "Repository not found" error
- Check the repository URL is correct
- Make sure the repository exists on GitHub

### Files not uploading
- Check .gitignore isn't blocking important files
- Run `git status` to see what's being tracked

### Need to update files later
```bash
git add .
git commit -m "Update description"
git push
```

---

## Important Notes

1. **Never commit .env files** - They contain sensitive data
2. **Backend must be on Render** - GitHub Pages only hosts static files
3. **Update API URLs** - Frontend needs to point to Render backend
4. **Free tier limits** - Render free tier sleeps after 15 min inactivity
5. **First load may be slow** - Render needs to wake up the service

---

## Need Help?

- GitHub Docs: https://docs.github.com
- Render Docs: https://render.com/docs
- Check START_HERE.md for project overview
- Check DEPLOYMENT.md for detailed deployment guide
