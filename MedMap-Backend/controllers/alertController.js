async function alertRedZones(req, res) {
  const { latitude, longitude } = req.query;
  const reports = await DiseaseReport.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [longitude, latitude] },
        distanceField: 'dist.calculated',
        maxDistance: 5000, // 5km radius for red zone detection
        spherical: true,
      },
    },
    {
      $match: { severity: 'high' },
    },
  ]);

  if (reports.length > 0) {
    res.status(200).json({ message: 'Red zone alert triggered!' });
  } else {
    res.status(200).json({ message: 'No red zone alert' });
  }
}

module.exports = { alertRedZones };
