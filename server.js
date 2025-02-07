import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize PIR status if not exists
async function initializePIRStatus() {
  const pirStatus = await prisma.pIRStatus.findFirst();
  if (!pirStatus) {
    await prisma.pIRStatus.create({
      data: {
        motionDetected: false
      }
    });
  }
}

// Initialize relay status if not exists
async function initializeRelayStatus() {
  const relayStatus = await prisma.relayStatus.findFirst();
  if (!relayStatus) {
    await prisma.relayStatus.create({
      data: {
        relay1: false,
        relay2: false,
        relay3: false,
        relay4: false
      }
    });
  }
}

// Initialize on server start
initializePIRStatus();
initializeRelayStatus();

// Route to receive sensor data
app.post('/sensors', async (req, res) => {
  try {
    const { temperature, humidity } = req.body;
    
    // Save sensor data
    const sensorData = await prisma.sensorData.create({
      data: {
        temperature,
        humidity
      }
    });

    // Update relay1 status based on temperature
    const relay1Status = temperature > 20.0;
    await prisma.relayStatus.updateMany({
      data: {
        relay1: relay1Status
      }
    });

    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to receive PIR sensor data
app.post('/pir', async (req, res) => {
  try {
    const { motionDetected } = req.body;
    
    await prisma.pIRStatus.updateMany({
      data: {
        motionDetected
      }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get latest sensor data
app.get('/sensors/latest', async (req, res) => {
  try {
    const latestData = await prisma.sensorData.findFirst({
      orderBy: {
        timestamp: 'desc'
      }
    });
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get PIR status
app.get('/pir', async (req, res) => {
  try {
    const pirStatus = await prisma.pIRStatus.findFirst();
    res.json(pirStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get relay states
app.get('/relays', async (req, res) => {
  try {
    const relayStatus = await prisma.relayStatus.findFirst();
    res.json(relayStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update relay states
app.post('/relays', async (req, res) => {
  try {
    const { relay2, relay3, relay4 } = req.body;
    const updatedStatus = await prisma.relayStatus.updateMany({
      data: {
        relay2,
        relay3,
        relay4
      }
    });
    res.json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// History dht sensor
app.get('/sensors/history', async (req, res) => {
  try {
    const history = await prisma.sensorData.findMany({
      take: 30,  // Last 30 readings
      orderBy: {
        timestamp: 'desc'
      }
    });
    
    res.json(history.reverse());  // Reverse to get chronological order
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});