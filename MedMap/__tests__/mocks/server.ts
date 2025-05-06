import { setupServer } from 'msw/node';
import { rest } from 'msw';
import type { DiagnosisRequest, DiagnosisResult, DiseaseMapData } from '../../types/api';

const server = setupServer(
  // Mock diagnosis endpoint
  rest.post('/api/diagnosis', async (req, res, ctx) => {
    const body = await req.json() as DiagnosisRequest;
    
    if (!body.symptoms || body.symptoms.length === 0) {
      return res(
        ctx.status(400),
        ctx.json({
          error: 'INVALID_INPUT',
          message: 'Symptoms array is required and must not be empty',
        })
      );
    }

    const mockDiagnosis: DiagnosisResult = {
      disease: 'Influenza',
      confidence: 0.85,
      severity: 'moderate',
      recommendedActions: [
        'Rest and stay hydrated',
        'Consult a healthcare provider if symptoms worsen',
        'Take over-the-counter medications to reduce fever',
      ],
      symptoms: body.symptoms,
      timestamp: new Date().toISOString(),
      patientInfo: body.patientInfo,
    };

    return res(ctx.json({ data: mockDiagnosis }));
  }),

  // Mock diagnosis history endpoint
  rest.get('/api/diagnosis/history', (req, res, ctx) => {
    const mockHistory = [
      {
        results: {
          disease: 'Influenza',
          confidence: 0.85,
          severity: 'moderate',
          recommendedActions: ['Rest', 'Stay hydrated'],
          symptoms: ['fever', 'cough'],
          timestamp: new Date().toISOString(),
        },
        symptoms: ['fever', 'cough'],
      },
    ];

    return res(ctx.json({ data: mockHistory }));
  }),

  // Mock disease map data endpoint
  rest.get('/api/disease-map', (req, res, ctx) => {
    const mockMapData: DiseaseMapData[] = [
      {
        id: '1',
        disease: 'Influenza',
        severity: 'medium',
        region: 'North America',
        latitude: 40.7128,
        longitude: -74.0060,
        cases: 1000,
        date: new Date().toISOString(),
        symptoms: ['fever', 'cough'],
        confidence: 0.85,
      },
    ];

    return res(ctx.json({ data: mockMapData }));
  }),

  // Mock outbreak alerts endpoint
  rest.get('/api/outbreak-alerts', (req, res, ctx) => {
    const mockAlerts = [
      {
        id: '1',
        disease: 'Influenza',
        severity: 'high',
        region: 'North America',
        description: 'Increased cases reported',
        timestamp: new Date().toISOString(),
        read: false,
      },
    ];

    return res(ctx.json({ data: mockAlerts }));
  }),

  // Mock error response
  rest.get('/api/error', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        error: 'SERVER_ERROR',
        message: 'Internal server error',
      })
    );
  })
);

export { server }; 