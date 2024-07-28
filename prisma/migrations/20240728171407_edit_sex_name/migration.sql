/*
  Warnings:

  - Changed the type of `sex` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sex` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "sex",
ADD COLUMN     "sex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "sex",
ADD COLUMN     "sex" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sex",
ADD COLUMN     "sex" INTEGER NOT NULL;
