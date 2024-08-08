-- CreateEnum
CREATE TYPE "Template" AS ENUM ('Jakes', 'DTU');

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "template" "Template" NOT NULL DEFAULT 'Jakes';
