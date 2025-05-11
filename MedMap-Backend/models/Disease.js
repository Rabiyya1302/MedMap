const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
  disease: { type: String, required: true },
  symptoms: { type: String, required: true },
});

module.exports = mongoose.model('Disease', DiseaseSchema);
