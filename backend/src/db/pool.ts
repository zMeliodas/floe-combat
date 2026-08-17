import dotenv from "dotenv";
import path from "node:path";
import { Pool } from "pg";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL environment variable.");
}

const pool = new Pool({
  connectionString,
});

export default pool;
