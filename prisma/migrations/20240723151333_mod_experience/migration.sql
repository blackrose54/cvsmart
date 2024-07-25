/*
  Warnings:

  - Made the column `summary` on table `Experience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "summary" SET NOT NULL;
