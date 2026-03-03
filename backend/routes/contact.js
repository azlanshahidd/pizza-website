const express = require('express');
const router = express.Router();

// @route   POST /api/contact
// @desc    Handle contact form submission
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Validate phone format (Pakistani number)
        const phoneRegex = /^\+92\s?\d{3}\s?\d{7}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number format'
            });
        }

        // In production, you would:
        // 1. Save to database
        // 2. Send email notification to admin
        // 3. Send confirmation email to user
        
        const contactData = {
            id: 'CNT' + Date.now(),
            name,
            email,
            phone,
            subject,
            message,
            status: 'new',
            createdAt: new Date()
        };

        console.log('Contact form submission:', contactData);

        // Simulate email sending
        // await sendEmail({
        //     to: 'admin@pizzahub.com',
        //     subject: `New Contact Form: ${subject}`,
        //     body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
        // });

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            data: {
                id: contactData.id,
                timestamp: contactData.createdAt
            }
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing your request. Please try again later.',
            error: error.message
        });
    }
});

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Admin
router.get('/', async (req, res) => {
    try {
        // In production, fetch from database
        // For demo, return empty array
        res.json({
            success: true,
            count: 0,
            data: []
        });
    } catch (error) {
        console.error('Error fetching contact submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions',
            error: error.message
        });
    }
});

module.exports = router;
