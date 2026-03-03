# 🚀 START HERE - Complete Setup Guide

Follow these exact steps to get your pizza website running.

## ⚡ Quick Start (5 Minutes)

### Step 1: Open Terminal in Project Folder
```bash
cd pizza-ecommerce
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

Wait for installation (1-2 minutes). You should see:
```
added 150 packages
```

### Step 3: Seed Database with Products
```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
✅ Inserted 18 products
📊 Database seeded successfully!
```

### Step 4: Start Backend Server
```bash
npm run dev
```

You should see:
```
🍕 PizzaHub Server running on port 5000
📡 API available at http://localhost:5000/api
✅ MongoDB Connected: cluster0.fgwldgd.mongodb.net
📊 Database: pizzahub
```

**✅ KEEP THIS TERMINAL OPEN!** Backend must stay running.

### Step 5: Open NEW Terminal for Frontend
```bash
# Open a NEW terminal window (don't close the backend one!)
cd pizza-ecommerce/frontend

# Choose ONE option:

# Option A: Python (if installed)
python -m http.server 3000

# Option B: Node.js
npx http-server -p 3000

# Option C: VS Code
# Right-click index.html → Open with Live Server
```

### Step 6: Open Website
Open browser and go to:
```
http://localhost:3000
```

You should see the pizza website! 🍕

---

## 🧪 Test Login System

1. Click "Login" button
2. Select country code (default: 🇵🇰 +92)
3. Enter phone: `3001234567`
4. Click "SEND OTP"
5. Check backend terminal - you'll see:
   ```
   📱 OTP for +923001234567: 123456
   ```
6. Enter the OTP from terminal
7. Click "Verify OTP"
8. You're logged in! ✅

---

## ❌ Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org

### Problem: "Cannot find module 'express'"
**Solution:**
```bash
cd pizza-ecommerce/backend
npm install
```

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in backend/.env to 5001
```

### Problem: "MongoDB connection failed"
**Solution:** Check internet connection. MongoDB Atlas is cloud-based and needs internet.

### Problem: "Failed to fetch" when clicking Login
**Cause:** Backend is not running

**Solution:**
1. Check backend terminal is still open and running
2. You should see "PizzaHub Server running on port 5000"
3. If not, run `npm run dev` again in backend folder

### Problem: Website shows "file:///" in URL
**Cause:** Opening HTML file directly

**Solution:** Use a local server (Step 5 above)

---

## 📋 Checklist

Before asking for help, verify:

- [ ] Node.js is installed (`node --version`)
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend is running (`npm run dev` - terminal stays open)
- [ ] Backend shows "MongoDB Connected"
- [ ] Frontend is served through http:// (not file://)
- [ ] Browser shows `http://localhost:3000`
- [ ] No errors in backend terminal
- [ ] No errors in browser console (F12)

---

## 🎯 Expected Terminal Output

### Backend Terminal (Terminal 1):
```
> nodemon server.js

[nodemon] starting `node server.js`
🍕 PizzaHub Server running on port 5000
📡 API available at http://localhost:5000/api
🌍 Environment: development
✅ MongoDB Connected: cluster0.fgwldgd.mongodb.net
📊 Database: pizzahub
```

### Frontend Terminal (Terminal 2):
```
Serving HTTP on 0.0.0.0 port 3000 (http://0.0.0.0:3000/) ...
```

### Browser:
- URL: `http://localhost:3000`
- Website loads with pizza images
- Menu shows products
- Login button works

---

## 🔍 Verify Backend is Working

Open these URLs in browser:

1. **Root:** http://localhost:5000
   - Should show JSON with API info

2. **Products:** http://localhost:5000/api/products
   - Should show 18 products

3. **Test Login:** Open browser console (F12) and run:
   ```javascript
   fetch('http://localhost:5000/api/users/login', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({phone: '+923001234567'})
   })
   .then(r => r.json())
   .then(d => console.log('✅ Login API works:', d))
   .catch(e => console.error('❌ Error:', e));
   ```

If you see OTP in console, backend is working! ✅

---

## 💡 Pro Tips

1. **Keep backend terminal visible** - You'll see OTP codes there
2. **Use browser console (F12)** - See errors and debug
3. **Check both terminals** - Backend and frontend must both run
4. **Restart backend** - If issues, Ctrl+C and run `npm run dev` again
5. **Clear browser cache** - Ctrl+Shift+R to hard refresh

---

## 🆘 Still Not Working?

Run this diagnostic:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check backend dependencies
cd pizza-ecommerce/backend
npm list express mongoose cors

# Test backend directly
curl http://localhost:5000/api/products
```

Share the output if you need help!

---

## ✅ Success!

You know it's working when:
1. ✅ Backend terminal shows "MongoDB Connected"
2. ✅ Frontend loads at http://localhost:3000
3. ✅ Products show on menu page
4. ✅ Login generates OTP in backend terminal
5. ✅ Can add items to cart
6. ✅ Can complete checkout

**Enjoy your pizza website!** 🍕🎉

---

## 📚 Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy online
- Read [OTP_SYSTEM.md](OTP_SYSTEM.md) to understand authentication
- Read [TEST_BACKEND.md](TEST_BACKEND.md) for detailed testing

---

**Need help? Make sure both terminals are running and share any error messages!** 🚀
