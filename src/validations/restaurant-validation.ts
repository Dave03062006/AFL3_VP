import { z, ZodType } from "zod";

export class RestaurantValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, "Restaurant name is required").max(100, "Restaurant name must be at most 100 characters"),
        description: z.string().min(1, "Description is required").max(100, "Description must be at most 100 characters"),
        Open: z.boolean()
    });

     static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1, "Restaurant name must not be empty").max(100, "Restaurant name must be at most 100 characters").optional(),
        description: z.string().min(1, "Description must not be empty").optional(),
        Open: z.boolean().optional()
    });

    static readonly GET_BY_ID: ZodType = z.object({
        id: z.number().int().positive("Restaurant ID must be a positive integer")
    });

    static readonly GET_BY_STATUS: ZodType = z.object({
        Open: z.boolean()
    });
}