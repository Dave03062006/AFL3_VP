import { Order } from "../../generated/prisma";

export interface OrderResponse {
    id: number;
    name: string;
    userId?: number | null;
    restaurantId?: number | null;
    items: number;
    time: Date;
    estimatedTime?: Date | null;
}

export const toOrderResponse = (order: Order): OrderResponse => {
    return {
        id: order.id,
        name: order.name,
        userId: order.user_id,
        restaurantId: order.restaurant_id,
        items: order.items,
        time: order.time,
        estimatedTime: order.estimatedTime
    };
}

export const toOrderResponsesList = (orders: Order[]): OrderResponse[] => {
    return orders.map(toOrderResponse);
}

export interface CreateOrderRequest {
    name: string;
    userId: number;
    restaurantId: number;
    items: number;
}

export interface UpdateOrderRequest {
    name?: string;
    items?: number;
    restaurantId?: number;
}

export const calculateEstimatedTime = (items: number, time: Date = new Date()): Date => {
    const totalMinutes = (10 * items) + 10;
    const estimatedTime = new Date(time)
    estimatedTime.setMinutes(estimatedTime.getMinutes() + totalMinutes);
    return estimatedTime;
}