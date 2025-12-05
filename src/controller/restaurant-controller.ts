import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/restaurant-service";
import { CreateRestaurantRequest } from "../models/restaurantModel";

export class RestaurantController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateRestaurantRequest = req.body;
            const response = await RestaurantService.create(request);
            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.id);
            const response = await RestaurantService.get(restaurantId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await RestaurantService.getAll();
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const isOpen = req.query.open === 'true';
            const response = await RestaurantService.getByStatus(isOpen);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.id);
            const request: Partial<CreateRestaurantRequest> = req.body;
            const response = await RestaurantService.update(restaurantId, request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const restaurantId = parseInt(req.params.id);
            const response = await RestaurantService.delete(restaurantId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}