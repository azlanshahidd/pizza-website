# Pizza E-Commerce Backend API

Complete Node.js/Express backend for the Pizza E-Commerce website with MongoDB database.

## Features

- RESTful API architecture
- MongoDB database with Mongoose ODM
- JWT authentication
- OTP-based login system
- Order management
- Product catalog
- Payment processing
- User profiles
- CORS enabled
- Error handling middleware

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **CORS**: cors

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pizzahub
JWT_SECRET=your-secret-key
```

## Database Setup

### Install MongoDB

**Windows:**
- Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Seed Database

Populate the database with sample products:
```bash
npm run seed
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

**Query Parameters:**
- `category`: Filter by category (vegetarian, non-veg, premium, sides, drinks)
- `search`: Search in name and description

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Create new order |
| PUT | `/api/orders/:id/status` | Update order status |
| GET | `/api/orders/customer/:phone` | Get customer orders |
| DELETE | `/api/orders/:id` | Cancel order |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Send OTP to phone |
| POST | `/api/users/verify-otp` | Verify OTP and login |
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |
| GET | `/api/users` | Get all users (Admin) |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/process` | Process payment |
| GET | `/api/payments/:orderId` | Get payment status |
| POST | `/api/payments/verify` | Verify payment |
| POST | `/api/payments/refund` | Process refund (Admin) |

## Request/Response Examples

### Create Order

**Request:**
```json
POST /api/orders
{
  "customer": {
    "fullName": "John Doe",
    "phone": "+92 300 1234567",
    "email": "john@example.com"
  },
  "items": [
    {
      "productId": "123",
      "name": "Margherita Pizza",
      "size": "Large",
      "crust": "Thin",
      "toppings": ["Extra Cheese"],
      "quantity": 2,
      "price": 1199
    }
  ],
  "deliveryAddress": "123 Main St, Lahore",
  "paymentMethod": "cod",
  "totalPrice": 2548
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "HP12345678",
    "customer": {...},
    "items": [...],
    "status": "pending",
    "totalPrice": 2548,
    "createdAt": "2024-03-03T10:30:00.000Z"
  }
}
```

### Login with OTP

**Step 1: Send OTP**
```json
POST /api/users/login
{
  "phone": "+92 300 1234567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"
}
```

**Step 2: Verify OTP**
```json
POST /api/users/verify-otp
{
  "phone": "+92 300 1234567",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "phone": "+92 300 1234567",
      "fullName": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Order Status Flow

1. `pending` - Order placed
2. `confirmed` - Order confirmed by restaurant
3. `preparing` - Food is being prepared
4. `out-for-delivery` - Order is on the way
5. `delivered` - Order delivered
6. `cancelled` - Order cancelled

## Payment Methods

- `cod` - Cash on Delivery
- `card` - Credit/Debit Card
- `wallet` - Mobile Wallet (JazzCash, EasyPaisa, etc.)
- `bank` - Bank Transfer

## Security

- JWT tokens for authentication
- Password hashing with bcryptjs
- CORS enabled for frontend
- Input validation
- MongoDB injection prevention

## Development

### Project Structure
```
backend/
├── config/
│   └── db.js              # Database configuration
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/
│   ├── Order.js           # Order model
│   ├── Product.js         # Product model
│   └── User.js            # User model
├── routes/
│   ├── orders.js          # Order routes
│   ├── payments.js        # Payment routes
│   ├── products.js        # Product routes
│   └── users.js           # User routes
├── scripts/
│   └── seedDatabase.js    # Database seeding
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js              # Main server file
```

## Testing

Use tools like Postman or Thunder Client to test API endpoints.

### Sample Postman Collection

Import this collection to test all endpoints:
- Base URL: `http://localhost:5000/api`
- Set environment variable: `baseUrl = http://localhost:5000/api`

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a production MongoDB instance (MongoDB Atlas)
3. Set strong `JWT_SECRET`
4. Enable HTTPS
5. Use process manager (PM2)
6. Set up monitoring and logging

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name pizza-api
pm2 save
pm2 startup
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `sudo systemctl status mongodb`
- Check connection string in `.env`
- Verify network access

### Port Already in Use
- Change PORT in `.env`
- Kill process: `lsof -ti:5000 | xargs kill -9`

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
