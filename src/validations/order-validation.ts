import { z, ZodType } from "zod";

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, "Order name is required").max(100, "Order name must be at most 100 characters"),
        userId: z.number().int().positive("User ID must be a positive integer"),
        restaurantId: z.number().int().positive("Restaurant ID must be a positive integer"),
        items: z.number().int().positive("Items must be a positive integer"),
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1, "Order name must not be empty").max(100, "Order name must be at most 100 characters").optional(),
        items: z.number().int().positive("Items must be a positive integer").optional(),
        restaurantId: z.number().int().positive("Restaurant ID must be a positive integer").optional(),
    });

    static readonly GET_BY_ID: ZodType = z.object({
        id: z.number().int().positive("Order ID must be a positive integer")
    });
}