const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   GET /api/orders
// @desc    Get all orders
// @access  Admin
router.get('/', async (req, res) => {
    try {
        const { status, phone } = req.query;
        let query = {};

        if (status) {
            query.status = status;
        }

        if (phone) {
            query['customer.phone'] = phone;
        }

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .limit(100);
        
        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
});

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { customer, items, deliveryAddress, paymentMethod, totalPrice } = req.body;

        // Validate required fields
        if (!customer || !customer.fullName || !customer.phone) {
            return res.status(400).json({
                success: false,
                message: 'Customer information is required'
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item'
            });
        }

        if (!deliveryAddress) {
            return res.status(400).json({
                success: false,
                message: 'Delivery address is required'
            });
        }

        // Generate order ID
        const orderId = 'HP' + Date.now().toString().slice(-8);

        // Create order
        const order = await Order.create({
            orderId,
            customer: {
                fullName: customer.fullName,
                phone: customer.phone,
                email: customer.email || ''
            },
            items: items.map(item => ({
                productId: item.productId,
                name: item.name,
                size: item.size,
                crust: item.crust,
                toppings: item.toppings || [],
                quantity: item.quantity,
                price: item.price
            })),
            deliveryAddress,
            paymentMethod: paymentMethod || 'cod',
            totalPrice,
            status: 'pending',
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid'
        });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Admin
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        const validStatuses = ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: order
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(400).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        });
    }
});

// @route   GET /api/orders/customer/:phone
// @desc    Get orders by customer phone
// @access  Public
router.get('/customer/:phone', async (req, res) => {
    try {
        const orders = await Order.find({ 'customer.phone': req.params.phone })
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

// @route   DELETE /api/orders/:id
// @desc    Cancel order
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Only allow cancellation if order is pending or confirmed
        if (!['pending', 'confirmed'].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: 'Order cannot be cancelled at this stage'
            });
        }

        order.status = 'cancelled';
        await order.save();

        res.json({
            success: true,
            message: 'Order cancelled successfully',
            data: order
        });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({
            success: false,
            message: 'Error cancelling order',
            error: error.message
        });
    }
});

module.exports = router;
