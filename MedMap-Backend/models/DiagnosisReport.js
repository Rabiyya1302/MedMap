const mongoose = require('mongoose');

const DiagnosisReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // If you have a User model
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  symptomsText: {
    type: String,
    required: true,
  },
  similarityScore: {
    type: Number,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DiagnosisReport', DiagnosisReportSchema);
