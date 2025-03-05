import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Initialize MPU Data
async function initializeMPUData() {
  const mpuData = await prisma.mPUSensorData.findFirst();
  if (!mpuData) {
    await prisma.mPUSensorData.create({
      data: { accelX: 0, accelY: 0, accelZ: 0, gyroX: 0, gyroY: 0, gyroZ: 0 }
    });
  }
}
initializeMPUData();

// POST: Save MPU Sensor Data
router.post('/', async (req, res) => {
  try {
    const { accelX, accelY, accelZ, gyroX, gyroY, gyroZ } = req.body;

    const mpuData = await prisma.mPUSensorData.create({
      data: { accelX, accelY, accelZ, gyroX, gyroY, gyroZ }
    });

    res.json(mpuData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Latest MPU Sensor Data
router.get('/latest', async (req, res) => {
  try {
    const latestMPUData = await prisma.mPUSensorData.findFirst({
      orderBy: { timestamp: 'desc' }
    });

    res.json(latestMPUData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: MPU Data History
router.get('/history', async (req, res) => {
  try {
    const history = await prisma.mPUSensorData.findMany({
      take: 30,
      orderBy: { timestamp: 'desc' }
    });

    res.json(history.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
