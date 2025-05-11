const express = require('express');
const { getClusteredReports, getDiseaseTrends } = require('../controllers/adminController');

const router = express.Router();

router.get('/admin/clusters', getClusteredReports);     // Geo clustering view
router.get('/admin/trends', getDiseaseTrends);          // Time-based trend view

module.exports = router;
