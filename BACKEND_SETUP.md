# Backend Setup Guide

Complete guide to set up and run the Pizza E-Commerce backend server.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Quick Start

### 1. Install MongoDB

**Windows:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will start automatically as a service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

Verify MongoDB is running:
```bash
mongosh
# or
mongo
```

### 2. Backend Setup

Navigate to backend directory:
```bash
cd pizza-ecommerce/backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `.env` file (optional - defaults work for local development):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pizzahub
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### 3. Seed Database

Populate database with sample products:
```bash
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Inserted 18 products

📊 Database seeded successfully!
Total Products: 18
- Vegetarian: 3
- Non-Veg: 7
- Premium: 2
- Sides: 5
- Drinks: 1
```

### 4. Start Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start on `http://localhost:5000`

You should see:
```
🍕 PizzaHub Server running on port 5000
📡 API available at http://localhost:5000/api
🌍 Environment: development
✅ MongoDB Connected: localhost
📊 Database: pizzahub
```

## Testing the API

### Using Browser

Visit `http://localhost:5000` to see API info.

### Using curl

Test products endpoint:
```bash
curl http://localhost:5000/api/products
```

### Using Postman/Thunder Client

1. Import the API collection
2. Set base URL: `http://localhost:5000/api`
3. Test endpoints

## API Endpoints Overview

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/customer/:phone` - Get customer orders
- `DELETE /api/orders/:id` - Cancel order

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Send OTP
- `POST /api/users/verify-otp` - Verify OTP
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/:orderId` - Get payment status
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/refund` - Process refund

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (Admin)

## Connecting Frontend to Backend

Update frontend API URL in `frontend/js/script.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

Make sure backend is running before starting frontend.

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongodb
   ```

2. Verify connection string in `.env`

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change PORT in `.env` to different port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### Database Not Seeding

**Error:** Products not showing in API

**Solution:**
```bash
npm run seed
```

## Development Tips

### Auto-reload on Changes

Use nodemon (included in dev dependencies):
```bash
npm run dev
```

### View MongoDB Data

Using MongoDB Compass (GUI):
1. Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Connect to `mongodb://localhost:27017`
3. Browse `pizzahub` database

Using mongosh (CLI):
```bash
mongosh
use pizzahub
db.products.find()
db.orders.find()
db.users.find()
```

### Clear Database

```bash
mongosh
use pizzahub
db.dropDatabase()
```

Then re-seed:
```bash
npm run seed
```

## Production Deployment

### Environment Variables

Set these in production:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/pizzahub
JWT_SECRET=very-strong-secret-key-min-32-chars
FRONTEND_URL=https://yourwebsite.com
```

### MongoDB Atlas (Cloud Database)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Deploy to Heroku

```bash
heroku create pizza-api
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Deploy to Vercel/Netlify

Use serverless functions or deploy to platforms like:
- Railway
- Render
- DigitalOcean App Platform

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Enable rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Keep dependencies updated
- [ ] Use MongoDB Atlas with authentication

## Support

For issues:
1. Check this guide
2. Review error messages
3. Check MongoDB connection
4. Verify all dependencies installed
5. Check port availability

## Next Steps

1. ✅ Backend running
2. Start frontend server
3. Test complete flow
4. Customize as needed
