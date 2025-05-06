import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class SymptomDiagnosisEngine:
    def __init__(self, json_path: str):
        self.diseases = []
        self.symptom_sentences = []
        self.tips = []
        self.vectorizer = TfidfVectorizer()

        # Load dataset
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            self.symptom_sentences.append(item['symptom_sentence_en'])
            self.diseases.append(item['disease'])
            self.tips.append(item.get('health_tips_en', 'No health tip available'))

        # Fit TF-IDF vectorizer
        self.tfidf_matrix = self.vectorizer.fit_transform(self.symptom_sentences)

    def predict(self, user_input: str):
        user_vector = self.vectorizer.transform([user_input])
        similarity_scores = cosine_similarity(user_vector, self.tfidf_matrix)
        best_match_index = np.argmax(similarity_scores)

        return {
            "predicted_disease": self.diseases[best_match_index],
            "matched_symptoms": self.symptom_sentences[best_match_index],
            "health_tip": self.tips[best_match_index],
            "similarity_score": float(similarity_scores[0][best_match_index])
        }
