const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
    // Pizzas
    {
        name: 'Margherita Pizza',
        description: 'Classic tomato sauce, fresh mozzarella, basil, and olive oil',
        category: 'vegetarian',
        basePrice: 899,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Cheese', 'Olives', 'Mushrooms', 'Bell Peppers'],
        isAvailable: true,
        featured: true,
        rating: 4.5,
        reviewCount: 120
    },
    {
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni, mozzarella cheese, and tomato sauce',
        category: 'non-veg',
        basePrice: 1099,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Pepperoni', 'Jalapeños', 'Onions', 'Mushrooms'],
        isAvailable: true,
        featured: true,
        rating: 4.7,
        reviewCount: 200
    },
    {
        name: 'Vegetarian Pizza',
        description: 'Bell peppers, onions, mushrooms, olives, and tomatoes',
        category: 'vegetarian',
        basePrice: 999,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Veggies', 'Feta Cheese', 'Spinach', 'Corn'],
        isAvailable: true,
        rating: 4.3,
        reviewCount: 85
    },
    {
        name: 'BBQ Chicken Pizza',
        description: 'Grilled chicken, BBQ sauce, red onions, and cilantro',
        category: 'non-veg',
        basePrice: 1299,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Chicken', 'Bacon', 'Pineapple', 'Jalapeños'],
        isAvailable: true,
        featured: true,
        rating: 4.8,
        reviewCount: 150
    },
    {
        name: 'Cheese Pizza',
        description: 'Extra mozzarella, cheddar, parmesan, and tomato sauce',
        category: 'vegetarian',
        basePrice: 799,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick', 'Stuffed'],
        toppings: ['Extra Cheese', 'Garlic', 'Herbs'],
        isAvailable: true,
        rating: 4.4,
        reviewCount: 95
    },
    {
        name: 'Supreme Pizza',
        description: 'Pepperoni, sausage, peppers, onions, mushrooms, and olives',
        category: 'non-veg',
        basePrice: 1399,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Meat', 'Extra Veggies', 'Jalapeños'],
        isAvailable: true,
        rating: 4.6,
        reviewCount: 110
    },
    {
        name: 'Hot Spicy Pizza',
        description: 'Spicy chicken, jalapeños, hot sauce, and pepper jack cheese',
        category: 'non-veg',
        basePrice: 1199,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Jalapeños', 'Ghost Pepper', 'Habanero'],
        isAvailable: true,
        rating: 4.5,
        reviewCount: 78
    },
    {
        name: 'Tandoori Chicken Pizza',
        description: 'Tandoori chicken, onions, peppers, and special tandoori sauce',
        category: 'non-veg',
        basePrice: 1249,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Chicken', 'Paneer', 'Mint Sauce'],
        isAvailable: true,
        featured: true,
        rating: 4.7,
        reviewCount: 130
    },
    {
        name: 'Peri-Peri Pizza',
        description: 'Peri-peri chicken, onions, peppers, and peri-peri sauce',
        category: 'non-veg',
        basePrice: 1199,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Peri-Peri', 'Jalapeños', 'Onions'],
        isAvailable: true,
        rating: 4.6,
        reviewCount: 92
    },
    {
        name: 'Smokey Tikka Pizza',
        description: 'Tikka chicken, smokey sauce, onions, and peppers',
        category: 'non-veg',
        basePrice: 1249,
        image: '🍕',
        sizes: ['Small', 'Medium', 'Large'],
        crusts: ['Thin', 'Regular', 'Thick'],
        toppings: ['Extra Chicken', 'Cheese', 'Onions'],
        isAvailable: true,
        rating: 4.5,
        reviewCount: 88
    },
    {
        name: 'Stuffed Crust Pizza',
        description: 'Cheese-stuffed crust with your choice of toppings',
        category: 'premium',
        basePrice: 1499,
        image: '🍕',
        sizes: ['Medium', 'Large'],
        crusts: ['Stuffed'],
        toppings: ['Pepperoni', 'Chicken', 'Veggies', 'Extra Cheese'],
        isAvailable: true,
        featured: true,
        rating: 4.8,
        reviewCount: 145
    },
    {
        name: 'Crown Crust Pizza',
        description: 'Crown-shaped crust filled with cheese and toppings',
        category: 'premium',
        basePrice: 1699,
        image: '🍕',
        sizes: ['Large'],
        crusts: ['Crown'],
        toppings: ['Chicken', 'Beef', 'Veggies', 'Cheese'],
        isAvailable: true,
        rating: 4.9,
        reviewCount: 67
    },

    // Sides
    {
        name: 'Garlic Bread',
        description: 'Freshly baked bread with garlic butter and herbs',
        category: 'sides',
        basePrice: 299,
        image: '🥖',
        sizes: ['Regular'],
        crusts: [],
        toppings: ['Extra Cheese', 'Jalapeños'],
        isAvailable: true,
        rating: 4.4,
        reviewCount: 156
    },
    {
        name: 'Cheese Sticks',
        description: 'Mozzarella sticks with marinara sauce',
        category: 'sides',
        basePrice: 399,
        image: '🧀',
        sizes: ['Regular'],
        crusts: [],
        toppings: [],
        isAvailable: true,
        rating: 4.5,
        reviewCount: 98
    },
    {
        name: 'French Fries',
        description: 'Crispy golden fries with seasoning',
        category: 'sides',
        basePrice: 249,
        image: '🍟',
        sizes: ['Regular', 'Large'],
        crusts: [],
        toppings: ['Cheese', 'Peri-Peri'],
        isAvailable: true,
        rating: 4.3,
        reviewCount: 210
    },
    {
        name: 'Chicken Pops',
        description: 'Crispy fried chicken pieces with dipping sauce',
        category: 'sides',
        basePrice: 449,
        image: '🍗',
        sizes: ['Regular', 'Large'],
        crusts: [],
        toppings: [],
        isAvailable: true,
        rating: 4.6,
        reviewCount: 134
    },
    {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce, croutons, parmesan, and Caesar dressing',
        category: 'sides',
        basePrice: 349,
        image: '🥗',
        sizes: ['Regular'],
        crusts: [],
        toppings: ['Grilled Chicken', 'Extra Cheese'],
        isAvailable: true,
        rating: 4.2,
        reviewCount: 76
    },

    // Drinks
    {
        name: 'Soft Drinks',
        description: 'Coca-Cola, Pepsi, Sprite, Fanta, or 7UP',
        category: 'drinks',
        basePrice: 149,
        image: '🥤',
        sizes: ['Regular', 'Large'],
        crusts: [],
        toppings: [],
        isAvailable: true,
        rating: 4.0,
        reviewCount: 320
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzahub', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        const insertedProducts = await Product.insertMany(products);
        console.log(`✅ Inserted ${insertedProducts.length} products`);

        console.log('\n📊 Database seeded successfully!');
        console.log(`Total Products: ${insertedProducts.length}`);
        console.log(`- Vegetarian: ${insertedProducts.filter(p => p.category === 'vegetarian').length}`);
        console.log(`- Non-Veg: ${insertedProducts.filter(p => p.category === 'non-veg').length}`);
        console.log(`- Premium: ${insertedProducts.filter(p => p.category === 'premium').length}`);
        console.log(`- Sides: ${insertedProducts.filter(p => p.category === 'sides').length}`);
        console.log(`- Drinks: ${insertedProducts.filter(p => p.category === 'drinks').length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
