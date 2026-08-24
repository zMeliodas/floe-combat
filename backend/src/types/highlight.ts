export type Highlight = {
  id: number;
  title: string;
  athlete: string;
  media_type: "video" | "image";
  media_url: string;
  media_public_id: string;
  thumbnail_url: string | null;
  thumbnail_public_id: string | null;
  created_at: Date;
  updated_at: Date;
};