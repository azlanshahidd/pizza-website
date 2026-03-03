const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        fullName: {
            type: String,
            required: [true, 'Customer name is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },
        email: {
            type: String
        }
    },
    items: [{
        productId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        size: String,
        crust: String,
        toppings: [String],
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    deliveryAddress: {
        type: String,
        required: [true, 'Delivery address is required']
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cod', 'card', 'wallet', 'bank'],
        default: 'cod'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    estimatedDeliveryTime: {
        type: Number,
        default: 40 // minutes
    },
    notes: String,
    cancelReason: String
}, {
    timestamps: true
});

// Index for faster queries
orderSchema.index({ orderId: 1 });
orderSchema.index({ 'customer.phone': 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
