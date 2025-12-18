/*
  Warnings:

  - Added the required column `stuImage` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "stuImage" TEXT NOT NULL,
    CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("emailId", "firstName", "gender", "id", "lastName", "teacherId") SELECT "emailId", "firstName", "gender", "id", "lastName", "teacherId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_emailId_key" ON "Student"("emailId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
