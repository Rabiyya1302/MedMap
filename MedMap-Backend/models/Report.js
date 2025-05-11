import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  diseaseName: String,
  cases: {
    total: Number,
    active: Number,
    recovered: Number,
    deaths: Number,
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number], // [lng, lat]
  },
  region: String,
  trend: String,
  status: String,
  riskLevel: String,
  lastUpdated: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

reportSchema.index({ location: '2dsphere' });

export default mongoose.model('Report', reportSchema);
