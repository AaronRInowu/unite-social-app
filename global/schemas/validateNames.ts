import { z } from "zod";

export const validateNames = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name must be at most 100 characters"),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must be at most 100 characters"),
});
export type ValidateNamesValues = z.infer<typeof validateNames>;
