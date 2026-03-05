const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { phone, email, fullName, address } = req.body;

        // Validate required fields
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        // Check if user already exists
        let user = await User.findOne({ phone });
        
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User with this phone number already exists'
            });
        }

        // Create new user
        user = await User.create({
            phone,
            email: email || '',
            fullName: fullName || '',
            address: address || ''
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    phone: user.phone,
                    email: user.email,
                    fullName: user.fullName,
                    address: user.address
                },
                token
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(400).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
});

// @route   POST /api/users/login
// @desc    Login user (no OTP required)
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        // Validate phone number format (must start with + and have at least 10 digits)
        const cleanPhone = phone.replace(/\s/g, '');
        
        if (!cleanPhone.startsWith('+')) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must include country code (e.g., +92)'
            });
        }
        
        // Extract country code and number
        const phoneDigits = cleanPhone.substring(1).replace(/\D/g, '');
        
        if (phoneDigits.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must be at least 10 digits'
            });
        }

        // Find or create user
        let user = await User.findOne({ phone: cleanPhone });
        
        if (!user) {
            // Auto-register user
            user = await User.create({ phone: cleanPhone });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    phone: user.phone,
                    email: user.email,
                    fullName: user.fullName,
                    address: user.address
                },
                token
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

// OTP verification removed - direct login is now used

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Public (with phone query)
router.get('/profile', async (req, res) => {
    try {
        const { phone } = req.query;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Public
router.put('/profile', async (req, res) => {
    try {
        const { phone, email, fullName, address } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        const user = await User.findOneAndUpdate(
            { phone },
            { email, fullName, address },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(400).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

module.exports = router;
