import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { distance } = req.body;

    if (typeof distance !== "number") {
      return res.status(400).json({ message: "Invalid distance value" });
    }

    const updatedData = await prisma.ultrasonic.upsert({
      where: { id: 1 },
      update: { distance },
      create: { id: 1, distance },
    });

    res.json({ message: "Distance updated", data: updatedData });
  } catch (error) {
    console.error("Error updating distance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await prisma.ultrasonic.findUnique({
      where: { id: 1 },
    });

    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching distance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
