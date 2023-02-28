-- CreateTable
CREATE TABLE "Synth" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "file" JSONB NOT NULL,

    CONSTRAINT "Synth_pkey" PRIMARY KEY ("id")
);
