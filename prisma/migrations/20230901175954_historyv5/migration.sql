/*
  Warnings:

  - You are about to drop the column `addedByUserId` on the `UserSearchHistory` table. All the data in the column will be lost.
  - Added the required column `serachedUserId` to the `UserSearchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSearchHistory" DROP COLUMN "addedByUserId",
ADD COLUMN     "serachedUserId" TEXT NOT NULL;
