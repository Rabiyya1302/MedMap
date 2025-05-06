from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diagnosis_engine import SymptomDiagnosisEngine

app = FastAPI()

# Load model once
engine = SymptomDiagnosisEngine("english_symptom_to_disease_dataset_100x10.json")

class SymptomRequest(BaseModel):
    symptoms: str

@app.post("/diagnose")
def diagnose(symptom_data: SymptomRequest):
    if not symptom_data.symptoms:
        raise HTTPException(status_code=400, detail="Symptoms are required")

    result = engine.predict(symptom_data.symptoms)
    return result
