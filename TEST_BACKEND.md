# 🧪 Backend Testing Guide

Quick tests to verify your backend is working correctly.

## ✅ Pre-Flight Checklist

### 1. Check Backend Dependencies
```bash
cd pizza-ecommerce/backend
npm install
```

### 2. Verify .env File Exists
```bash
# Check if .env file exists
ls -la .env

# Or on Windows
dir .env
```

Should contain:
```env
PORT=5000
MONGODB_URI=mongodb+srv://pizzauser:pizza123@cluster0.fgwldgd.mongodb.net/pizzahub?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Start Backend
```bash
npm run dev
```

Expected output:
```
🍕 PizzaHub Server running on port 5000
📡 API available at http://localhost:5000/api
✅ MongoDB Connected: cluster0.fgwldgd.mongodb.net
```

---

## 🔬 API Tests

### Test 1: Root Endpoint
**Open browser:** `http://localhost:5000`

**Expected Response:**
```json
{
  "message": "PizzaHub API Server",
  "version": "1.0.0",
  "endpoints": {
    "products": "/api/products",
    "orders": "/api/orders",
    "users": "/api/users",
    "payments": "/api/payments",
    "contact": "/api/contact"
  }
}
```

✅ **Pass:** You see JSON response
❌ **Fail:** "Cannot GET" or connection refused

---

### Test 2: Products Endpoint
**Open browser:** `http://localhost:5000/api/products`

**Expected Response:**
```json
{
  "success": true,
  "count": 18,
  "data": [
    {
      "_id": "...",
      "name": "Margherita Pizza",
      "basePrice": 899,
      ...
    }
  ]
}
```

✅ **Pass:** You see products array
❌ **Fail:** Empty array or error

**If empty:** Run seed command:
```bash
npm run seed
```

---

### Test 3: Login Endpoint (POST)

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"+923001234567"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456",
  "expiresIn": "10 minutes"
}
```

**Check backend console:** Should show:
```
📱 OTP for +923001234567: 123456
⏰ OTP expires at: 10:45:30 AM
```

✅ **Pass:** OTP generated and shown in console
❌ **Fail:** Error message

---

### Test 4: CORS Check

**Open browser console (F12) on your frontend:**
```javascript
fetch('http://localhost:5000/api/products')
  .then(r => r.json())
  .then(d => console.log('✅ CORS working:', d))
  .catch(e => console.error('❌ CORS error:', e));
```

✅ **Pass:** See products in console
❌ **Fail:** CORS error

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find module"
**Error:** `Error: Cannot find module 'express'`

**Fix:**
```bash
cd pizza-ecommerce/backend
rm -rf node_modules
npm install
```

---

### Issue 2: "Port 5000 already in use"
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Fix Option A - Kill process:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Fix Option B - Change port:**
Edit `backend/.env`:
```env
PORT=5001
```

Then update `frontend/js/script.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

---

### Issue 3: "MongoDB connection failed"
**Error:** `❌ MongoDB Connection Error`

**Fix:**
1. Check internet connection
2. Verify MongoDB Atlas connection string in `.env`
3. Check MongoDB Atlas:
   - Network Access: "Allow from Anywhere" enabled
   - Database User: `pizzauser` with password `pizza123`

---

### Issue 4: "Failed to fetch" in browser
**Error:** `TypeError: Failed to fetch`

**Causes:**
1. Backend not running
2. Wrong API URL
3. CORS issue
4. Firewall blocking

**Fix:**
1. Ensure backend is running (`npm run dev`)
2. Check API_URL in `frontend/js/script.js` is `http://localhost:5000/api`
3. Access frontend through server (not file://)
4. Check firewall settings

---

### Issue 5: Frontend shows "file://" in URL
**Problem:** Opening HTML directly from file system

**Fix:**
Use a local server:
```bash
# Option 1: Python
cd pizza-ecommerce/frontend
python -m http.server 3000

# Option 2: Node.js
npx http-server -p 3000

# Option 3: VS Code Live Server
Right-click index.html → Open with Live Server
```

Then access: `http://localhost:3000`

---

## 📊 Health Check Script

Create `backend/test-health.js`:
```javascript
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/products',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`✅ Backend Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(`✅ Products Count: ${json.count}`);
    console.log('✅ Backend is healthy!');
  });
});

req.on('error', (error) => {
  console.error('❌ Backend is not running:', error.message);
  console.log('\n💡 Start backend with: npm run dev');
});

req.end();
```

Run:
```bash
node backend/test-health.js
```

---

## 🎯 Complete Test Sequence

Run these in order:

```bash
# 1. Install dependencies
cd pizza-ecommerce/backend
npm install

# 2. Seed database
npm run seed

# 3. Start backend
npm run dev

# 4. In new terminal - test API
curl http://localhost:5000/api/products

# 5. Start frontend
cd ../frontend
python -m http.server 3000

# 6. Open browser
# Visit: http://localhost:3000
# Try login with: +92 3001234567
```

---

## ✅ Success Indicators

You know everything is working when:

1. ✅ Backend terminal shows "MongoDB Connected"
2. ✅ `http://localhost:5000` returns JSON
3. ✅ `http://localhost:5000/api/products` shows 18 products
4. ✅ Frontend loads at `http://localhost:3000`
5. ✅ Login button triggers OTP in backend console
6. ✅ No CORS errors in browser console

---

## 🆘 Still Not Working?

If tests fail, provide:
1. Backend terminal output
2. Browser console errors (F12)
3. Which test failed
4. Operating system

---

**Run these tests and let me know which one fails!** 🚀
