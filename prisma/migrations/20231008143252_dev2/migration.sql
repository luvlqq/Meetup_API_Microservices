/*
  Warnings:

  - Added the required column `lat` to the `Meetup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `Meetup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meetup" ADD COLUMN     "lat" INTEGER NOT NULL,
ADD COLUMN     "long" INTEGER NOT NULL;
