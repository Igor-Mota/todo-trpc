import { PrismaClient } from "@prisma/client";

export async function create(prisma: PrismaClient, { input }: { input: { name: string; userId: string } }) {
  const todoList = await prisma.todoList.create({
    data: {
      name: input.name,
      user: {
        connect: {
          publicId: input.userId,
        },
      },
    },
  });

  if (!todoList) {
    return { success: false, message: "unexpectedError" };
  }

  return {
    success: true,
    todoList,
  };
}
