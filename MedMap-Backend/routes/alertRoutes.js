const express = require('express');
const { alertRedZones } = require('../controllers/alertController');

const router = express.Router();

router.get('/alert', alertRedZones);

module.exports = router;
