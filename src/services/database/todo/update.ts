import { TodoUpdateInput } from "@/schemas/todo";
import { PrismaClient } from "@prisma/client";

export async function update(prisma: PrismaClient, { input }: { input: TodoUpdateInput }) {
  const { id, ...rest } = input;

  const updated = await prisma.todo.update({
    where: { publicId: id },
    data: rest,
  });

  if (!updated) return { success: false, message: "{{ object }} not found" };

  return { success: true, updated };
}
