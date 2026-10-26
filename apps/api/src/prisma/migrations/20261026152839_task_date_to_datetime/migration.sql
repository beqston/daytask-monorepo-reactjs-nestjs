/*
  Warnings:

  - Changed the type of `date` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "date",
ADD COLUMN     "date" DATE NOT NULL,
ALTER COLUMN "percentage" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Task_isCompleted_idx" ON "Task"("isCompleted");

-- CreateIndex
CREATE INDEX "Task_authorId_idx" ON "Task"("authorId");

-- CreateIndex
CREATE INDEX "Task_date_idx" ON "Task"("date");

-- CreateIndex
CREATE INDEX "Task_isCompleted_date_idx" ON "Task"("isCompleted", "date");
