export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}

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
}

export type Theme = "light" | "dark";
