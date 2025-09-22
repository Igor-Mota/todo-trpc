import { QueryParameters } from "@/schemas/query";
import { PrismaClient } from "@prisma/client";

export async function findMany(prisma: PrismaClient, { input }: { input: QueryParameters }) {
  const lists = await prisma.user.findUnique({
    where: {
      publicId: input.userId,
    },
    include: {
      TodoList: {
        where: {
          deleted: false,
        },
        take: input.take,
        skip: input.skip,
        omit: {
          id: true,
          deleted: true,
          userId: true,
        },
        include: {
          todos: {
            where: {
              deleted: false,
            },
            select: {
              publicId: true,
              title: true,
              status: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!lists || !lists.TodoList) {
    return { success: false, message: "unexpectedError" };
  }

  return {
    success: true,
    lists: lists?.TodoList || [],
  };
}
