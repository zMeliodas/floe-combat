export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  sizes: string[];
  created_at: Date;
  updated_at: Date;
  images: ProductImage[];
};

export type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
  image_public_id: string;
  is_primary: boolean;
  sort_order: number;
  created_at: Date;
};

export type NewProductImage = {
  image_url: string;
  image_public_id: string;
};