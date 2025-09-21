import { PrismaClient } from "@prisma/client";
import { userRegister } from "@/services/database/auth/register";
import { RegisterInput } from "@/schemas/auth";

export async function register({ input, ctx }: { input: RegisterInput; ctx: { prisma: PrismaClient } }) {
  const newUser = await userRegister(ctx.prisma, input);

  return { ...newUser };
}
