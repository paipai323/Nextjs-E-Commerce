import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function resetDB() {
  await client.connect();
  console.log('🧨 Dropping schema...');
  await client.query(`DROP SCHEMA public CASCADE;`);
  await client.query(`CREATE SCHEMA public;`);
  await client.end();
  console.log('✅ Database reset complete!');
}

resetDB().catch((err) => {
  console.error('❌ Error resetting DB:', err);
  process.exit(1);
});
