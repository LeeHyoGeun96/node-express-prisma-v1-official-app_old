/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
CREATE SEQUENCE IF NOT EXISTS comment_id_seq;

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ALTER COLUMN "id" SET DEFAULT nextval('comment_id_seq'::regclass),
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

SELECT setval('comment_id_seq', (SELECT MAX(id) FROM "Comment"));