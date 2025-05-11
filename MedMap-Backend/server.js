const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const natural = require('natural'); // Make sure this is installed: npm install natural
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./db/connect');
const Disease = require('./models/Disease');
const Report=require('./models/Report')
const {exec}=require("child_process")
const dotenv=require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 5000;
const diagnosis=require("./routes/diagnosisRoutes")
const diseaseReportRoutes = require('./routes/diseaseReportRoutes');
const outbreakRoutes = require('./routes/outbreakRoutes');
const clusterRoutes = require('./routes/clusterRoutes');
const alertRoutes = require('./routes/alertRoutes');
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api",diagnosis)
app.use('/api/reports', diseaseReportRoutes);
app.use('/api', outbreakRoutes);
app.use('/api', clusterRoutes);
app.use('/api', alertRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/api', adminRoutes);

// GET /api/diseases/:location
//new latest diagnosis route

app.get('/api/diseases/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const diseases = await DiseaseTracking.find({ location });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching disease data' });
  }
});
//NLP Integration
function predictDisease(symtpoms){
  return new Promise((resolve,reject)=>{
    exec(`python3 nlp_predict.py "${symptoms}"`,(err,stdout,stderr)=>{
      if(err){
        return reject(stderr);
        resolve(stdout.trim());
      }
    })
  })
}
//POST /api/report-Diagnose+Track
app.post("/api/report",async(req,res)=>{
  const{userId,symptoms,location}=req.body;
  try {
    const disease=await predictDisease(symptoms);
    const report=new Report({
      userId,
      disease,
      symptoms,
      location:{
        type:"Point",
        coordinates:[location.lng,location.lat]
      }
    });
    await report.save();
    res.json({success:true,disease})
  } catch (error) {
    res.status(500).json({error:"Prediction or save failed",details:error})
  }
})
api.get("/api/reports",async(req,res)=>{
  const reports=await Report.find().limit(100).sort({timestamp:-1})
  res.json(reports)
})
// GET /api/diseases
app.get('/api/diseases', async (req, res) => {
  try {
    const diseases = await DiseaseTracking.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching disease data' });
  }
});



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
