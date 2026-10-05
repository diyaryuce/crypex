-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `price` DECIMAL(30, 10) NULL,
    ADD COLUMN `total` DECIMAL(30, 10) NULL;
