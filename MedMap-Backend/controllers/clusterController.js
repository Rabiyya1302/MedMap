const DiseaseReport = require('../models/diseaseReportModel');

async function getClusters(req, res) {
  const { latitude, longitude, disease } = req.query;
  
  const clusters = await DiseaseReport.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [longitude, latitude] },
        distanceField: 'dist.calculated',
        maxDistance: 10000,
        query: { disease },
        spherical: true,
      },
    },
    {
      $group: {
        _id: { $floor: { $divide: ["$dist.calculated", 1000] } },
        reports: { $push: "$_id" },
        avgLocation: { $avg: "$location.coordinates" },
      },
    },
    { $sort: { '_id': 1 } },
  ]);

  res.status(200).json(clusters);
}

module.exports = { getClusters };
