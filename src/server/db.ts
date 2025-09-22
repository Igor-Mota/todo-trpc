import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let log = [] as any;

if (process.env.NODE_ENV !== "production") {
  log = ["query", "error", "warn"];
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: log,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
