const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const DiseaseTracking = require('../models/DiseaseTracking');

// POST /api/diseases
router.post('/diseases', authenticate, authorizeRoles('official'), async (req, res) => {
  const { diseaseName, location, casesReported, severity } = req.body;

  try {
    const newEntry = new DiseaseTracking({
      diseaseName,
      location,
      casesReported,
      severity,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Disease data added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding data' });
  }
});

module.exports = router;
