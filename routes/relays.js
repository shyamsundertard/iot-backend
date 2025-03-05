import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Initialize relay states
async function initializeRelayStatus() {
  const relayStatus = await prisma.relayStatus.findFirst();
  if (!relayStatus) {
    await prisma.relayStatus.create({
      data: { relay1: false, relay2: false, relay3: false, relay4: false }
    });
  }
}
initializeRelayStatus();

// GET: Fetch Relay States
router.get('/', async (req, res) => {
  try {
    const relayStatus = await prisma.relayStatus.findFirst();
    res.json(relayStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Update Relay States
router.post('/', async (req, res) => {
  try {
    const { relay2, relay3, relay4 } = req.body;

    const updatedStatus = await prisma.relayStatus.updateMany({
      data: { relay2, relay3, relay4 }
    });

    res.json(updatedStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
