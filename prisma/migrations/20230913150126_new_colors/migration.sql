-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AvaibleThemes" ADD VALUE 'BLUE';
ALTER TYPE "AvaibleThemes" ADD VALUE 'PINK';
ALTER TYPE "AvaibleThemes" ADD VALUE 'YELLOW';
ALTER TYPE "AvaibleThemes" ADD VALUE 'ORANGE';
ALTER TYPE "AvaibleThemes" ADD VALUE 'CYAN';
ALTER TYPE "AvaibleThemes" ADD VALUE 'LIME';
ALTER TYPE "AvaibleThemes" ADD VALUE 'EMERALD';
ALTER TYPE "AvaibleThemes" ADD VALUE 'INDIGO';
