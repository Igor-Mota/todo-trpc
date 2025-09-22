import { PrismaClient } from "@prisma/client";
import { remove as removeService } from "@/services/database/todo";

export async function remove({ input, ctx }: { input: { id: string }; ctx: { prisma: PrismaClient } }) {
  const removed = await removeService(ctx.prisma, { input });

  return {
    removed,
  };
}
