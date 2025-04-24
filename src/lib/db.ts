import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Define global type for PrismaClient singleton
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined;
}

// PrismaClient is attached to the `global` object to prevent
// exhausting database connections during development with hot-reload
export const prisma = 
  global.cachedPrisma || 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') {
  global.cachedPrisma = prisma;
}

// Test function to verify database connection
export async function testConnection() {
  try {
    // Attempt to perform a simple query
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('Database connection successful:', result);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
} 