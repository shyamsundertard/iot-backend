import express from 'express';
import cors from 'cors';
import sensorRoutes from "./routes/dhtSensor.js"
import pirRoutes from './routes/pirSensor.js';
import relayRoutes from './routes/relays.js';
import mpuRoutes from './routes/mpuSensor.js';
import mpu6050Routes from "./routes/mpu6050.js"

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.use('/dht', sensorRoutes);
app.use('/pir', pirRoutes);
app.use('/relays', relayRoutes);
app.use('/mpu', mpuRoutes);
app.use("/mpu6050", mpu6050Routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
