import { User } from "../../generated/prisma";

export interface UserResponse {
    id: number;
    name: string;
    phoneNumber: string;
}

export const toUserResponse = (user: User): UserResponse => {
    return {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber
    };
}

export const toUserResponsesList = (users: User[]): UserResponse[] => {
    return users.map(toUserResponse);
}

export interface CreateUserRequest {
    name: string;
    phoneNumber: string;
}

export interface UpdateUserRequest {
    name?: string;
    phoneNumber?: string;
}