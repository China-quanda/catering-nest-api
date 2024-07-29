-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
