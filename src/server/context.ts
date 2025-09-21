// src/server/context.ts
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { prisma } from "./db";

export const createContext = async () => {
  const session = await getServerSession(authOptions as AuthOptions);
  return { prisma, session };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
