import { z } from "zod";

export const todoListSchema = z
  .object({
    name: z.string().min(2).max(255),
  })
  .strip();

export const createSchema = todoListSchema.extend({
  userId: z.string().uuid(),
});
export const updateSchema = todoListSchema.extend({
  id: z.string().uuid(),
  name: z.string().min(2).max(60),
});

export type TodoListInputUpdate = z.infer<typeof updateSchema>;
export type TodoListInput = z.infer<typeof todoListSchema>;
export type TodoListInputCreate = z.infer<typeof createSchema>;
