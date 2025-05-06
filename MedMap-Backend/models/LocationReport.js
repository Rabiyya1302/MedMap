const mongoose = require('mongoose');

const locationReportSchema = new mongoose.Schema({
  location: { type: String, required: true },
  disease: { type: String, required: true },
  caseCount: { type: Number, default: 1 },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('LocationReport', locationReportSchema);
