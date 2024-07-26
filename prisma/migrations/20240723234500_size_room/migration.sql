/*
  Warnings:

  - Added the required column `length` to the `room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room" ADD COLUMN     "length" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
