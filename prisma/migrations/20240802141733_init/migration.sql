-- CreateTable
CREATE TABLE "Captcha" (
    "id" SERIAL NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_time" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "expires_time" TIMESTAMP(3) NOT NULL,
    "used" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Captcha_pkey" PRIMARY KEY ("id")
);
