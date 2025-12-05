import { z, ZodType } from "zod";

export class UserValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
        phoneNumber: z.string().min(1, "Phone number is required").max(100, "Phone number must be at most 100 characters")
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1, "Name must not be empty").max(100, "Name must be at most 100 characters").optional(),
        phoneNumber: z.string().min(1, "Phone number must not be empty").max(100, "Phone number must be at most 100 characters").optional()
    });

    static readonly GET_BY_ID: ZodType = z.object({
        id: z.number().int().positive("User ID must be a positive integer")
    });
}