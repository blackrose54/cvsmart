-- CreateTable
CREATE TABLE "Positions" (
    "id" SERIAL NOT NULL,
    "resumeId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Positions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Positions_resumeId_idx" ON "Positions"("resumeId");

-- AddForeignKey
ALTER TABLE "Positions" ADD CONSTRAINT "Positions_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
