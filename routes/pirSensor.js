import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Initialize PIR status
async function initializePIRStatus() {
  const pirStatus = await prisma.pIRStatus.findFirst();
  if (!pirStatus) {
    await prisma.pIRStatus.create({ data: { motionDetected: false } });
  }
}
initializePIRStatus();

// POST: Update PIR Motion Data
router.post('/', async (req, res) => {
  try {
    const { motionDetected } = req.body;

    await prisma.pIRStatus.updateMany({ data: { motionDetected } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: PIR Status
router.get('/', async (req, res) => {
  try {
    const pirStatus = await prisma.pIRStatus.findFirst();
    res.json(pirStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
