import { TRPCError } from "@trpc/server";
import { LoginInput } from "@/schemas/auth";
import { PrismaClient } from "@prisma/client";
import { userLogin } from "@/services/database/auth/login";

export async function login({ input, ctx }: { input: LoginInput; ctx: { prisma: PrismaClient } }) {
  const user = await userLogin(ctx.prisma, { input });

  if (!user.success) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: user.message });
  }
  return {
    ...user,
  };
}
