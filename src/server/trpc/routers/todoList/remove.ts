import { PrismaClient } from "@prisma/client";
import { remove as removeService } from "@/services/database/todoList";
export async function remove({ input, ctx }: { input: { id: string }; ctx: { prisma: PrismaClient } }) {
  await removeService(ctx.prisma, { input });

  return { success: true };
}
