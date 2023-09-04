-- CreateEnum
CREATE TYPE "NotfiyType" AS ENUM ('NEW_FOLLOW', 'NEW_POST_LIKE', 'NEW_POST_DISS_LIKE', 'NEW_COMMENT_LIKE', 'NEW_COMMENT_DISS_LIKE', 'NEW_COMMENT', 'NEW_REPALY');

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "unseen" BOOLEAN NOT NULL DEFAULT false,
    "notifyType" "NotfiyType" NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acctionMadeByUserId" TEXT NOT NULL,
    "postsId" TEXT,
    "commentId" TEXT,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
