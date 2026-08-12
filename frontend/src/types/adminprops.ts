import type { ProductFormValues, HighlightFormValues } from "./admintypes";
import type { Project, Highlight } from "./types";

export type ProductFormModalProps = {
  isOpen: boolean;
  editingProduct: Project | null;
  categories: string[];
  sizeOptions: string[];
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

export interface HighlightFormModalProps {
  isOpen: boolean;
  editingHighlight: Highlight | null;
  onClose: () => void;
  onSubmit: (values: HighlightFormValues) => void;
}
