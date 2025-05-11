// /controllers/diagnosisController.js
const { spawn } = require('child_process');
const DiagnosisReport = require('../models/DiagnosisReport');

exports.diagnose = async (req, res) => {
  const { symptoms, location, userId } = req.body;
  const symptomsText = Array.isArray(symptoms) ? symptoms.join(' ') : '';

  const lat = location?.latitude;
  const lng = location?.longitude;

  const python = spawn('python3', ['python/nlp_predict.py', symptomsText]);

  let result = '';
  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', async (code) => {
    try {
      const parsed = JSON.parse(result.trim()); // handles JSON output from Python

      // Adapt response to match frontend DiagnosisResponse type
      const response = {
        query_symptoms: symptoms,
        possible_diseases: Array.isArray(parsed)
          ? parsed.map(item => ({
              disease: item.disease,
              confidence: item.score?.toString() || '',
              health_tip_en: item.health_tip_en || ''
            }))
          : []
      };

      const best = Array.isArray(parsed) ? parsed[0] : parsed;

      const report = new DiagnosisReport({
        userId,
        disease: best.disease,
        symptomsText,
        similarityScore: best.score,
        location: { lat, lng },
      });

      await report.save();

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ success: false, error: 'Diagnosis failed', details: err.message });
    }
  });
};
