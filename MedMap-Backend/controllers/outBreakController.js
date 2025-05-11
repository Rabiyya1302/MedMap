const detectOutbreak = require('../services/outbreakDetection');

async function checkOutbreak(req, res) {
  const { disease, latitude, longitude } = req.query;
  const outbreakDetected = await detectOutbreak(disease, 10000, [longitude, latitude]);
  res.status(200).json({ outbreakDetected });
}

module.exports = { checkOutbreak };
