const DiagnosisReport = require('../models/DiagnosisReport');

// ✅ Get clustered reports (e.g., all Malaria reports in a location)
exports.getClusteredReports = async (req, res) => {
  try {
    const { disease } = req.query;

    const matchStage = disease ? { disease } : {};
    const reports = await DiagnosisReport.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { lat: '$location.lat', lng: '$location.lng', disease: '$disease' },
          count: { $sum: 1 },
          reports: { $push: '$$ROOT' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ success: true, clusters: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📈 Get disease trends over time
exports.getDiseaseTrends = async (req, res) => {
  try {
    const trends = await DiagnosisReport.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            disease: "$disease"
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);

    res.status(200).json({ success: true, trends });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
