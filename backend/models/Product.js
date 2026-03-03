const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['vegetarian', 'non-veg', 'premium', 'deals', 'sides', 'drinks']
    },
    basePrice: {
        type: Number,
        required: [true, 'Base price is required'],
        min: 0
    },
    image: {
        type: String,
        default: '🍕'
    },
    sizes: [{
        type: String,
        enum: ['Small', 'Medium', 'Large', 'Extra Large']
    }],
    crusts: [{
        type: String,
        enum: ['Thin', 'Regular', 'Thick', 'Stuffed', 'Cheese Burst']
    }],
    toppings: [{
        type: String
    }],
    isAvailable: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
