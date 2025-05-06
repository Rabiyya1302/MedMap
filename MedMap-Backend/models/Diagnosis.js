const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  condition: { type: String, required: true },
  probability: { type: Number },
  diagnosedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Diagnosis', diagnosisSchema);
