-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `todos_user_id_fkey`;

-- DropIndex
DROP INDEX `todos_title_status_idx` ON `todos`;

-- CreateIndex
CREATE INDEX `todos_title_status_user_id_idx` ON `todos`(`title`, `status`, `user_id`);
