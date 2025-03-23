/*
  Warnings:

  - Made the column `level` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `xp` on table `Character` required. This step will fail if there are existing NULL values in that column.
  - Made the column `money` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Character" ALTER COLUMN "level" SET NOT NULL,
ALTER COLUMN "requiredXp" SET DEFAULT 100,
ALTER COLUMN "xp" SET NOT NULL,
ALTER COLUMN "money" SET NOT NULL;
