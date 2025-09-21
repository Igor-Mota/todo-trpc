import { PrismaClient } from "@prisma/client";

export async function remove(prisma: PrismaClient, { input }: { input: { id: string } }) {
  await prisma.todoList.update({
    where: {
      publicId: input.id,
    },
    data: {
      deleted: true,
    },
  });
}
