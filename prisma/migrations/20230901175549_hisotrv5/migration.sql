/*
  Warnings:

  - You are about to drop the `SearchHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SearchHistory" DROP CONSTRAINT "SearchHistory_userId_fkey";

-- DropTable
DROP TABLE "SearchHistory";

-- CreateTable
CREATE TABLE "UserSearchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "addedByUserId" TEXT NOT NULL,
    "serachDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSearchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSearchHistory" ADD CONSTRAINT "UserSearchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
