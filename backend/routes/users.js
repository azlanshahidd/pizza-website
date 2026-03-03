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
// @desc    Login user / Send OTP
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

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store OTP with 10 minute expiry
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        user.otpAttempts = 0; // Reset attempts
        await user.save();

        console.log(`📱 OTP for ${cleanPhone}: ${otp}`); // For demo purposes
        console.log(`⏰ OTP expires at: ${new Date(user.otpExpiry).toLocaleTimeString()}`);

        // In production, send actual SMS via Twilio, AWS SNS, or other SMS service
        // await sendSMS(cleanPhone, `Your Hungry? Pizza? OTP is: ${otp}. Valid for 10 minutes.`);

        res.json({
            success: true,
            message: 'OTP sent successfully',
            // In production, don't send OTP in response
            otp: process.env.NODE_ENV === 'development' ? otp : undefined,
            expiresIn: '10 minutes'
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending OTP',
            error: error.message
        });
    }
});

// @route   POST /api/users/verify-otp
// @desc    Verify OTP and login
// @access  Public
router.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Phone number and OTP are required'
            });
        }

        // Validate OTP format (6 digits)
        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({
                success: false,
                message: 'OTP must be 6 digits'
            });
        }

        const cleanPhone = phone.replace(/\s/g, '');
        const user = await User.findOne({ phone: cleanPhone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please request OTP first.'
            });
        }

        // Check if OTP exists
        if (!user.otp) {
            return res.status(400).json({
                success: false,
                message: 'No OTP found. Please request a new OTP.'
            });
        }

        // Check OTP expiry
        if (user.otpExpiry < Date.now()) {
            // Clear expired OTP
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();
            
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new OTP.'
            });
        }

        // Check for too many attempts (rate limiting)
        if (user.otpAttempts >= 5) {
            return res.status(429).json({
                success: false,
                message: 'Too many failed attempts. Please request a new OTP.'
            });
        }

        // Verify OTP
        if (user.otp !== otp) {
            // Increment failed attempts
            user.otpAttempts = (user.otpAttempts || 0) + 1;
            await user.save();
            
            const remainingAttempts = 5 - user.otpAttempts;
            
            return res.status(400).json({
                success: false,
                message: `Invalid OTP. ${remainingAttempts} attempts remaining.`
            });
        }

        // OTP is valid - clear it and log user in
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.otpAttempts = 0;
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
        console.error('Error verifying OTP:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying OTP',
            error: error.message
        });
    }
});

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

        const user = await User.findOne({ phone }).select('-otp -otpExpiry');

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
        ).select('-otp -otpExpiry');

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
        const users = await User.find().select('-otp -otpExpiry').sort({ createdAt: -1 });
        
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
