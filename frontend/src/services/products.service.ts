import type {
  Product,
  ProductInput,
  ProductResponse,
  ProductsResponse,
  UpdateProductInput,
} from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);

  const data: ProductsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products.");
  }

  return data.result;
};

const createProduct = async (
  product: ProductInput,
): Promise<Product> => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const formData = new FormData();

  formData.append("title", product.title);
  formData.append("category", product.category);
  formData.append("description", product.description);
  formData.append("sizes", JSON.stringify(product.sizes));

  product.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: ProductResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product.");
  }

  return data.result;
};

const updateProduct = async (
  id: number,
  product: UpdateProductInput,
): Promise<Product> => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const formData = new FormData();

  formData.append("title", product.title);
  formData.append("category", product.category);
  formData.append("description", product.description);
  formData.append("sizes", JSON.stringify(product.sizes));

  product.images?.forEach((image) => {
    formData.append("images", image);
  });

  formData.append(
    "deletedImageIds",
    JSON.stringify(product.deletedImageIds ?? []),
  );

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data: ProductResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product.");
  }

  return data.result;
};

const deleteProduct = async (id: number): Promise<Product> => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ProductResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product.");
  }

  return data.result;
};

export { getProducts, createProduct, updateProduct, deleteProduct };
