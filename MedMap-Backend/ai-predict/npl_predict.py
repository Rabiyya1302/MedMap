# nlp_predict.py
import json
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

with open("sentence_disease_data.json") as f:
    diseases = json.load(f)

corpus = [d["symptoms"] for d in diseases]
names = [d["disease"] for d in diseases]

vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(corpus)

user_input = sys.argv[1]
user_vec = vectorizer.transform([user_input])

cos_sim = cosine_similarity(user_vec, X).flatten()
best_index = cos_sim.argmax()
score = cos_sim[best_index]

if score < 0.2:
    print("Unknown")
else:
    print(names[best_index])
