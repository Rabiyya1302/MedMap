const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your user model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, phone });

    await newUser.save();

    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', detail: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Optional: Generate JWT if needed
    // const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1d' });

    res.status(200).json({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', detail: err.message });
  }
});

module.exports = router;
