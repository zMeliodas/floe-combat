export type ProductFormValues = {
  title: string;
  category: string;
  description: string;
  image: string;
  sizes: string[];
};

export type HighlightFormValues = {
  title: string;
  athlete: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnail?: string;
};

export type ReviewFormValues = {
  author: string;
  role: string;
  design: string;
  rating: number;
  text: string;
  featured: boolean;
};