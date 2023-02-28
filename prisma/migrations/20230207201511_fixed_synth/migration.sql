/*
  Warnings:

  - Made the column `file` on table `Synth` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Synth` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Synth" ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
