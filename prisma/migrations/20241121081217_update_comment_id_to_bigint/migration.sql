/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");
