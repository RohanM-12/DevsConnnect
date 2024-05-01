/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "gitHubLink" DROP NOT NULL,
ALTER COLUMN "deployedLink" DROP NOT NULL,
ALTER COLUMN "demoVideoLink" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
