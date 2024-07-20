-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_cinema_id_fkey";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "cinemasId" TEXT,
ALTER COLUMN "cinema_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_cinemasId_fkey" FOREIGN KEY ("cinemasId") REFERENCES "cinemas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
