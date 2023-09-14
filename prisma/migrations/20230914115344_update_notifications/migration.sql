-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSearchHistory" DROP CONSTRAINT "UserSearchHistory_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserSearchHistory" ADD CONSTRAINT "UserSearchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
