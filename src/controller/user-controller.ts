import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user-service";
import { CreateUserRequest, UpdateUserRequest } from "../models/userModel";

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body;
            const response = await UserService.create(request);
            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id);
            const response = await UserService.get(userId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getAll();
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id);
            const request: UpdateUserRequest = req.body;
            const response = await UserService.update(userId, request);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id);
            const response = await UserService.delete(userId);
            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }
}