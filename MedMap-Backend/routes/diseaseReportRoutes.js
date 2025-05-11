const express = require('express');
const { submitDiseaseReport } = require('../controllers/diseaseReportController');

const router = express.Router();

router.post('/report', submitDiseaseReport);

module.exports = router;
