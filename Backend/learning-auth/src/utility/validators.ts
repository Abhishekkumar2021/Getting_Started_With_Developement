import { z } from 'zod';

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(8,)
})