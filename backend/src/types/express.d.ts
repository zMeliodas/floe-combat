import type { AuthAdmin } from "./auth.js";

declare global {
  namespace Express {
    interface Request {
      admin?: AuthAdmin;
    }
  }
}

export {};