import { TodoListInputUpdate } from "@/schemas/todoList";
import { PrismaClient } from "@prisma/client";

export async function update(prisma: PrismaClient, { input }: { input: TodoListInputUpdate }) {
  const { id, ...rest } = input;

  const dataToUpdate = Object.fromEntries(Object.entries(rest).filter(([_, value]) => value !== undefined));

  const listUpdated = await prisma.todoList.update({
    where: {
      publicId: id,
    },
    data: dataToUpdate,
  });

  if (!listUpdated) {
    return {
      success: false,
      message: "unexpectedError",
    };
  }

  return listUpdated;
}
