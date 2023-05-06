/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `FAQ` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Notifications` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Tags` table. All the data in the column will be lost.
  - You are about to drop the column `badge` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `conditions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mlTableID` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `location` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Match` DROP FOREIGN KEY `Match_tagsID_fkey`;

-- DropForeignKey
ALTER TABLE `Match` DROP FOREIGN KEY `Match_userID_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_userID_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userID_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- DropIndex
DROP INDEX `User_user_key` ON `User`;

-- AlterTable
ALTER TABLE `Comments` DROP COLUMN `createdAt`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `FAQ` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `content`,
    DROP COLUMN `timestamp`,
    DROP COLUMN `userID`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `mlTableID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `createdAt`,
    DROP COLUMN `likes`,
    DROP COLUMN `link`,
    DROP COLUMN `userID`,
    ADD COLUMN `active` BOOLEAN NOT NULL,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tags` DROP COLUMN `tags`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `badge`,
    DROP COLUMN `conditions`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `email`,
    DROP COLUMN `hashedPassword`,
    DROP COLUMN `level`,
    DROP COLUMN `picture`,
    DROP COLUMN `skills`,
    DROP COLUMN `user`,
    ADD COLUMN `acceptTerms` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `curriculum` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ALTER COLUMN `name` DROP DEFAULT,
    MODIFY `location` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `Match`;

-- CreateTable
CREATE TABLE `MLTable` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `id` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `postID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPost` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `postID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `MLTable` ADD CONSTRAINT `MLTable_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_mlTableID_fkey` FOREIGN KEY (`mlTableID`) REFERENCES `MLTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPost` ADD CONSTRAINT `UserPost_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPost` ADD CONSTRAINT `UserPost_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
