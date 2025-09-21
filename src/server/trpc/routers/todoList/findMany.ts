import { PrismaClient } from "@prisma/client";
import { FindSchema } from "@/schemas/query";
import { findMany as findManyService } from "@/services/database/todoList";
export async function findMany({ ctx, input }: { ctx: { prisma: PrismaClient }; input: FindSchema }) {
  const lists = await findManyService(ctx.prisma, { input });

  return lists;
}
