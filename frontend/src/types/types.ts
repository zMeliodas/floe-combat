export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}

export interface Highlight {
  id: number;
  title: string;
  athlete: string;
  videoUrl: string;
  thumbnail: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}