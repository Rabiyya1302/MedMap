const mongoose = require('mongoose');

const diseaseReportSchema = new mongoose.Schema({
  disease: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  severity: { type: String, enum: ['low', 'medium', 'high'], required: true },
});

diseaseReportSchema.index({ location: '2dsphere' }); // For geospatial queries

const DiseaseReport = mongoose.model('DiseaseReport', diseaseReportSchema);
module.exports = DiseaseReport;
