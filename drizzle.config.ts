import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

import { defineConfig } from 'drizzle-kit'

// ✅ Support both env variables
const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL

if (!connectionString) {
  throw new Error('No database connection string found')
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: connectionString,
  },
})




// import { cwd } from 'node:process'
// import { loadEnvConfig } from '@next/env'

// loadEnvConfig(cwd())

// import { defineConfig } from 'drizzle-kit'
// export default defineConfig({
//   dialect: 'postgresql',
//   schema: './db/schema.ts',
//   out: './drizzle',
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//   },
// })