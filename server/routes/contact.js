const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Configure nodemailer with more robust settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Submit contact form
router.post('/', async (req, res) => {
    console.log('=== Contact Form Submission Started ===');
    console.log('Request body:', req.body);

    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.message) {
        console.error('Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    });

    try {
        console.log('Attempting to save contact to database...');
        const newContact = await contact.save();
        console.log('Contact saved successfully:', newContact);

        // Only attempt to send email if credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
            try {
                console.log('Sending email notification...');
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.ADMIN_EMAIL,
                    subject: 'New Contact Form Submission',
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${req.body.name}</p>
                        <p><strong>Email:</strong> ${req.body.email}</p>
                        <p><strong>Phone:</strong> ${req.body.phone}</p>
                        <p><strong>Message:</strong> ${req.body.message}</p>
                    `
                };

                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Email sending failed:', emailError);
                // Don't fail the whole request if email fails
                // Just log the error and continue
            }
        } else {
            console.log('Email configuration incomplete. Skipping email notification.');
        }

        // Always return success if the contact was saved to database
        res.status(201).json({ 
            message: 'Contact form submitted successfully',
            contact: newContact
        });
    } catch (err) {
        console.error('Error processing contact form:', err);
        res.status(500).json({ 
            message: 'Failed to process contact form',
            error: err.message
        });
    } finally {
        console.log('=== Contact Form Submission Ended ===');
    }
});

module.exports = router; 