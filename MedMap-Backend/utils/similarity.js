const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

function getSimilarity(userText, diseases) {
  tfidf.addDocument(userText);
  diseases.forEach((d) => tfidf.addDocument(d.symptoms));

  let scores = [];
  for (let i = 1; i < diseases.length + 1; i++) {
    const score = tfidf.tfidf(0, i);
    scores.push({ disease: diseases[i - 1].name, score });
  }

  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, 3); // Top 3 matches
}

module.exports = { getSimilarity };
