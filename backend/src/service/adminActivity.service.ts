import pool from "../db/pool.js";

const createAdminActivity = async (
  adminId: number,
  action: string,
  productId?: number,
) => {
  await pool.query(
    `
      INSERT INTO admin_activity_logs (
        admin_id,
        action,
        product_id
      )
      VALUES ($1, $2, $3)
    `,
    [adminId, action, productId ?? null],
  );
};

const getAdminActivities = async () => {
  const result = await pool.query(`
    SELECT
      logs.id,
      logs.admin_id AS "adminId",
      admins.email AS "adminEmail",
      logs.action,
      logs.product_id AS "productId",
      logs.created_at AS "createdAt"
    FROM admin_activity_logs AS logs
    JOIN admins
      ON logs.admin_id = admins.id
    ORDER BY logs.created_at DESC
  `);

  return result.rows;
};

export { createAdminActivity, getAdminActivities };
