/*
  Warnings:

  - You are about to drop the column `name` on the `Synth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Synth" DROP COLUMN "name",
ADD COLUMN     "title" VARCHAR(255);
