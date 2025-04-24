import { testConnection } from '../lib/db.js'

async function main() {
  console.log('Testing database connection...')
  
  const isConnected = await testConnection()
  
  if (isConnected) {
    console.log('✅ Database connection successful!')
    process.exit(0)
  } else {
    console.error('❌ Database connection failed!')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('An unexpected error occurred:', error)
  process.exit(1)
}) 