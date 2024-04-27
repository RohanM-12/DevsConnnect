-- CreateTable
CREATE TABLE "USER" (
    "id" SERIAL NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_registrationNo_key" ON "USER"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");
