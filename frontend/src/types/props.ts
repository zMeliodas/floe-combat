import type { HighlightFormValues } from "./admintypes";
import type { Product } from "./types";

export type ReviewProps = {
  isOpen: boolean;
  onClose: () => void;
  form: {
    rating: number;
    text: string;
    author: string;
    role: string;
    design: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      rating: number;
      text: string;
      author: string;
      role: string;
      design: string;
    }>
  >;
  productOptions: string[];
  onSubmit: () => void;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type ProductPreviewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export type HighlightFormModalProps = {
  isOpen: boolean;
  editingHighlight: Highlight | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: HighlightFormValues) => void;
};
