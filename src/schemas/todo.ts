import { z } from "zod";
import { TodoStatus } from "@prisma/client";

export const todoSchema = z
  .object({
    title: z.string().min(2).max(255).optional(),
    status: z.nativeEnum(TodoStatus).optional(),
  })
  .strip();

export const todoCreateSchema = todoSchema.extend({
  listId: z.string().uuid(),
});

export const todoUpdateSchema = todoSchema.extend({
  id: z.string().uuid(),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;

export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>;
export type TodoInput = z.infer<typeof todoSchema>;
