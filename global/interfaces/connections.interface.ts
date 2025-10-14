import { User } from "./users.interface";

export interface Connection {
  id: number;
  friend?: (number | null) | User;
  user?: (number | null) | User;
  updatedAt: string;
  createdAt: string;
}