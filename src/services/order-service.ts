import { prismaClient } from "../utils/database-util";
import { calculateEstimatedTime, CreateOrderRequest, OrderResponse, toOrderResponse, toOrderResponsesList, UpdateOrderRequest } from "../models/orderModel";
import { OrderValidation } from "../validations/order-validation";
import { ResponseError } from "../error/response-error";

export class OrderService {
    // 1. Create new Order
    static async create(request: CreateOrderRequest): Promise<OrderResponse> {
        const createRequest = OrderValidation.CREATE.parse(request) as CreateOrderRequest;

        // Verify user exists
        const user = await prismaClient.user.findUnique({
            where: { id: createRequest.userId }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        // Verify restaurant exists
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: createRequest.restaurantId }
        });

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        // Check if restaurant is open
        if (!restaurant.Open) {
            throw new ResponseError(400, "Restaurant is currently closed");
        }

        const orderTime = new Date();
        const estimatedTime = calculateEstimatedTime(createRequest.items, orderTime);

        const order = await prismaClient.order.create({
            data: {
                name: createRequest.name,
                user_id: createRequest.userId,
                restaurant_id: createRequest.restaurantId,
                items: createRequest.items,
                time: orderTime,
                estimatedTime: estimatedTime
            }
        });

        return toOrderResponse(order);
    }

    // Get single order
    static async get(orderId: number): Promise<OrderResponse> {
        const order = await prismaClient.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new ResponseError(404, "Order not found");
        }

        return toOrderResponse(order);
    }

    // 2. Display all Orders
    static async getAll(): Promise<OrderResponse[]> {
        const orders = await prismaClient.order.findMany({
            orderBy: {
                time: 'desc'
            }
        });

        return toOrderResponsesList(orders);
    }

    // 2a. Display based on customer that ordered
    static async getByUser(userId: number): Promise<OrderResponse[]> {
        const user = await prismaClient.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        const orders = await prismaClient.order.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                time: 'desc'
            }
        });

        return toOrderResponsesList(orders);
    }

    // 2b. Display based on Restaurant that's ordered from
    static async getByRestaurant(restaurantId: number): Promise<OrderResponse[]> {
        const restaurant = await prismaClient.restaurant.findUnique({
            where: { id: restaurantId }
        });

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found");
        }

        const orders = await prismaClient.order.findMany({
            where: {
                restaurant_id: restaurantId
            },
            orderBy: {
                time: 'desc'
            }
        });

        return toOrderResponsesList(orders);
    }

    // Update order
    static async update(orderId: number, request: UpdateOrderRequest): Promise<OrderResponse> {
        const updateRequest = OrderValidation.UPDATE.parse(request) as UpdateOrderRequest;

        const existingOrder = await prismaClient.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            throw new ResponseError(404, "Order not found");
        }

        // If restaurant is being updated, verify it exists and is open
        if (updateRequest.restaurantId) {
            const restaurant = await prismaClient.restaurant.findUnique({
                where: { id: updateRequest.restaurantId }
            });

            if (!restaurant) {
                throw new ResponseError(404, "Restaurant not found");
            }

            if (!restaurant.Open) {
                throw new ResponseError(400, "Restaurant is currently closed");
            }
        }

        // Recalculate estimated time if items changed
        let newEstimatedTime = existingOrder.estimatedTime;
        if (updateRequest.items) {
            newEstimatedTime = calculateEstimatedTime(updateRequest.items, existingOrder.time);
        }

        const updatedOrder = await prismaClient.order.update({
            where: { id: orderId },
            data: {
                ...(updateRequest.name && { name: updateRequest.name }),
                ...(updateRequest.items && { items: updateRequest.items }),
                ...(updateRequest.restaurantId && { restaurant_id: updateRequest.restaurantId }),
                ...(updateRequest.items && { estimatedTime: newEstimatedTime })
            }
        });

        return toOrderResponse(updatedOrder);
    }

    // Delete order
    static async delete(orderId: number): Promise<OrderResponse> {
        const existingOrder = await prismaClient.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            throw new ResponseError(404, "Order not found");
        }

        const deletedOrder = await prismaClient.order.delete({
            where: { id: orderId }
        });

        return toOrderResponse(deletedOrder);
    }
}