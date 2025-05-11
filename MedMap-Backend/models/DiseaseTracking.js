// models/DiseaseTracking.js
const mongoose = require('mongoose');

const DiseaseTrackingSchema = new mongoose.Schema({
  diseaseName: String,
  location: String,
  casesReported: Number,
  dateReported: { type: Date, default: Date.now },
  severity: String, // Mild, Moderate, Severe
}, { timestamps: true });

module.exports = mongoose.model('DiseaseTracking', DiseaseTrackingSchema);
