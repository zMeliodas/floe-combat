export type Admin = {
  id: number;
  email: string;
  password_hash: string;
};

export type AuthAdmin = {
  adminId: number;
  email: string;
};