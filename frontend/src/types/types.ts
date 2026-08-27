export type Highlight = {
  id: number;
  title: string;
  athlete: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  thumbnail?: string;
};

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  sizes: string[];
  images: ProductImage[];
};

export interface Review {
  id: number;
  featured?: boolean;
  status: "pending" | "approved";
  rating: number;
  text: string;
  design: string;
  author: string;
  role: string;
  initial: string;
}

export type Theme = "light" | "dark";

export type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
};

export type ProductResponse = {
  success: boolean;
  message: string;
  result: Product;
};

export type ProductsResponse = {
  success: boolean;
  message: string;
  result: Product[];
};

export type ProductInput = {
  title: string;
  category: string;
  description: string;
  sizes: string[];
  images: File[];
};

export type UpdateProductInput = {
  title: string;
  category: string;
  description: string;
  sizes: string[];
  images?: File[];
  deletedImageIds: number[];
};
