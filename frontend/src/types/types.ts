export type Highlight = {
  id: number;
  title: string;
  athlete: string;
  mediaType: "video" | "image";   
  mediaUrl: string;               
  thumbnail?: string;             
};

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
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
