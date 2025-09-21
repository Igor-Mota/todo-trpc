import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { LoginInput } from "@/schemas/auth";

export const userLogin = async (prisma: PrismaClient, { input }: { input: LoginInput }) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      accounts: {
        select: {
          provider: true,
          password: true,
          type: true,
        },
      },
    },
    omit: {
      id: true,
      deleted: true,
    },
  });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const account = user.accounts.find((a) => a.provider === "local");
  if (!account) {
    return { success: false, message: "Local account not found" };
  }

  const isValid = bcrypt.compareSync(password, account.password!);
  if (!isValid) {
    return { success: false, message: "Invalid credentials" };
  }

  return {
    success: true,
    user: {
      id: user.publicId,
      email: user.email,
      name: user.name,
    },
  };
};
