/*
  Warnings:

  - You are about to drop the column `experience` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `type` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('Framework', 'Tools', 'Language');

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "experience",
ADD COLUMN     "type" "SkillType" NOT NULL;
