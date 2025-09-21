import { PrismaClient } from "@prisma/client";
import { create as createService } from "@/services/database/todoList";
import { TodoListInputCreate } from "@/schemas/todoList";

export async function create({ input, ctx }: { input: TodoListInputCreate; ctx: { prisma: PrismaClient } }) {
  const list = await createService(ctx.prisma, { input });

  return {
    success: true,
    list,
  };
}
