const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const natural = require('natural'); // Make sure this is installed: npm install natural
const authRoutes = require('./routes/auth');
const connectDB = require('./db/connect');
const Disease = require('./models/Disease');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

// Cosine similarity function
function cosineSimilarity(vec1, vec2) {
  const dot = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val ** 2, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val ** 2, 0));
  return mag1 && mag2 ? dot / (mag1 * mag2) : 0;
}

// Diagnosis route
app.post('/diagnose', async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ error: 'Symptoms must be an array of strings.' });
  }

  try {
    const diseases = await Disease.find();
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    // Add all disease symptom texts to TF-IDF
    diseases.forEach(d => tfidf.addDocument(d.symptoms_en.join(' ')));

    // Create vocabulary from all documents
    const vocabulary = new Set();
    tfidf.documents.forEach(doc => {
      Object.keys(doc).forEach(term => vocabulary.add(term));
    });
    const vocabArray = Array.from(vocabulary);

    // Vectorize each disease
    const diseaseVectors = diseases.map((d, i) => {
      const vec = vocabArray.map(term => tfidf.tfidf(term, i));
      return { ...d._doc, vector: vec };
    });

    // Vectorize user input
    const inputText = symptoms.join(' ');
    const inputVector = vocabArray.map(term => tfidf.tfidf(term, inputText));

    // Calculate cosine similarity for each disease
    const scoredResults = diseaseVectors.map(d => {
      const confidence = cosineSimilarity(inputVector, d.vector);
      return {
        disease: d.disease,
        confidence: confidence.toFixed(4),
        health_tip_en: d.health_tip_en
      };
    }).filter(r => r.confidence > 0.1); // Confidence threshold like Infermedica

    scoredResults.sort((a, b) => b.confidence - a.confidence);

    return res.json({
      query_symptoms: symptoms,
      possible_diseases: scoredResults
    });

  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ error: 'Server error during diagnosis.' });
  }
});

// Start server
const start = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to Database");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

start();
