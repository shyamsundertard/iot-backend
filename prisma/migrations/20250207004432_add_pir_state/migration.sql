-- CreateTable
CREATE TABLE "PirState" (
    "id" SERIAL NOT NULL,
    "motion" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PirState_pkey" PRIMARY KEY ("id")
);
