-- CreateTable
CREATE TABLE "SecurityLog" (
    "id" TEXT NOT NULL,
    "ipadress" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityLog_pkey" PRIMARY KEY ("id")
);
