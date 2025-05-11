// /routes/diagnosisRoutes.js
const express = require('express');
const router = express.Router();
const { diagnose } = require('../controllers/diagnosisController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/diagnose', authenticate, diagnose); // POST /api/diagnose protected by auth

module.exports = router;
