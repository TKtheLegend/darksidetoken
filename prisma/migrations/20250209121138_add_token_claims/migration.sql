-- CreateTable
CREATE TABLE "TokenClaim" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "txHash" TEXT,
    "claimed" BOOLEAN NOT NULL DEFAULT false,
    "claimedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TokenClaim_userId_idx" ON "TokenClaim"("userId");

-- CreateIndex
CREATE INDEX "TokenClaim_txHash_idx" ON "TokenClaim"("txHash");

-- AddForeignKey
ALTER TABLE "TokenClaim" ADD CONSTRAINT "TokenClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
