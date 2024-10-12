-- tools/src/prisma/migrations/[migration-name]/migration.sql

-- Add a new column to the "User" model to store user's preferred theme
ALTER TABLE "User" ADD COLUMN "theme" TEXT;

-- Add a new table to store user settings, including theme preference
CREATE TABLE "UserSettings" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "theme" TEXT NOT NULL,
  CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- Populate the "UserSettings" table with default theme settings for existing users
INSERT INTO "UserSettings" ("userId", "theme")
SELECT "id", 'light' FROM "User";

-- Create an index for the "userId" column in "UserSettings" to improve query performance
CREATE INDEX "UserSettings_userId_idx" ON "UserSettings" ("userId");