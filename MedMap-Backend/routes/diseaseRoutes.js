// routes/diseaseRoutes.ts (example)
import express from 'express';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';
import { getAllDiseases, createOutbreak } from '../controllers/diseaseController';

const router = express.Router();

// Public route (view all diseases)
router.get('/all', authenticate, getAllDiseases);

// Only admin/health officials can create an outbreak
router.post('/report', authenticate, authorizeRoles('admin'), createOutbreak);

export default router;
