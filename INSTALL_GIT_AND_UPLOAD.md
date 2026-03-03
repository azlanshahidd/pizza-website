# Install Git and Upload to GitHub

## Step 1: Install Git

### For Windows:

1. **Download Git**
   - Go to: https://git-scm.com/download/win
   - Download will start automatically
   - Run the installer (Git-2.xx.x-64-bit.exe)

2. **Install Git**
   - Click "Next" through the installation
   - **Important**: When asked about "Adjusting your PATH environment", select "Git from the command line and also from 3rd-party software"
   - Keep all other default settings
   - Click "Install"
   - Click "Finish"

3. **Verify Installation**
   - Close and reopen Command Prompt or PowerShell
   - Type: `git --version`
   - You should see: `git version 2.xx.x`

---

## Step 2: Configure Git (First Time Only)

Open Command Prompt or PowerShell and run:

```bash
git config --global user.name "azlanshahidd"
git config --global user.email "your-email@example.com"
```

Replace "your-email@example.com" with your actual GitHub email.

---

## Step 3: Get GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "pizza-website-upload"
4. Select scopes:
   - ✅ **repo** (check this - it will check all sub-items)
5. Click "Generate token" at the bottom
6. **IMPORTANT**: Copy the token immediately (starts with `ghp_`)
7. Save it somewhere safe - you won't see it again!

---

## Step 4: Upload to GitHub

Open Command Prompt or PowerShell, navigate to your project folder:

```bash
cd C:\Users\Azlan\Desktop\E-Commerce\pizza-ecommerce
```

Then run these commands one by one:

### 1. Initialize Git Repository
```bash
git init
```

### 2. Add Remote Repository
```bash
git remote add origin https://github.com/azlanshahidd/pizza-website.git
```

### 3. Add All Files
```bash
git add .
```

### 4. Commit Files
```bash
git commit -m "Initial commit: Complete pizza e-commerce website"
```

### 5. Set Main Branch
```bash
git branch -M main
```

### 6. Push to GitHub
```bash
git push -u origin main
```

When prompted for credentials:
- **Username**: azlanshahidd
- **Password**: Paste your Personal Access Token (the one starting with `ghp_`)

---

## Alternative: Use GitHub Desktop (Easier!)

If you find command line difficult, use GitHub Desktop:

### 1. Download GitHub Desktop
- Go to: https://desktop.github.com/
- Download and install

### 2. Sign In
- Open GitHub Desktop
- Sign in with your GitHub account (azlanshahidd)

### 3. Add Repository
- Click "File" → "Add local repository"
- Choose folder: `C:\Users\Azlan\Desktop\E-Commerce\pizza-ecommerce`
- If it says "not a git repository", click "create a repository here"
- Click "Create Repository"

### 4. Publish to GitHub
- Click "Publish repository" button
- Repository name: pizza-website
- Uncheck "Keep this code private" (if you want it public)
- Click "Publish repository"

Done! All files are now on GitHub.

---

## Step 5: Verify Upload

1. Go to: https://github.com/azlanshahidd/pizza-website
2. You should see all your files:
   - frontend folder
   - backend folder
   - README.md
   - All other files

---

## Step 6: Deploy Backend to Render

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Sign in with GitHub

### 2. Create New Web Service
- Click "New +" → "Web Service"
- Click "Connect account" to connect GitHub
- Select repository: `azlanshahidd/pizza-website`
- Click "Connect"

### 3. Configure Service
Fill in these details:

- **Name**: `pizza-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 4. Add Environment Variables
Click "Advanced" → "Add Environment Variable"

Add these one by one:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | `hungry-pizza-super-secret-key-2024-change-in-production` |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `*` |

### 5. Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for deployment
- Once deployed, you'll see: "Your service is live 🎉"
- Copy your backend URL (e.g., `https://pizza-backend-xxxx.onrender.com`)

---

## Step 7: Update Frontend with Backend URL

### 1. Update script.js
Open `frontend/js/script.js` and find this line (around line 1-5):
```javascript
const API_URL = 'http://localhost:5000/api';
```

Replace with your Render URL:
```javascript
const API_URL = 'https://pizza-backend-xxxx.onrender.com/api';
```

### 2. Update payment-page.js
Open `frontend/js/payment-page.js` and find:
```javascript
const API_URL = 'http://localhost:5000/api';
```

Replace with:
```javascript
const API_URL = 'https://pizza-backend-xxxx.onrender.com/api';
```

### 3. Push Changes to GitHub

If using Command Line:
```bash
git add .
git commit -m "Update API URL to Render backend"
git push
```

If using GitHub Desktop:
- It will show changes automatically
- Add commit message: "Update API URL to Render backend"
- Click "Commit to main"
- Click "Push origin"

---

## Step 8: Deploy Frontend

### Option A: GitHub Pages

1. Go to: https://github.com/azlanshahidd/pizza-website/settings/pages
2. Under "Source", select:
   - Branch: `main`
   - Folder: `/frontend`
3. Click "Save"
4. Wait 2-3 minutes
5. Your site will be live at: `https://azlanshahidd.github.io/pizza-website/`

### Option B: Netlify (Recommended - Easier)

1. Go to: https://app.netlify.com
2. Sign up/Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" → Select `pizza-website` repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (just a dot)
6. Click "Deploy site"
7. Wait 1-2 minutes
8. Your site will be live at: `https://random-name-12345.netlify.app`
9. You can change the name in Site settings

---

## Step 9: Test Your Live Website

1. Open your frontend URL (GitHub Pages or Netlify)
2. Test these features:
   - ✅ Browse menu and deals
   - ✅ Add items to cart
   - ✅ Login with phone number
   - ✅ Receive OTP (check console for demo OTP)
   - ✅ Place order
   - ✅ Contact form submission

---

## Troubleshooting

### Git not recognized
- Make sure Git is installed
- Close and reopen Command Prompt after installation
- Try running as Administrator

### Permission denied (GitHub)
- Use Personal Access Token, not password
- Token must have "repo" scope

### Render deployment failed
- Check build logs in Render dashboard
- Verify environment variables are correct
- Make sure `backend/package.json` exists

### Frontend can't connect to backend
- Check API_URL in frontend files
- Make sure Render backend is running (green status)
- Check browser console for errors
- Verify CORS is enabled in backend

### Backend sleeping (Render free tier)
- Free tier sleeps after 15 minutes of inactivity
- First request will be slow (30 seconds) as it wakes up
- Consider upgrading to paid tier for production

---

## Important Notes

1. **Free Tier Limitations**:
   - Render: Backend sleeps after 15 min inactivity
   - First load will be slow (30 seconds)
   - 750 hours/month free (enough for one service)

2. **Security**:
   - Never commit .env files
   - Change JWT_SECRET in production
   - Use environment variables on Render

3. **Updates**:
   - To update code: commit and push to GitHub
   - Render auto-deploys on push
   - Frontend (GitHub Pages) updates automatically
   - Frontend (Netlify) auto-deploys on push

4. **Database**:
   - MongoDB Atlas is already set up
   - Connection string is in environment variables
   - Free tier: 512 MB storage

---

## Quick Reference Commands

### Update code after changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

### Check status:
```bash
git status
```

### View commit history:
```bash
git log --oneline
```

### Pull latest changes:
```bash
git pull
```

---

## Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com

---

## Your Project URLs (After Deployment)

- **GitHub Repository**: https://github.com/azlanshahidd/pizza-website
- **Backend (Render)**: https://pizza-backend-xxxx.onrender.com
- **Frontend (GitHub Pages)**: https://azlanshahidd.github.io/pizza-website/
- **Frontend (Netlify)**: https://your-site-name.netlify.app

---

## Summary

1. ✅ Install Git
2. ✅ Get GitHub Personal Access Token
3. ✅ Upload code to GitHub
4. ✅ Deploy backend to Render
5. ✅ Update frontend API URLs
6. ✅ Deploy frontend to GitHub Pages or Netlify
7. ✅ Test live website

**Total Time**: 30-45 minutes
