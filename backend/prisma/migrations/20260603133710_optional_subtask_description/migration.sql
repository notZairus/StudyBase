-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subtask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subtask_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Subtask" ("color", "createdAt", "description", "id", "name", "parentId", "status", "updatedAt") SELECT "color", "createdAt", "description", "id", "name", "parentId", "status", "updatedAt" FROM "Subtask";
DROP TABLE "Subtask";
ALTER TABLE "new_Subtask" RENAME TO "Subtask";
CREATE INDEX "Subtask_parentId_idx" ON "Subtask"("parentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
