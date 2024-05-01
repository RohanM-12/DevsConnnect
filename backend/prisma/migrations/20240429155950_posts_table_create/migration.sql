-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gitHubLink" TEXT NOT NULL,
    "deployedLink" TEXT NOT NULL,
    "demoVideoLink" TEXT NOT NULL,
    "technologiesUsed" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
