import type { ProductFormValues, HighlightFormValues, ReviewFormValues } from "./admintypes";
import type { Product, Highlight, Review } from "./types";

export type ProductFormModalProps = {
  isOpen: boolean;
  editingProduct: Product | null;
  categories: string[];
  sizeOptions: string[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
};

export type DeleteConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  itemName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export type ImagePreviewModalProps = {
  isOpen: boolean;
  imageUrl: string;
  title?: string;
  onClose: () => void;
};

export type HighlightFormModalProps = {
  isOpen: boolean;
  editingHighlight: Highlight | null;
  onClose: () => void;
  onSubmit: (values: HighlightFormValues) => void;
}

export type ReviewFormModalProps = {
  isOpen: boolean;
  editingReview: Review | null;
  designOptions: string[];
  onClose: () => void;
  onSubmit: (values: ReviewFormValues) => void;
};
