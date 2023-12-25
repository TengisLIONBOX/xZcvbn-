import { PrismaClient } from "@prisma/client";

// @ts-ignore
export const prisma: PrismaClient = globalThis.prisma || new PrismaClient();
// @ts-ignore
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
