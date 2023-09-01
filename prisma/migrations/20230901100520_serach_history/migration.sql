/*
  Warnings:

  - You are about to drop the `SerachUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SerachUser" DROP CONSTRAINT "SerachUser_userId_fkey";

-- DropTable
DROP TABLE "SerachUser";

-- CreateTable
CREATE TABLE "UserSearchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "searchedUserId" TEXT NOT NULL,

    CONSTRAINT "UserSearchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSearchHistory" ADD CONSTRAINT "UserSearchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
