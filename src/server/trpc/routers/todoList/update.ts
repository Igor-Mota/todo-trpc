import { PrismaClient } from "@prisma/client";
import { TodoListInputUpdate } from "@/schemas/todoList";

import { update as updateService } from "@/services/database/todoList";

export async function update({ input, ctx }: { input: TodoListInputUpdate; ctx: { prisma: PrismaClient } }) {
  const updated = await updateService(ctx.prisma, { input });

  return updated;
}
