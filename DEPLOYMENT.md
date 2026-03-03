# 🚀 Deployment Guide

Complete guide to deploy your Pizza E-Commerce website to production.

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Deployment platform account (choose one):
  - Vercel (recommended for frontend)
  - Netlify (alternative for frontend)
  - Render/Railway (for backend)
  - Heroku (for backend)

---

## 🗄️ Database Setup (MongoDB Atlas)

### Already Done ✅
Your MongoDB Atlas is configured with:
- Connection String: `mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub`
- Database: `pizzahub`
- User: `pizzauser`

### Seed Your Database

```bash
cd pizza-ecommerce/backend
npm install
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Inserted 18 products
📊 Database seeded successfully!
```

---

## 📤 Push to GitHub

### Step 1: Initialize Git (if not already done)

```bash
cd pizza-ecommerce
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Commit

```bash
git commit -m "Initial commit: Pizza E-Commerce Website with MongoDB Atlas"
```

### Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `pizza-ecommerce` (or your choice)
3. Description: "Full-stack pizza ordering website with Node.js, Express, MongoDB"
4. Choose Public or Private
5. **DO NOT** initialize with README (you already have one)
6. Click "Create repository"

### Step 5: Push to GitHub

```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/pizza-ecommerce.git
git branch -M main
git push -u origin main
```

---

## 🌐 Deploy Frontend

### Option A: Netlify (Easiest)

1. **Go to Netlify:**
   - Visit https://app.netlify.com
   - Sign up/Login with GitHub

2. **Deploy:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your `pizza-ecommerce` repository
   - Build settings:
     - Base directory: `frontend`
     - Build command: (leave empty)
     - Publish directory: `.` (current directory)
   - Click "Deploy site"

3. **Update API URL:**
   - After backend is deployed, update `frontend/js/script.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.com/api';
   ```
   - Commit and push changes

### Option B: Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Deploy:**
   - Click "Add New" → "Project"
   - Import your repository
   - Root Directory: `frontend`
   - Click "Deploy"

3. **Update API URL** (same as Netlify)

### Option C: GitHub Pages

1. **Update repository settings:**
   - Go to repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/frontend` folder
   - Save

2. **Access your site:**
   - URL: `https://YOUR-USERNAME.github.io/pizza-ecommerce/`

---

## 🖥️ Deploy Backend

### Option A: Render (Recommended - Free Tier)

1. **Go to Render:**
   - Visit https://render.com
   - Sign up/Login with GitHub

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - Name: `pizza-backend`
     - Root Directory: `backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: `Free`

3. **Add Environment Variables:**
   - Click "Environment" tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=hungry-pizza-super-secret-key-2024-change-in-production
     ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://pizza-backend-xxxx.onrender.com`

5. **Seed Database:**
   - In Render dashboard, go to "Shell" tab
   - Run: `npm run seed`

### Option B: Railway

1. **Go to Railway:**
   - Visit https://railway.app
   - Sign up/Login with GitHub

2. **Deploy:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose `backend` folder
   - Add environment variables (same as Render)
   - Deploy

### Option C: Heroku

1. **Install Heroku CLI:**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Deploy:**
   ```bash
   cd pizza-ecommerce/backend
   heroku login
   heroku create pizza-backend
   heroku config:set MONGODB_URI="mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub?retryWrites=true&w=majority&appName=Cluster0"
   heroku config:set JWT_SECRET="hungry-pizza-super-secret-key-2024"
   git push heroku main
   ```

---

## 🔗 Connect Frontend to Backend

After deploying backend, update frontend:

1. **Edit `frontend/js/script.js`:**
   ```javascript
   // Change this line:
   const API_URL = 'http://localhost:5000/api';
   
   // To your deployed backend URL:
   const API_URL = 'https://your-backend-url.onrender.com/api';
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update API URL to production backend"
   git push
   ```

3. **Frontend will auto-redeploy** (on Netlify/Vercel)

---

## ✅ Verify Deployment

### Test Backend:
Visit: `https://your-backend-url.com/api/products`

Should return JSON with 18 products.

### Test Frontend:
1. Visit your frontend URL
2. Go to Menu page
3. Products should load from backend
4. Test cart and checkout

---

## 🔒 Security Checklist

- [x] `.env` file is in `.gitignore`
- [x] MongoDB Atlas has network access configured
- [x] Strong JWT secret in production
- [ ] Update CORS settings in `backend/server.js` to only allow your frontend domain
- [ ] Change MongoDB password for production
- [ ] Enable MongoDB Atlas IP whitelist (remove "Allow from Anywhere")

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB:
- Check MongoDB Atlas network access
- Verify connection string is correct
- Check environment variables in deployment platform

### Frontend not loading products:
- Check API_URL in `script.js`
- Check browser console for CORS errors
- Verify backend is running

### CORS errors:
Update `backend/server.js`:
```javascript
app.use(cors({
    origin: 'https://your-frontend-url.netlify.app'
}));
```

---

## 📊 Monitoring

### Backend Logs:
- Render: Dashboard → Logs tab
- Railway: Dashboard → Deployments → Logs
- Heroku: `heroku logs --tail`

### Database:
- MongoDB Atlas → Database → Browse Collections
- View orders, products, users

---

## 🎉 You're Live!

Your pizza e-commerce website is now deployed and accessible worldwide!

**Frontend URL:** `https://your-site.netlify.app`
**Backend URL:** `https://your-backend.onrender.com`
**Database:** MongoDB Atlas (Cloud)

Share your GitHub repo and live URLs with others! 🍕🚀
