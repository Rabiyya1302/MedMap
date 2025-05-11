const express = require('express');
const { checkOutbreak } = require('../controllers/outBreakController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/outbreak', authenticate, authorizeRoles('official'), checkOutbreak);

module.exports = router;
