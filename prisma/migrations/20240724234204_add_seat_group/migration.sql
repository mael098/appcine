/*
  Warnings:

  - You are about to drop the column `room_id` on the `seats` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `seats` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `seats` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `seats` table. All the data in the column will be lost.
  - Added the required column `name` to the `seats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_room_id_fkey";

-- AlterTable
ALTER TABLE "seats" DROP COLUMN "room_id",
DROP COLUMN "size",
DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "seatGroupId" TEXT;

-- CreateTable
CREATE TABLE "SeatGroup" (
    "id" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "room_id" TEXT NOT NULL,
    "x" SMALLINT NOT NULL,
    "y" SMALLINT NOT NULL,

    CONSTRAINT "SeatGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_seatGroupId_fkey" FOREIGN KEY ("seatGroupId") REFERENCES "SeatGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatGroup" ADD CONSTRAINT "SeatGroup_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
