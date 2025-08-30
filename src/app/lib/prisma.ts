// lib/prisma.ts
import { PrismaClient } from "../../generated/prisma";

// Declare a global variable to hold the Prisma client instance.
// This is necessary to prevent creating multiple instances during hot-reloading in development.
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize the Prisma client.
// In production, we create a new instance.
// In development, we check if an instance already exists on the global object.
// If not, we create one. This prevents exhausting the database connection limit.
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;