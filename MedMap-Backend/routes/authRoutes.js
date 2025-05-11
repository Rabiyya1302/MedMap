const express = require('express');
// Change import statements to CommonJS require syntax for Node.js compatibility
const { register, login, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
