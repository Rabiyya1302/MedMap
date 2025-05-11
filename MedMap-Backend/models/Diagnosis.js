const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  disease: String,
  similarityScore: Number,
  symptomsText: String,
  location: {
    lat: Number,
    lng: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
