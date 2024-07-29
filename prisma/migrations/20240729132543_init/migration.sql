/*
  Warnings:

  - Changed the type of `marital_status` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "birthday" DROP NOT NULL,
DROP COLUMN "marital_status",
ADD COLUMN     "marital_status" INTEGER NOT NULL;
