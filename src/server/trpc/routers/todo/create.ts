import { TodoCreateInput } from "@/schemas/todo";
import { PrismaClient } from "@prisma/client";
import { create as createService } from "@/services/database/todo";

export async function create({ input, ctx }: { input: TodoCreateInput; ctx: { prisma: PrismaClient } }) {
  const newTodo = await createService(ctx.prisma, { input });

  return newTodo;
}
