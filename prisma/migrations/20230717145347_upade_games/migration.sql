/*
  Warnings:

  - You are about to drop the column `nickName` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `playingSince` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Game` table. All the data in the column will be lost.
  - Added the required column `image` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "nickName",
DROP COLUMN "playingSince",
DROP COLUMN "rank",
ADD COLUMN     "image" TEXT NOT NULL;
