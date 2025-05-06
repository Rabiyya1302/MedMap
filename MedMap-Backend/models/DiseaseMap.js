const mongoose = require('mongoose');

const DiseaseMapSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DiseaseMap', DiseaseMapSchema);
