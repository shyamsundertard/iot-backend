import express from 'express';
// import prisma from '../lib/prisma.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

// Initialize sensor data
async function initializeSensorData() {
  const sensorData = await prisma.dHTSensorData.findFirst();
  if (!sensorData) {
    await prisma.dHTSensorData.create({
      data: {
        temperature: 0,
        humidity: 0
      }
    });
  }
}
initializeSensorData();

// POST: Save DHT Sensor Data
router.post('/', async (req, res) => {
  try {
    const { temperature, humidity } = req.body;

    const sensorData = await prisma.dHTSensorData.create({
      data: { temperature, humidity }
    });

    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Latest Sensor Data
router.get('/latest', async (req, res) => {
  try {
    const latestData = await prisma.dHTSensorData.findFirst({
      orderBy: { timestamp: 'desc' }
    });
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Sensor History (Last 30 readings)
router.get('/history', async (req, res) => {
  try {
    const history = await prisma.dHTSensorData.findMany({
      take: 30,
      orderBy: { timestamp: 'desc' }
    });

    res.json(history.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
