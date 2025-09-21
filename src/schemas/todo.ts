import { z } from "zod";

export const todoSchema = z
  .object({
    title: z.string().min(2).max(255),
    status: z.string().min(2).max(255),
  })
  .strip();
export type TodoListInput = z.infer<typeof todoSchema>;
