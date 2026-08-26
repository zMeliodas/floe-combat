export type CreateCustomerReviewInput = {
  author: string;
  role: string;
  productId: number;
  rating: number;
  reviewText: string;
};

export type CreateAdminReviewInput = {
  author: string;
  role: string;
  productId: number;
  rating: number;
  reviewText: string;
  featured: boolean;
};

export type UpdateReviewStatusInput = {
  status: "approved" | "rejected";
};

export type UpdateReviewInput = {
  author: string;
  role: string;
  productId: number | null;
  productName: string;
  rating: number;
  reviewText: string;
};
