const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
  disease: String,
  symptoms_en: [String],
  symptom_sentence_en: String,
  health_tip_en: String
});

module.exports = mongoose.model('Disease', DiseaseSchema);

