-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MASTER');

-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('JOB', 'PERSONAL_PROJECT', 'EDUCATION');

-- CreateEnum
CREATE TYPE "Job_Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_photo" BYTEA,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "experience_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "ExperienceType" NOT NULL,
    "description" VARCHAR(1000),
    "name" VARCHAR(200) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "Dashboard" (
    "dashboard_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "time_zone" INTEGER,
    "location" VARCHAR(100),
    "availability" TIMESTAMP(3),
    "bio" VARCHAR(1500),
    "level" INTEGER,
    "latest_work" VARCHAR(100),
    "work_title" VARCHAR(100),

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("dashboard_id")
);

-- CreateTable
CREATE TABLE "Application" (
    "application_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Job_Status" NOT NULL DEFAULT E'PENDING',

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "social_id" SERIAL NOT NULL,
    "dashboard_id" INTEGER NOT NULL,
    "url" VARCHAR(300) NOT NULL,

    CONSTRAINT "SocialLinks_pkey" PRIMARY KEY ("social_id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "requirement_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "description" VARCHAR(500) NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("requirement_id")
);

-- CreateTable
CREATE TABLE "Dashboard_Skill" (
    "dashboard_skill_id" SERIAL NOT NULL,
    "dashboard_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dashboard_Skill_pkey" PRIMARY KEY ("dashboard_skill_id")
);

-- CreateTable
CREATE TABLE "JobOffer" (
    "job_id" SERIAL NOT NULL,
    "position" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(750) NOT NULL,
    "location" VARCHAR(100) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "skill_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "JobOffer_Skill" (
    "job_skill_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "skill_id" INTEGER NOT NULL,

    CONSTRAINT "JobOffer_Skill_pkey" PRIMARY KEY ("job_skill_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_user_id_key" ON "Dashboard"("user_id");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard" ADD CONSTRAINT "Dashboard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobOffer"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLinks" ADD CONSTRAINT "SocialLinks_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "Dashboard"("dashboard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobOffer"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard_Skill" ADD CONSTRAINT "Dashboard_Skill_dashboard_id_fkey" FOREIGN KEY ("dashboard_id") REFERENCES "Dashboard"("dashboard_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dashboard_Skill" ADD CONSTRAINT "Dashboard_Skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("skill_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer_Skill" ADD CONSTRAINT "JobOffer_Skill_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobOffer"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer_Skill" ADD CONSTRAINT "JobOffer_Skill_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("skill_id") ON DELETE RESTRICT ON UPDATE CASCADE;
