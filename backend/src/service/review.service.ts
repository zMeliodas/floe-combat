import pool from "../db/pool.js";
import type { Review } from "../types/review.js";
import type {
  CreateAdminReviewInput,
  CreateCustomerReviewInput,
  UpdateReviewInput,
  UpdateReviewStatusInput,
} from "../types/reviewInput.js";

const createCustomerReview = async ({
  author,
  role,
  productId,
  rating,
  reviewText,
}: CreateCustomerReviewInput) => {
  const result = await pool.query(
    `
      INSERT INTO reviews (
        author,
        role,
        product_id,
        product_name,
        rating,
        review_text,
        status,
        featured
      )
      SELECT
        $1,
        $2,
        id,
        title,
        $4,
        $5,
        'pending',
        false
      FROM products
      WHERE id = $3
      RETURNING *
    `,
    [author, role, productId, rating, reviewText],
  );

  return result.rows[0] ?? null;
};

const getApprovedReviews = async (): Promise<Review[]> => {
  const result = await pool.query(
    `
      SELECT *
      FROM reviews
      WHERE status = 'approved'
      ORDER BY featured DESC, created_at DESC
    `,
  );

  return result.rows;
};

const getAllReviews = async (): Promise<Review[]> => {
  const result = await pool.query(
    `
      SELECT *
      FROM reviews
      ORDER BY created_at DESC
    `,
  );

  return result.rows;
};

const getReviewById = async (id: number): Promise<Review | null> => {
  const result = await pool.query(
    `
      SELECT *
      FROM reviews
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

const createAdminReview = async ({
  author,
  role,
  productId,
  rating,
  reviewText,
  featured,
}: CreateAdminReviewInput): Promise<Review | null> => {
  const result = await pool.query(
    `
      INSERT INTO reviews (
        author,
        role,
        product_id,
        product_name,
        rating,
        review_text,
        status,
        featured
      )
      SELECT
        $1,
        $2,
        id,
        title,
        $4,
        $5,
        'approved',
        $6
      FROM products
      WHERE id = $3
      RETURNING *
    `,
    [author, role, productId, rating, reviewText, featured],
  );

  return result.rows[0] ?? null;
};

const updateReviewStatus = async (
  id: number,
  { status }: UpdateReviewStatusInput,
): Promise<Review | null> => {
  const result = await pool.query(
    `
      UPDATE reviews
      SET
        status = $1::VARCHAR,
        featured = CASE
          WHEN $1::VARCHAR = 'rejected' THEN false
          ELSE featured
        END,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `,
    [status, id],
  );

  return result.rows[0] ?? null;
};

const updateReviewFeatured = async (
  id: number,
  featured: boolean,
): Promise<Review | null> => {
  const result = await pool.query(
    `
      UPDATE reviews
      SET
        featured = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
        AND ($1 = false OR status = 'approved')
      RETURNING *
    `,
    [featured, id],
  );

  return result.rows[0] ?? null;
};

const updateReview = async (
  id: number,
  {
    author,
    role,
    productId,
    productName,
    rating,
    reviewText,
  }: UpdateReviewInput,
): Promise<Review | null> => {
  const result = await pool.query(
    `
      UPDATE reviews
      SET
        author = $1,
        role = $2,
        product_id = $3,
        product_name = $4,
        rating = $5,
        review_text = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `,
    [author, role, productId, productName, rating, reviewText, id],
  );

  return result.rows[0] ?? null;
};

const deleteReviewById = async (id: number): Promise<Review | null> => {
  const result = await pool.query(
    `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export {
  createCustomerReview,
  createAdminReview,
  getApprovedReviews,
  getAllReviews,
  getReviewById,
  updateReviewStatus,
  updateReviewFeatured,
  updateReview,
  deleteReviewById,
};
