const DiseaseReport = require('../models/DiseaseReport');
const moment = require('moment');

async function detectOutbreak(disease, radius, coordinates) {
  const startDate = moment().subtract(1, 'week').toDate(); // Look back 1 week
  const endDate = moment().toDate();

  const reports = await DiseaseReport.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates },
        distanceField: 'dist.calculated',
        maxDistance: radius, // Radius in meters
        query: { disease, timestamp: { $gte: startDate, $lte: endDate } },
        spherical: true,
      },
    },
    { $count: 'reportCount' },
  ]);

  if (reports.length === 0) return false;

  const currentReportCount = reports[0].reportCount;

  const historicalReports = await DiseaseReport.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates },
        distanceField: 'dist.calculated',
        maxDistance: radius,
        query: { disease, timestamp: { $lte: startDate } },
        spherical: true,
      },
    },
    { $count: 'historicalCount' },
  ]);

  const historicalReportCount = historicalReports[0] ? historicalReports[0].historicalCount : 0;

  const outbreakThreshold = historicalReportCount * 2;
  return currentReportCount > outbreakThreshold;
}

module.exports = detectOutbreak;
