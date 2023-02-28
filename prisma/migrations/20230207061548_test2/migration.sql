/*
  Warnings:

  - Added the required column `content` to the `Synth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Synth" ADD COLUMN     "content" VARCHAR(255) NOT NULL,
ALTER COLUMN "file" DROP NOT NULL;
