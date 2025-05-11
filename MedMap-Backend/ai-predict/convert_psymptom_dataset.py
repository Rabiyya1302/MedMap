# convert_psymptom_dataset.py
import pandas as pd
import json

df = pd.read_csv("Symptom2Disease.csv")
df = df[['label', 'text']]
df.columns = ['disease', 'symptoms']

records = df.to_dict(orient='records')

with open("sentence_disease_data.json", "w", encoding='utf-8') as f:
    json.dump(records, f, indent=2)

print(f"Converted {len(records)} records.")
