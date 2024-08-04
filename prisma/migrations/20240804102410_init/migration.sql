/*
  Warnings:

  - Added the required column `id_number` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pwassword` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `phone` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `shopId` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_shopId_fkey";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "id_number" INTEGER NOT NULL,
ADD COLUMN     "pwassword" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER DEFAULT 1,
DROP COLUMN "phone",
ADD COLUMN     "phone" BIGINT NOT NULL,
ALTER COLUMN "shopId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
