/*
  Warnings:

  - You are about to drop the `_Seen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Seen" DROP CONSTRAINT "_Seen_A_fkey";

-- DropForeignKey
ALTER TABLE "_Seen" DROP CONSTRAINT "_Seen_B_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_Seen";
