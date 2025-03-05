import express from "express";
import prisma from "../lib/prisma.js";
const router = express.Router();

async function initializeMPU6050() {
  const mpu6050data = await prisma.mPU6050.findFirst();
  if (!mpu6050data) {
    await prisma.mPU6050.create({
      data: { accX: 1, accY: 2, accZ: 3 }
    });
  }
}
initializeMPU6050();

// Endpoint to receive MPU6050 data
router.post("/", async (req, res) => {
  try {
    const { accX, accY, accZ } = req.body;

    if (accX === undefined || accY === undefined || accZ === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sensorData = await prisma.mPU6050.create({
      data: { accX, accY, accZ },
    });

    return res.status(201).json({ message: "Data stored", data: sensorData });
  } catch (error) {
    console.error("Error storing MPU6050 data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all MPU6050 sensor data
router.get("/history", async (req, res) => {
  try {
    const data = await prisma.mPU6050.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching MPU6050 data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch latest MPU6050 data
router.get("/latest", async (req, res) => {
  try {
    const latestData = await prisma.mPU6050.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!latestData) {
      return res.status(404).json({ error: "No data found" });
    }

    return res.status(200).json(latestData);
  } catch (error) {
    console.error("Error fetching latest MPU6050 data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
