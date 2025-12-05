import { prismaClient } from "../utils/database-util";
import { CreateRestaurantRequest, restaurantResponse, toRestaurantResponse, toRestaurantResponsesList } from "../models/restaurantModel";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { ResponseError } from "../error/response-error";

export class RestaurantService {
    // 1. Create new Restaurant
    static async create(request: CreateRestaurantRequest): Promise<restaurantResponse> {
        const createRequest = RestaurantValidation.CREATE.parse(request) as CreateRestaurantRequest;

        const restaurant = await prismaClient.restaurant.create({
            data: {
                name: createRequest.name,
                description: createRequest.description,
                Open: createRequest.Open
            }
        });

        return toRestaurantResponse(restaurant);
    }

    // 2a. Display Restaurant Info (single)
    static async get(restaurantId: number): Promise<restaurantResponse> {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: {
                id: restaurantId
            }
        });

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        return toRestaurantResponse(restaurant);
    }

    // 2. Display all Restaurants
    static async getAll(): Promise<restaurantResponse[]> {
        const restaurants = await prismaClient.restaurant.findMany();
        return toRestaurantResponsesList(restaurants);
    }

    // 2b. Display opened/closed restaurants
    static async getByStatus(isOpen: boolean): Promise<restaurantResponse[]> {
        const restaurants = await prismaClient.restaurant.findMany({
            where: {
                Open: isOpen
            }
        });

        return toRestaurantResponsesList(restaurants);
    }

    // 3. Update Restaurant Info
    static async update(restaurantId: number, request: Partial<CreateRestaurantRequest>): Promise<restaurantResponse> {
        const updateRequest = RestaurantValidation.UPDATE.parse(request) as Partial<CreateRestaurantRequest>;

        const existingRestaurant = await prismaClient.restaurant.findUnique({
            where: { id: restaurantId }
        });

        if (!existingRestaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        const updatedRestaurant = await prismaClient.restaurant.update({
            where: { id: restaurantId },
            data: {
                ...(updateRequest.name && { name: updateRequest.name }),
                ...(updateRequest.description && { description: updateRequest.description }),
                ...(updateRequest.Open !== undefined && { Open: updateRequest.Open })
            }
        });

        return toRestaurantResponse(updatedRestaurant);
    }

    // 4. Delete Restaurant
    static async delete(restaurantId: number): Promise<restaurantResponse> {
        const existingRestaurant = await prismaClient.restaurant.findUnique({
            where: { id: restaurantId }
        });

        if (!existingRestaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        const deletedRestaurant = await prismaClient.restaurant.delete({
            where: { id: restaurantId }
        });

        return toRestaurantResponse(deletedRestaurant);
    }
}