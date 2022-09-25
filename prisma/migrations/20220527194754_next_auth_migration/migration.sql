/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Dashboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Dashboard_Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JobOffer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `JobOffer_Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Requirement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SocialLinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_photo` on the `User` table. All the data in the column will be lost.
  - Added the required column `contract` to the `JobOffer` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_job_id_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Dashboard_Skill" DROP CONSTRAINT "Dashboard_Skill_dashboard_id_fkey";

-- DropForeignKey
ALTER TABLE "Dashboard_Skill" DROP CONSTRAINT "Dashboard_Skill_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_user_id_fkey";

-- DropForeignKey
ALTER TABLE "JobOffer_Skill" DROP CONSTRAINT "JobOffer_Skill_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobOffer_Skill" DROP CONSTRAINT "JobOffer_Skill_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_job_id_fkey";

-- DropForeignKey
ALTER TABLE "SocialLinks" DROP CONSTRAINT "SocialLinks_dashboard_id_fkey";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
ALTER COLUMN "application_id" DROP DEFAULT,
ALTER COLUMN "application_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "job_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id");
DROP SEQUENCE "Application_application_id_seq";

-- AlterTable
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_pkey",
ALTER COLUMN "dashboard_id" DROP DEFAULT,
ALTER COLUMN "dashboard_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("dashboard_id");
DROP SEQUENCE "Dashboard_dashboard_id_seq";

-- AlterTable
ALTER TABLE "Dashboard_Skill" DROP CONSTRAINT "Dashboard_Skill_pkey",
ALTER COLUMN "dashboard_skill_id" DROP DEFAULT,
ALTER COLUMN "dashboard_skill_id" SET DATA TYPE TEXT,
ALTER COLUMN "dashboard_id" SET DATA TYPE TEXT,
ALTER COLUMN "skill_id" SET DATA TYPE TEXT,
ALTER COLUMN "level" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dashboard_Skill_pkey" PRIMARY KEY ("dashboard_skill_id");
DROP SEQUENCE "Dashboard_Skill_dashboard_skill_id_seq";

-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
ALTER COLUMN "experience_id" DROP DEFAULT,
ALTER COLUMN "experience_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("experience_id");
DROP SEQUENCE "Experience_experience_id_seq";

-- AlterTable
ALTER TABLE "JobOffer" DROP CONSTRAINT "JobOffer_pkey",
ADD COLUMN     "contract" VARCHAR(50) NOT NULL,
ALTER COLUMN "job_id" DROP DEFAULT,
ALTER COLUMN "job_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("job_id");
DROP SEQUENCE "JobOffer_job_id_seq";

-- AlterTable
ALTER TABLE "JobOffer_Skill" DROP CONSTRAINT "JobOffer_Skill_pkey",
ALTER COLUMN "job_skill_id" DROP DEFAULT,
ALTER COLUMN "job_skill_id" SET DATA TYPE TEXT,
ALTER COLUMN "job_id" SET DATA TYPE TEXT,
ALTER COLUMN "skill_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JobOffer_Skill_pkey" PRIMARY KEY ("job_skill_id");
DROP SEQUENCE "JobOffer_Skill_job_skill_id_seq";

-- AlterTable
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_pkey",
ALTER COLUMN "requirement_id" DROP DEFAULT,
ALTER COLUMN "requirement_id" SET DATA TYPE TEXT,
ALTER COLUMN "job_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Requirement_pkey" PRIMARY KEY ("requirement_id");
DROP SEQUENCE "Requirement_requirement_id_seq";

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
ALTER COLUMN "skill_id" DROP DEFAULT,
ALTER COLUMN "skill_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("skill_id");
DROP SEQUENCE "Skill_skill_id_seq";

-- AlterTable
ALTER TABLE "SocialLinks" DROP CONSTRAINT "SocialLinks_pkey",
ALTER COLUMN "social_id" DROP DEFAULT,
ALTER COLUMN "social_id" SET DATA TYPE TEXT,
ALTER COLUMN "dashboard_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("social_id");
DROP SEQUENCE "SocialLinks_social_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "password",
DROP COLUMN "user_id",
DROP COLUMN "user_photo",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" VARCHAR(100),
ADD COLUMN     "occupation" VARCHAR(100),
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobOffer"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks" ADD CONSTRAINT "SocialLinks_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "Dashboard"("dashboard_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobOffer"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard_Skill" ADD CONSTRAINT "Dashboard_Skill_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "Dashboard"("dashboard_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard_Skill" ADD CONSTRAINT "Dashboard_Skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer_Skill" ADD CONSTRAINT "JobOffer_Skill_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobOffer"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer_Skill" ADD CONSTRAINT "JobOffer_Skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;
