import { z } from "zod";

export const queryParametersSchema = z
  .object({
    skip: z.number().min(0).optional(),
    take: z.number().min(1).max(100).optional(),
    name: z.string().optional(),
    id: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
  })
  .partial()
  .strip();

export const findSchema = queryParametersSchema.extend({
  userId: z.string().uuid(),
});

export type QueryParameters = z.infer<typeof queryParametersSchema>;
export type FindSchema = z.infer<typeof findSchema>;
