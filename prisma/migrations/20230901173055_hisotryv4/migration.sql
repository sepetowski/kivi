/*
  Warnings:

  - Added the required column `addedByUserId` to the `UserSearchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSearchHistory" ADD COLUMN     "addedByUserId" TEXT NOT NULL;
