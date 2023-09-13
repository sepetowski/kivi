-- CreateEnum
CREATE TYPE "AvaibleThemes" AS ENUM ('PURPLE', 'RED', 'GREEN');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "currentTheme" "AvaibleThemes" NOT NULL DEFAULT 'PURPLE';
