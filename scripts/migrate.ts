import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  const migrationDir = path.join(process.cwd(), 'migrations');
  const files = fs.readdirSync(migrationDir).filter(f => f.endsWith('.sql')).sort();

  await client.connect();

  // Make sure the migration_history table exists
  await client.query(`
    CREATE TABLE IF NOT EXISTS migration_history (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  for (const file of files) {
    const alreadyApplied = await client.query(
      'SELECT 1 FROM migration_history WHERE filename = $1',
      [file]
    );

    if (alreadyApplied.rows.length > 0) {
      console.log(`✅ Skipping ${file}, already applied.`);
      continue;
    }

    const sql = fs.readFileSync(path.join(migrationDir, file), 'utf8');
    console.log(`⏳ Running ${file}...`);
    await client.query(sql);

    await client.query(
      'INSERT INTO migration_history (filename) VALUES ($1)',
      [file]
    );
    console.log(`✅ Applied ${file}`);
  }

  await client.end();
  console.log('🎉 All pending migrations applied successfully!');
}


runMigrations().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
