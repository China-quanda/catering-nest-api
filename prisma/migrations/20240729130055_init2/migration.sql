/*
  Warnings:

  - Made the column `shopId` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `originalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_shopId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "shopId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "currentprice" TEXT,
ADD COLUMN     "originalPrice" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT[];

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
