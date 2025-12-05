import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.order.deleteMany();
    await prisma.userRestaurant.deleteMany();
    await prisma.user.deleteMany();
    await prisma.restaurant.deleteMany();

    console.log("Seeding database...");

    // Create 3 Users
    const user1 = await prisma.user.create({
        data: {
            name: "Elifele Fredrik Imanuel Jelifta",
            phoneNumber: "+1234567890"
        }
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Kenneth Jonathan Halim",
            phoneNumber: "+0987654321"
        }
    });

    const user3 = await prisma.user.create({
        data: {
            name: "Caca",
            phoneNumber: "+1122334455"
        }
    });

    console.log("Created 3 users");

    // Create 3 Restaurants
    const restaurant1 = await prisma.restaurant.create({
        data: {
            name: "Pizza Palace",
            description: "Best pizza in town with authentic Italian recipes",
            Open: true
        }
    });

    const restaurant2 = await prisma.restaurant.create({
        data: {
            name: "Burger Haven",
            description: "Gourmet burgers and fries",
            Open: true
        }
    });

    const restaurant3 = await prisma.restaurant.create({
        data: {
            name: "Sushi Paradise",
            description: "Fresh sushi and Japanese cuisine",
            Open: false
        }
    });

    console.log("Created 3 restaurants");

    // Create UserRestaurant relationships (many-to-many)
    await prisma.userRestaurant.createMany({
        data: [
            { user_id: user1.id, restaurant_id: restaurant1.id },
            { user_id: user1.id, restaurant_id: restaurant2.id },
            { user_id: user2.id, restaurant_id: restaurant1.id },
            { user_id: user2.id, restaurant_id: restaurant3.id },
            { user_id: user3.id, restaurant_id: restaurant2.id }
        ]
    });

    console.log("Created user-restaurant relationships");

    // Create 5 Orders
    const now = new Date();

    await prisma.order.create({
        data: {
            name: "Pizza Margherita",
            user_id: user1.id,
            restaurant_id: restaurant1.id,
            items: 2,
            time: now,
            estimatedTime: new Date(now.getTime() + 30 * 60000) // 30 minutes
        }
    });

    await prisma.order.create({
        data: {
            name: "Cheeseburger Combo",
            user_id: user2.id,
            restaurant_id: restaurant2.id,
            items: 3,
            time: new Date(now.getTime() - 60 * 60000), // 1 hour ago
            estimatedTime: new Date(now.getTime() - 20 * 60000) // 40 minutes total
        }
    });

    await prisma.order.create({
        data: {
            name: "Pepperoni Pizza",
            user_id: user3.id,
            restaurant_id: restaurant1.id,
            items: 1,
            time: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
            estimatedTime: new Date(now.getTime() - 10 * 60000) // 20 minutes total
        }
    });

    await prisma.order.create({
        data: {
            name: "Double Bacon Burger",
            user_id: user1.id,
            restaurant_id: restaurant2.id,
            items: 4,
            time: new Date(now.getTime() - 120 * 60000), // 2 hours ago
            estimatedTime: new Date(now.getTime() - 70 * 60000) // 50 minutes total
        }
    });

    await prisma.order.create({
        data: {
            name: "Vegetarian Pizza",
            user_id: user2.id,
            restaurant_id: restaurant1.id,
            items: 2,
            time: new Date(now.getTime() - 15 * 60000), // 15 minutes ago
            estimatedTime: new Date(now.getTime() + 15 * 60000) // 30 minutes total
        }
    });

    console.log("Created 5 orders");
    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });