/*
  Warnings:

  - You are about to drop the `User_ID` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detail` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `imgurl` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `name_game` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.
  - Added the required column `description` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_ID_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User_ID";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "playerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");
