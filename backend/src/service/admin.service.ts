import pool from "../db/pool.js";
import type { Admin } from "../types/admin.js";

const getAdminByEmail = async (email: string): Promise<Admin | null> => {
  const result = await pool.query<Admin>(
    `
      SELECT
        id,
        email,
        password_hash
      FROM admins
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
};

export { getAdminByEmail };
