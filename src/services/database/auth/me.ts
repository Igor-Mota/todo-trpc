import { PrismaClient } from "@prisma/client";
export const userMe = async (prisma: PrismaClient, { id }: { id: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      publicId: id,
    },
  });

  if (!user)
    return {
      success: false,
      message: "userNotFounded",
    };

  return {
    success: true,
    user: {
      id: user.publicId,
      email: user.email,
      name: user.name,
    },
  };
};
