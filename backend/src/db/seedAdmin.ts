import { hash } from "@node-rs/argon2";
import pool from "./pool.js";

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

const main = async () => {
  try {
    if (!email || !password) {
      console.error("Usage: tsx src/db/seedAdmin.ts <email> <password>");
      process.exit(1);
    }

    const passwordHash = await hash(password);

    await pool.query(
      "INSERT INTO admins (email, password_hash) VALUES ($1, $2)",
      [email, passwordHash],
    );

    console.log(`Admin created: ${email}`);
  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

main();
