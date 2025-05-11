const express = require('express');
const { getClusters } = require('../controllers/clusterController');

const router = express.Router();

router.get('/clusters', getClusters);

module.exports = router;
