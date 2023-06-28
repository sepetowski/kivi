/*
  Warnings:

  - Added the required column `gameName` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameName" TEXT NOT NULL;
