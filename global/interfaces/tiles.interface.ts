import { User } from "./users.interface";

export interface Tile {
  id: number;
  user: number | User;
  position: number;
  template?: 'default' | null;
  content: string;
  updatedAt: string;
  createdAt: string;
}