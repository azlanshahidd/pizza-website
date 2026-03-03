# 🚀 Quick Start Guide

Get your pizza website running in 5 minutes!

## ✅ Your MongoDB Atlas is Ready!

Your database connection is already configured:
- **Database:** pizzahub
- **Connection:** MongoDB Atlas (Cloud)
- **Status:** ✅ Ready to use

---

## 📦 Step 1: Install Dependencies

Open terminal in project folder:

```bash
cd pizza-ecommerce/backend
npm install
```

Wait for installation to complete (1-2 minutes).

---

## 🌱 Step 2: Seed Database with Products

```bash
npm run seed
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Inserted 18 products
📊 Database seeded successfully!
```

---

## 🖥️ Step 3: Start Backend Server

```bash
npm run dev
```

You should see:
```
🍕 PizzaHub Server running on port 5000
📡 API available at http://localhost:5000/api
✅ MongoDB Connected: cluster0.fgwldgd.mongodb.net
```

**Keep this terminal open!**

---

## 🌐 Step 4: Start Frontend

Open a **NEW terminal** window:

```bash
cd pizza-ecommerce/frontend
```

Then choose one option:

**Option A - Python:**
```bash
python -m http.server 3000
```

**Option B - Node.js:**
```bash
npx http-server -p 3000
```

**Option C - VS Code:**
- Right-click `index.html`
- Select "Open with Live Server"

---

## 🎉 Step 5: Open Website

Open browser and go to:
```
http://localhost:3000
```

You should see your pizza website! 🍕

---

## ✅ Test Everything

1. **Browse Menu** - Click "Menu" to see 18 products
2. **Add to Cart** - Select a pizza and add to cart
3. **Login** - Click "Login" and use phone: `+92 300 1234567`
4. **Checkout** - Complete an order with COD payment
5. **Contact** - Test the contact form

---

## 📤 Push to GitHub

```bash
cd pizza-ecommerce

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Pizza E-Commerce Website - Full Stack"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/pizza-ecommerce.git
git branch -M main
git push -u origin main
```

---

## 🚀 Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide to:
- Netlify/Vercel (Frontend)
- Render/Railway (Backend)
- MongoDB Atlas (Already configured!)

---

## 🆘 Need Help?

### Backend won't start?
```bash
cd pizza-ecommerce/backend
npm install
```

### Products not showing?
```bash
npm run seed
```

### Port already in use?
Change PORT in `backend/.env` to 5001

---

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
- [BACKEND_SETUP.md](BACKEND_SETUP.md) - Detailed backend guide
- [backend/README.md](backend/README.md) - API documentation

---

**You're all set! Enjoy your pizza website! 🍕🎉**
