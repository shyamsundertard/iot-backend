-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelayState" (
    "id" SERIAL NOT NULL,
    "relay1" BOOLEAN NOT NULL DEFAULT false,
    "relay2" BOOLEAN NOT NULL DEFAULT false,
    "relay3" BOOLEAN NOT NULL DEFAULT false,
    "relay4" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RelayState_pkey" PRIMARY KEY ("id")
);
