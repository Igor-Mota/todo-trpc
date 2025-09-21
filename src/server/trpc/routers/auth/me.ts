import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { userMe } from "@/services/database/auth/me";

export async function me({ ctx }: { ctx: { prisma: PrismaClient; session: Session | null } }) {
  if (!ctx.session) {
    return null;
  }

  const user = userMe(ctx.prisma, { id: ctx.session.user.id });

  return user;
}
