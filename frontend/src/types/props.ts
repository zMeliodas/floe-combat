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