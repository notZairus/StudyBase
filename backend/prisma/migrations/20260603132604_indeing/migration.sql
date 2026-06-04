/*
  Warnings:

  - You are about to drop the `_TaskSubjectRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `parentId` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_TaskSubjectRelation_B_index";

-- DropIndex
DROP INDEX "_TaskSubjectRelation_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TaskSubjectRelation";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Subtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subtask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SubjectTaskRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SubjectTaskRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SubjectTaskRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadline" DATETIME,
    "color" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completedAt" DATETIME
);
INSERT INTO "new_Task" ("color", "completedAt", "createdAt", "deadline", "description", "id", "name", "status", "updatedAt", "userId") SELECT "color", "completedAt", "createdAt", "deadline", "description", "id", "name", "status", "updatedAt", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE INDEX "Task_userId_idx" ON "Task"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Subtask_taskId_idx" ON "Subtask"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectTaskRelation_AB_unique" ON "_SubjectTaskRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectTaskRelation_B_index" ON "_SubjectTaskRelation"("B");
