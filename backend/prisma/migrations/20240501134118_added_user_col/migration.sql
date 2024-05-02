-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "likes" TEXT[],
ADD COLUMN     "user" TEXT NOT NULL DEFAULT 'User';
