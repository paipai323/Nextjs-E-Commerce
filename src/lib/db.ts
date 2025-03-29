import { Pool } from 'pg';

declare global {
  var _db: Pool | undefined;
}

const db =
  global._db ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') {
  global._db = db;
}

export default db;
