export type CreateProductInput = {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  sizes: string[];
}

export type UpdateProductInput = {
  title: string;
  category: string;
  description: string;
  sizes: string[];
  imageUrl?: string;
  imagePublicId?: string;
}