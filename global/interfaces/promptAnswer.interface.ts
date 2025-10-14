import { PromptQuestion } from "./promptQuestions.interface";
import { User } from "./users.interface";

export interface PromptAnswer {
  id: number;
  question: number | PromptQuestion;
  user: number | User;
  content: string;
  updatedAt: string;
  createdAt: string;
}