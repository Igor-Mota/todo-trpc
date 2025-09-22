import { PrismaClient } from "@prisma/client";
import { TodoUpdateInput } from "@/schemas/todo";
import { update as updateService } from "@/services/database/todo";
export async function update({ input, ctx }: { input: TodoUpdateInput; ctx: { prisma: PrismaClient } }) {
  const updated = await updateService(ctx.prisma, { input });

  return updated;
}
