export type Highlight = {
  id: number;
  title: string;
  athlete: string;
  mediaType: "video" | "image";   
  mediaUrl: string;               
  thumbnail?: string;             
};

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  sizes: string[];
}

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
  image: File;
};

export type UpdateProductInput = {
  title: string;
  category: string;
  description: string;
  sizes: string[];
  image?: File;
};
