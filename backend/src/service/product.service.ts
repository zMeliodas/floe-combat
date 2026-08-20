import pool from "../db/pool.js";
import type { Product } from "../types/product.js";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "../types/productInput.js";

const productColumns = `
  id::integer AS id,
  title,
  category,
  description,
  image_url,
  image_public_id,
  sizes,
  created_at,
  updated_at
`;

const getAllProducts = async (): Promise<Product[]> => {
  const result = await pool.query<Product>(`
    SELECT ${productColumns}
    FROM products
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const createProduct = async (input: CreateProductInput): Promise<Product> => {
  const result = await pool.query<Product>(
    `
      INSERT INTO products (
        title,
        category,
        description,
        image_url,
        image_public_id,
        sizes
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING ${productColumns}
    `,
    [
      input.title,
      input.category,
      input.description,
      input.imageUrl,
      input.imagePublicId,
      input.sizes,
    ],
  );

  const product = result.rows[0];

  if (!product) {
    throw new Error("Product was not returned after creation.");
  }

  return product;
};

const deleteProductById = async (id: number): Promise<Product | null> => {
  const result = await pool.query<Product>(
    `
      DELETE FROM products
      WHERE id = $1
      RETURNING ${productColumns}
    `,
    [id],
  );
  return result.rows[0] ?? null;
};

const getProductById = async (id: number): Promise<Product | null> => {
  const result = await pool.query<Product>(
    `
      SELECT ${productColumns}
      FROM products
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

const updateProduct = async (
  id: number,
  input: UpdateProductInput,
): Promise<Product | null> => {
  const result = await pool.query<Product>(
    `
      UPDATE products
      SET
        title = $1,
        category = $2,
        description = $3,
        sizes = $4,
        image_url = COALESCE($5, image_url),
        image_public_id = COALESCE($6, image_public_id),
        updated_at = NOW()
      WHERE id = $7
      RETURNING ${productColumns}
    `,
    [
      input.title,
      input.category,
      input.description,
      input.sizes,
      input.imageUrl ?? null,
      input.imagePublicId ?? null,
      id,
    ],
  );

  return result.rows[0] ?? null;
};

export {
  getAllProducts,
  createProduct,
  deleteProductById,
  getProductById,
  updateProduct,
};
