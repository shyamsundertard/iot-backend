/*
  Warnings:

  - You are about to drop the `PirState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RelayState` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensorData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PirState";

-- DropTable
DROP TABLE "RelayState";

-- DropTable
DROP TABLE "SensorData";

-- CreateTable
CREATE TABLE "DHTSensorData" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DHTSensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MPUSensorData" (
    "id" SERIAL NOT NULL,
    "accelX" DOUBLE PRECISION NOT NULL,
    "accelY" DOUBLE PRECISION NOT NULL,
    "accelZ" DOUBLE PRECISION NOT NULL,
    "gyroX" DOUBLE PRECISION NOT NULL,
    "gyroY" DOUBLE PRECISION NOT NULL,
    "gyroZ" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MPUSensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pir_status" (
    "id" SERIAL NOT NULL,
    "motionDetected" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pir_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relay_status" (
    "id" SERIAL NOT NULL,
    "relay1" BOOLEAN NOT NULL DEFAULT false,
    "relay2" BOOLEAN NOT NULL DEFAULT false,
    "relay3" BOOLEAN NOT NULL DEFAULT false,
    "relay4" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "relay_status_pkey" PRIMARY KEY ("id")
);
