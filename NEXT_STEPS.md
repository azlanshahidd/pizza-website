# ✅ Files Uploaded to GitHub Successfully!

## Verification

Your files have been uploaded to GitHub. To verify:

1. Open your browser and go to: **https://github.com/azlanshahidd/pizza-website**
2. You should see all your files including:
   - frontend folder
   - backend folder
   - README.md
   - All documentation files

---

## Next Steps: Deploy Your Website

### Step 1: Deploy Backend to Render

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Click "Connect account" (if first time)
   - Select repository: `azlanshahidd/pizza-website`
   - Click "Connect"

3. **Configure Backend Service**
   Fill in these settings:

   ```
   Name: pizza-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these 5 variables:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | `mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub?retryWrites=true&w=majority&appName=Cluster0` |
   | `JWT_SECRET` | `hungry-pizza-super-secret-key-2024-change-in-production` |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `FRONTEND_URL` | `*` |

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Once deployed, you'll see: "Your service is live 🎉"
   - **COPY YOUR BACKEND URL**: `https://pizza-backend-xxxx.onrender.com`

---

### Step 2: Update Frontend with Backend URL

After getting your Render backend URL, you need to update the frontend:

1. **Open `frontend/js/script.js`**
   - Find line: `const API_URL = 'http://localhost:5000/api';`
   - Replace with: `const API_URL = 'https://your-render-url.onrender.com/api';`
   - (Use your actual Render URL)

2. **Open `frontend/js/payment-page.js`**
   - Find line: `const API_URL = 'http://localhost:5000/api';`
   - Replace with: `const API_URL = 'https://your-render-url.onrender.com/api';`

3. **Commit and Push Changes**
   Open Command Prompt in pizza-ecommerce folder:
   ```bash
   D:\Git\bin\git.exe add .
   D:\Git\bin\git.exe commit -m "Update API URL to Render backend"
   D:\Git\bin\git.exe push origin main
   ```

---

### Step 3: Deploy Frontend

**Option A: GitHub Pages (Recommended)**

1. Go to: https://github.com/azlanshahidd/pizza-website/settings/pages
2. Under "Source":
   - Branch: `main`
   - Folder: `/frontend`
3. Click "Save"
4. Wait 2-3 minutes
5. Your site will be live at: `https://azlanshahidd.github.io/pizza-website/`

**Option B: Netlify**

1. Go to: https://app.netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub → Select `pizza-website` repository
5. Configure:
   - Base directory: `frontend`
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click "Deploy site"
7. Your site will be live at: `https://random-name.netlify.app`

---

## Testing Your Live Website

Once both frontend and backend are deployed:

1. **Open your frontend URL**
2. **Test these features:**
   - ✅ Browse menu and deals
   - ✅ Add items to cart
   - ✅ Login with phone number
   - ✅ Enter OTP (check browser console for demo OTP)
   - ✅ Place an order
   - ✅ Submit contact form

---

## Important Notes

### Render Free Tier
- Backend sleeps after 15 minutes of inactivity
- First request will be slow (30 seconds) as it wakes up
- 750 hours/month free (enough for one service)

### MongoDB Atlas
- Already configured and working
- Free tier: 512 MB storage
- Connection string is in Render environment variables

### GitHub Pages
- Only hosts static files (frontend)
- Updates automatically when you push to GitHub
- Free and unlimited bandwidth

---

## Troubleshooting

### Backend not responding
- Check Render dashboard for errors
- Verify environment variables are correct
- Check logs in Render dashboard

### Frontend can't connect to backend
- Verify API_URL in frontend files
- Check browser console for errors
- Make sure Render backend is running (green status)

### OTP not working
- Check browser console for OTP code (demo mode)
- Verify backend is running
- Check network tab for API calls

---

## Your Project URLs

After deployment, you'll have:

- **GitHub Repository**: https://github.com/azlanshahidd/pizza-website
- **Backend (Render)**: https://pizza-backend-xxxx.onrender.com
- **Frontend (GitHub Pages)**: https://azlanshahidd.github.io/pizza-website/
- **Frontend (Netlify)**: https://your-site-name.netlify.app

---

## Summary Checklist

- [x] Files uploaded to GitHub
- [ ] Backend deployed to Render
- [ ] Environment variables added to Render
- [ ] Backend URL copied
- [ ] Frontend files updated with backend URL
- [ ] Changes pushed to GitHub
- [ ] Frontend deployed to GitHub Pages or Netlify
- [ ] Website tested and working

---

## Need Help?

- Render Docs: https://render.com/docs
- GitHub Pages: https://pages.github.com
- Netlify Docs: https://docs.netlify.com

Good luck with your deployment! 🚀
