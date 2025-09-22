import { TodoListInputUpdate } from "@/schemas/todoList";
import { PrismaClient } from "@prisma/client";

export async function update(prisma: PrismaClient, { input }: { input: TodoListInputUpdate }) {
  const { id, ...rest } = input;
  const listUpdated = await prisma.todoList.update({
    where: {
      publicId: id,
    },
    data: rest,
  });

  if (!listUpdated) {
    return {
      success: false,
      message: "unexpectedError",
    };
  }

  return listUpdated;
}
