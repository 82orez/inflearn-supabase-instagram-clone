/*
  Warnings:

  - You are about to drop the column `vote_eaverage` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `vote_average` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "vote_eaverage",
ADD COLUMN     "vote_average" DOUBLE PRECISION NOT NULL;
