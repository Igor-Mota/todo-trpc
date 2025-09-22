import { PrismaClient } from "@prisma/client";

export async function remove(prisma: PrismaClient, { input }: { input: { id: string } }) {
  const todo = await prisma.todo.findUnique({
    where: {
      publicId: input.id,
    },
  });

  if (!todo)
    return {
      success: false,
      message: "{{ object }}  not found",
    };

  await prisma.todo.update({
    where: {
      publicId: input.id,
    },
    data: {
      deleted: true,
    },
  });
  return {
    success: true,
  };
}
