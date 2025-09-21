import { PrismaClient } from "@prisma/client";
import { IRegister } from "@/interfaces/auth";
import crypto from "bcryptjs";

export const userRegister = async (prisma: PrismaClient, input: IRegister) => {
  const { email, password } = input;

  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userAlreadyExists)
    return {
      success: false,
      message: "userAlreadyExists",
    };

  if (password !== input.confirmPassword)
    return {
      success: false,
      message: "passwordAndConfirmPasswordNotMatch",
    };

  const user = await prisma.user.create({
    data: {
      email,
      accounts: {
        create: {
          password: crypto.hashSync(password, 10),
          type: "credentials",
          provider: "local",
          providerAccountId: email,
        },
      },
    },
  });

  return {
    success: true,
    message: "User registered successfully",
    user,
  };
};
