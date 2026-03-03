# 🍕 PizzaHub - Online Pizza E-Commerce Platform

A complete, production-ready full-stack pizza ordering system with professional frontend, secure backend, and database integration.

## 🎯 Features

### Frontend
- ✅ Responsive design (mobile-first approach)
- ✅ Sticky navigation with cart counter
- ✅ Hero banner with CTAs
- ✅ Dynamic menu with filtering
- ✅ Real-time cart management
- ✅ Complete checkout flow
- ✅ Order confirmation system
- ✅ Smooth animations and transitions
- ✅ Toast notifications
- ✅ LocalStorage integration

### Backend
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM
- ✅ Complete CRUD operations
- ✅ Order management system
- ✅ User management
- ✅ Payment processing (COD + Card ready)
- ✅ Input validation and sanitization
- ✅ Error handling middleware
- ✅ CORS enabled

### Database
- ✅ Product schema with variants
- ✅ User schema with addresses
- ✅ Order schema with tracking
- ✅ Proper relationships and indexes

## 🛠️ Tech Stack

### Frontend
- HTML5 (Semantic)
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM

## 📁 Project Structure

```
pizza-ecommerce/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # Complete styling
│   └── js/
│       └── script.js       # Frontend logic
│
├── backend/
│   ├── server.js           # Express server
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── models/
│   │   ├── Product.js      # Product schema
│   │   ├── User.js         # User schema
│   │   └── Order.js        # Order schema
│   ├── routes/
│   │   ├── products.js     # Product routes
│   │   ├── orders.js       # Order routes
│   │   ├── users.js        # User routes
│   │   └── payments.js     # Payment routes
│   ├── middleware/
│   │   └── auth.js         # Auth middleware (JWT ready)
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd pizza-ecommerce
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Start Backend Server**
```bash
npm run dev
# Server runs on http://localhost:5000
```

6. **Open Frontend**
```bash
cd ../frontend
# Open index.html in browser or use a local server
# Using Python:
python -m http.server 3000
# Using Node:
npx http-server -p 3000
```

7. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get order by ID
- `GET /api/orders/user/:phone` - Get user orders
- `PATCH /api/orders/:orderId/status` - Update order status (Admin)
- `DELETE /api/orders/:orderId` - Cancel order

### Users
- `POST /api/users` - Create/get user
- `GET /api/users/:phone` - Get user by phone
- `PUT /api/users/:phone` - Update user
- `POST /api/users/:phone/addresses` - Add address
- `GET /api/users/:phone/addresses` - Get addresses

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/:orderId` - Get payment status
- `POST /api/payments/refund` - Process refund (Admin)

## 💳 Payment Methods

### Currently Supported
- **Cash on Delivery (COD)** - Fully functional
- **Card Payment** - UI ready, gateway integration placeholder

### Future Integration
- Stripe
- PayPal
- Other payment gateways

## 🎨 Design Features

- Professional pizza-brand color palette (red, white, dark gray)
- Rounded cards with soft shadows
- Smooth hover and click effects
- Loading states and alerts
- Mobile-optimized layout
- Touch-friendly buttons
- Fast load performance

## 🔐 Security Features

- Input sanitization
- Server-side validation
- Secure API responses
- Environment variables for secrets
- Error handling middleware
- JWT-ready authentication system

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🚧 Future Enhancements

### Phase 1 (Ready to Implement)
- [ ] User authentication (JWT)
- [ ] Admin dashboard
- [ ] Real payment gateway integration
- [ ] Email notifications
- [ ] SMS notifications

### Phase 2 (Planned)
- [ ] Live order tracking
- [ ] User reviews and ratings
- [ ] Loyalty program
- [ ] Coupon system
- [ ] Analytics dashboard

### Phase 3 (Advanced)
- [ ] Mobile app (React Native)
- [ ] Real-time chat support
- [ ] AI-powered recommendations
- [ ] Multi-restaurant support
- [ ] Delivery driver app

## 🧪 Testing

### Manual Testing Checklist
- [ ] Browse menu and filter products
- [ ] Add items to cart with different options
- [ ] Update cart quantities
- [ ] Complete checkout process
- [ ] Verify order confirmation
- [ ] Test responsive design on mobile
- [ ] Test all API endpoints

### Future: Automated Testing
- Unit tests (Jest)
- Integration tests (Supertest)
- E2E tests (Cypress)

## 📊 Database Schema

### Product
- name, description, basePrice
- category, sizes, crusts, toppings
- imageURL, availability, featured
- rating, reviewCount

### User
- fullName, phone, email
- addresses (array)
- orderHistory (references)
- loyaltyPoints, isActive

### Order
- orderId, userId, userInfo
- items (array), totalPrice
- deliveryAddress, paymentMethod
- paymentStatus, orderStatus
- estimatedDeliveryTime, trackingUpdates

## 🌐 Deployment

### Frontend
- Netlify
- Vercel
- GitHub Pages

### Backend
- Heroku
- Railway
- DigitalOcean
- AWS EC2

### Database
- MongoDB Atlas (recommended)
- Self-hosted MongoDB

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pizzahub
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email
EMAIL_PASSWORD=your-password
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

PizzaHub Development Team

## 📞 Support

For support, email support@pizzahub.com or join our Slack channel.

## 🎉 Acknowledgments

- Design inspiration from modern food delivery platforms
- Icons and emojis for visual elements
- Community feedback and contributions

---

**Built with ❤️ and 🍕 by the PizzaHub Team**
