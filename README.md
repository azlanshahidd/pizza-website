# 🍕 Hungry? Pizza? - Online Pizza Ordering Website

A modern, fully responsive pizza ordering website with a clean design and smooth user experience.

## 🎯 Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Professional orange gradient header
- ✅ Dynamic menu with pizza customization
- ✅ Real-time shopping cart
- ✅ User authentication with OTP
- ✅ Complete checkout and payment flow
- ✅ Order confirmation system
- ✅ Contact form with validation
- ✅ Smooth animations and transitions

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Custom animations
- **Vanilla JavaScript** - ES6+ features
- **LocalStorage** - Client-side data storage


## 🚀 Getting Started

### Option 1: Direct Open
Simply open `index.html` in your web browser.


## 🎨 Design Features

### Color Palette
- **Primary Orange**: #ff6b35
- **Secondary Orange**: #f7931e
- **Dark**: #1a1a1a
- **Light**: #f5f5f5
- **White**: #ffffff

### Key Design Elements
- Orange gradient header with white text
- Professional SVG icons (no emojis except 🍕 in logo)
- Rounded cards with soft shadows
- Smooth hover effects
- Mobile-first responsive design
- Touch-friendly buttons

## 📱 Pages Overview

### Home Page (index.html)
- Hero banner with call-to-action
- Featured pizzas and deals
- Quick navigation

### Menu Page (menu.html)
- Full pizza catalog
- Size selection (Small, Medium, Large)
- Crust options (Thin, Regular, Thick)
- Extra toppings selection
- Dynamic pricing
- Add to cart functionality

### Deals Page (deals.html)
- Special combo offers
- Family deals
- BOGO offers
- Discounted packages

### About Page (about.html)
- Company information
- Our story
- Values and mission

### Contact Page (contact.html)
- Contact form with validation
- Phone number with auto country code (+92)
- Email validation
- Opening hours
- Social media links
- Address information

### Payment Page (payment.html)
- Customer information form
- Delivery address
- Order summary with full details
- Payment methods:
  - Cash on Delivery
  - Credit/Debit Card (with Luhn validation)
  - Online Wallet (JazzCash, Easypaisa, etc.)
  - Bank Transfer
- Order confirmation

## 🔐 Authentication System

### Login Flow
1. User enters phone number with country code
2. System sends OTP (accepts any 6-digit code for demo)
3. User enters OTP
4. User is logged in
5. Account shows "My Account" button
6. User can add/edit delivery address

### Features
- Country code dropdown (12 countries)
- Phone number validation
- OTP verification (demo mode - accepts any 6 digits)
- Address management
- Logout functionality

## 🛒 Shopping Cart

### Features
- Add items with customization
- Update quantities
- Remove items
- Real-time price calculation
- Cart count badge
- Sidebar cart view

### Pricing
- Base price varies by pizza
- Size multipliers:
  - Small: 1x
  - Medium: 1.3x
  - Large: 1.6x
- Extra toppings: Rs. 150 each
- Delivery fee: Rs. 150
- Discount: 5% of subtotal

## 💳 Payment Methods

### Supported Options
1. **Cash on Delivery** - Pay when order arrives
2. **Credit/Debit Card** - Card number validation with Luhn algorithm
3. **Online Wallet** - JazzCash, Easypaisa, NayaPay, SadaPay
4. **Bank Transfer** - Manual bank transfer

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🎯 Key Functionalities

### Menu System
- Dynamic product loading
- Category filtering
- Pizza customization
- Real-time price updates
- Sample data included

### Cart Management
- Add/remove items
- Quantity adjustment
- Price calculation
- LocalStorage persistence

### User Management
- Phone-based authentication
- OTP verification (demo)
- Address storage
- Account information

### Order Processing
- Customer info collection
- Address validation
- Payment method selection
- Order confirmation
- Order ID generation

## 📞 Contact Information

- **Phone**: +92 300 1234567
- **Address**: Main Boulevard, Gulberg III, Lahore, Punjab, Pakistan
- **Hours**: Monday - Sunday, 11:00 AM - 11:00 PM

## 🔧 Customization

### Update Menu Items
Edit the `loadSampleProducts()` function in `js/script.js`

### Change Colors
Update CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #ff6b35;
    --secondary-color: #f7931e;
    --dark-color: #1a1a1a;
}
```

### Update Contact Info
Edit contact details in `contact.html` and footer sections

### Modify Payment Options
Update payment methods in `payment.html`

## 🚀 Performance

- **No external dependencies** - Pure vanilla JavaScript
- **Fast load times** - Optimized images and code
- **Lightweight** - Minimal CSS and JS
- **Offline capable** - LocalStorage for data

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎉 Features Highlights

### User Experience
- Smooth page transitions
- Toast notifications
- Loading states
- Form validation
- Error handling
- Success messages

### Design
- Professional appearance
- Consistent branding
- Intuitive navigation
- Clear call-to-actions
- Mobile-optimized

### Functionality
- Complete ordering flow
- Cart management
- User authentication
- Payment processing
- Order confirmation

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Credits

Built with ❤️ and 🍕

---

**Hungry? Pizza? - Fresh Pizza Delivered to Your Doorstep**
