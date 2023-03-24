import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

// create the connection
const connection = connect({
  host: process.env['DB_HOST'],
  username: process.env['DB_USER'],
  password: process.env['DB_PASS'],
});

export const db = drizzle(connection);
