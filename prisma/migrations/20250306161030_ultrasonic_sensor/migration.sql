-- AlterTable
ALTER TABLE "pir_status" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "pir_status_id_seq";

-- AlterTable
ALTER TABLE "relay_status" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "relay_status_id_seq";

-- CreateTable
CREATE TABLE "Ultrasonic" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "distance" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ultrasonic_pkey" PRIMARY KEY ("id")
);
