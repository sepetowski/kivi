-- CreateTable
CREATE TABLE "SerachUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "profileDescription" TEXT NOT NULL,

    CONSTRAINT "SerachUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SerachUser" ADD CONSTRAINT "SerachUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
