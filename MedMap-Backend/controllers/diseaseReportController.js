const DiseaseReport = require('../models/DiseaseReport');

// Controller to submit a disease report
async function submitDiseaseReport(req, res) {
  const { disease, location, severity, userId } = req.body;

  try {
    const newReport = new DiseaseReport({ disease, location, severity, userId });
    await newReport.save();
    res.status(200).json({ message: 'Report submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

// Controller to fetch disease reports
async function fetchDiseaseReports(req, res) {
  try {
    const reports = await DiseaseReport.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { submitDiseaseReport, fetchDiseaseReports };
