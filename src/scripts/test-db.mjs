// Simple database connection test script
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Attempt to perform a simple query
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('✅ Database connection successful!', result);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

testConnection()
  .then(isConnected => {
    if (isConnected) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('An unexpected error occurred:', error);
    process.exit(1);
  }); 