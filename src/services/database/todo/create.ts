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

  let todoData = {
    ownerId: list.user.id,
  } as any;

  if (rest.title) todoData.title = rest.title;
  if (rest.status) todoData.status = rest.status;
  if (!todoData.status || !todoData.title) return;
  const listForCreate = await prisma.todoList.update({
    where: { publicId: listId },
    data: {
      todos: {
        create: todoData,
      },
    },
  });

  return {
    success: true,
    data: listForCreate,
  };
}
