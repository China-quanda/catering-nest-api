/*
  Warnings:

  - You are about to drop the column `currentprice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `original_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currentprice",
DROP COLUMN "originalPrice",
ADD COLUMN     "current_price" TEXT,
ADD COLUMN     "original_price" TEXT NOT NULL;
