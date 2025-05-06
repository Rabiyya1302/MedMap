const mongoose = require('mongoose');
const fs = require('fs');

const DiseaseSchema = new mongoose.Schema({
  disease: String,
  symptom_sentence_en: String,
  symptoms_en: [String],
  health_tip_en: String
});

const Disease = mongoose.model('Disease', DiseaseSchema);

mongoose.connect('mongodb+srv://MedMap:zNF22.xgeHKp3Kt@cluster0.atpyd0f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB.');

  const data = JSON.parse(fs.readFileSync('synced_augmented_disease_symptom_dataset.json', 'utf-8'));

  await Disease.deleteMany(); // Optional: Clear existing collection
  await Disease.insertMany(data);

  console.log('Disease data imported successfully.');
  process.exit();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
