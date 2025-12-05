import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order-service";
import { CreateOrderRequest, UpdateOrderRequest } from "../models/orderModel";

export class OrderController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateOrderRequest = req.body;
            const response = await OrderService.create(request);
            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.id);
            const response = await OrderService.get(orderId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await OrderService.getAll();
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId);
            const response = await OrderService.getByUser(userId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getByRestaurant(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.restaurantId);
            const response = await OrderService.getByRestaurant(restaurantId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.id);
            const request: UpdateOrderRequest = req.body;
            const response = await OrderService.update(orderId, request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.id);
            const response = await OrderService.delete(orderId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}