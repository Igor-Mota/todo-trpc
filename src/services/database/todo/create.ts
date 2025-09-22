import { TodoCreateInput } from "@/schemas/todo";
import { PrismaClient } from "@prisma/client";

export async function create(prisma: PrismaClient, { input }: { input: TodoCreateInput }) {
  const { listId, ...rest } = input;

  const list = await prisma.todoList.findUnique({
    where: {
      publicId: listId,
    },
    include: {
      user: true,
    },
  });

  if (!list) return "{{ object }} not founded";

  const listForCreate = await prisma.todoList.update({
    where: {
      publicId: listId,
    },
    data: {
      todos: {
        create: {
          ...rest,
          ownerId: list.user.id,
        },
      },
    },
  });

  return {
    success: true,
    data: listForCreate,
  };
}
