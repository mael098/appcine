/*
  Warnings:

  - Changed the type of `classification` on the `movies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('G', 'PG', 'PG13', 'R', 'NC17');

-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "duration" SET DATA TYPE INTEGER,
DROP COLUMN "classification",
ADD COLUMN     "classification" "Classification" NOT NULL;
