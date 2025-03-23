/*
  Warnings:

  - You are about to drop the column `campaignId` on the `Character` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_campaignId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "campaignId";

-- CreateTable
CREATE TABLE "CampaignCharacter" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "CampaignCharacter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampaignCharacter" ADD CONSTRAINT "CampaignCharacter_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignCharacter" ADD CONSTRAINT "CampaignCharacter_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
