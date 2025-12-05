/*
  Warnings:

  - You are about to drop the column `price` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `restaurants` table. All the data in the column will be lost.
  - Added the required column `items` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Open` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "price",
ADD COLUMN     "items" INTEGER NOT NULL,
ALTER COLUMN "time" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "estimatedTime" DROP NOT NULL,
ALTER COLUMN "restaurant_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "status",
ADD COLUMN     "Open" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
