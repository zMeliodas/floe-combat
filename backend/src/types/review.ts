export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: number;
  author: string;
  role: string;
  product_id: number | null;
  product_name: string;
  rating: number;
  review_text: string;
  status: ReviewStatus;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
};