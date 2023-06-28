/*
  Warnings:

  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `nick` on the `Game` table. All the data in the column will be lost.
  - Added the required column `nickName` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "name",
DROP COLUMN "nick",
ADD COLUMN     "nickName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileDescription" SET DEFAULT 'I am new here';
