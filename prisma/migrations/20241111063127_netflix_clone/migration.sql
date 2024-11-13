-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "vote_eaverage" DOUBLE PRECISION NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "release_date" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
