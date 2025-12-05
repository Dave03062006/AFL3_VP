import { prismaClient } from "../utils/database-util";
import { CreateUserRequest, toUserResponse, toUserResponsesList, UpdateUserRequest, UserResponse } from "../models/userModel";
import { UserValidation } from "../validations/user-validation";
import { ResponseError } from "../error/response-error";

export class UserService {
    // 1. Create new Customer
    static async create(request: CreateUserRequest): Promise<UserResponse> {
        const createRequest = UserValidation.CREATE.parse(request) as CreateUserRequest;

        const user = await prismaClient.user.create({
            data: {
                name: createRequest.name,
                phoneNumber: createRequest.phoneNumber
            }
        });

        return toUserResponse(user);
    }

    // 2. Display Customer Info
    static async get(userId: number): Promise<UserResponse> {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        return toUserResponse(user);
    }

    // Get all users
    static async getAll(): Promise<UserResponse[]> {
        const users = await prismaClient.user.findMany();
        return toUserResponsesList(users);
    }

    // 3. Update Customer Info
    static async update(userId: number, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = UserValidation.UPDATE.parse(request) as UpdateUserRequest;

        const existingUser = await prismaClient.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            throw new ResponseError(404, "User not found");
        }

        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: {
                ...(updateRequest.name && { name: updateRequest.name }),
                ...(updateRequest.phoneNumber && { phoneNumber: updateRequest.phoneNumber })
            }
        });

        return toUserResponse(updatedUser);
    }

    // 4. Delete Customer
    static async delete(userId: number): Promise<UserResponse> {
        const existingUser = await prismaClient.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            throw new ResponseError(404, "User not found");
        }

        const deletedUser = await prismaClient.user.delete({
            where: { id: userId }
        });

        return toUserResponse(deletedUser);
    }
}