import { Restaurant } from "../../generated/prisma";

export interface restaurantResponse{
    id: number;
    name: string;
    description: string;
    Open: boolean;
}
export const toRestaurantResponse = (restaurant: Restaurant): restaurantResponse => {
    return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        Open: restaurant.Open
    };
}
export const toRestaurantResponsesList = (restaurants: Restaurant[]): restaurantResponse[] => {
    return restaurants.map(toRestaurantResponse);
}
export interface CreateRestaurantRequest{
    name: string;
    description: string;
    Open: boolean;
}