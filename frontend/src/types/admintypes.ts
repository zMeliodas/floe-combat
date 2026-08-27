export type ProductFormValues = {
  title: string;
  category: string;
  description: string;
  sizes: string[];
  images: File[];
  deletedImageIds: number[];
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

export type AdminLoginResponse = {
  success: boolean;
  message: string;
  result: {
    id: number;
    email: string;
    token: string;
  };
};

export type AdminLoginInput = {
  email: string;
  password: string;
};