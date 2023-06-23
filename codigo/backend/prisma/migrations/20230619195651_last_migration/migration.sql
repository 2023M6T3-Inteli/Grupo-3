/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_postID_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_userID_fkey`;

-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_postID_fkey`;

-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_userID_fkey`;

-- DropForeignKey
ALTER TABLE `MLTable` DROP FOREIGN KEY `MLTable_userID_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_mlTableID_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_postID_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_postID_fkey`;

-- DropForeignKey
ALTER TABLE `Tags` DROP FOREIGN KEY `Tags_userID_fkey`;

-- DropForeignKey
ALTER TABLE `UserPost` DROP FOREIGN KEY `UserPost_postID_fkey`;

-- DropForeignKey
ALTER TABLE `UserPost` DROP FOREIGN KEY `UserPost_userID_fkey`;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `report` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `image` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `content` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Tags` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `subject` VARCHAR(191) NOT NULL,
    MODIFY `userID` VARCHAR(191) NULL,
    MODIFY `postID` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `ReportPosts` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `postID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ReportPosts_userID_fkey`(`userID`),
    INDEX `ReportPosts_postID_fkey`(`postID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportComments` (
    `id` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `commentsId` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NULL,

    INDEX `ReportComments_userID_fkey`(`userID`),
    INDEX `ReportComments_commentsId_fkey`(`commentsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `score` INTEGER NULL DEFAULT 0,
    `hashedPassword` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL DEFAULT '',
    `role` VARCHAR(191) NULL DEFAULT '',
    `acceptTerms` BOOLEAN NOT NULL DEFAULT true,
    `curriculum` VARCHAR(191) NULL DEFAULT '',
    `image` VARCHAR(191) NULL DEFAULT '',
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hashedRt` VARCHAR(191) NULL,
    `firstLogin` BOOLEAN NOT NULL DEFAULT false,
    `lastLogin` VARCHAR(191) NOT NULL DEFAULT '',
    `streak` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MLTable` ADD CONSTRAINT `MLTable_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_mlTableID_fkey` FOREIGN KEY (`mlTableID`) REFERENCES `MLTable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportPosts` ADD CONSTRAINT `ReportPosts_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportPosts` ADD CONSTRAINT `ReportPosts_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportComments` ADD CONSTRAINT `ReportComments_commentsId_fkey` FOREIGN KEY (`commentsId`) REFERENCES `Comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportComments` ADD CONSTRAINT `ReportComments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPost` ADD CONSTRAINT `UserPost_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPost` ADD CONSTRAINT `UserPost_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
