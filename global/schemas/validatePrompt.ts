import { z } from "zod";

export const validatePromptAnswer = z.object({
  answers: z.array(
    z.object({
      qId: z.number(),
      answer: z.string(),
      answerId: z.number().optional(),
    })
  ),
});

export type ValidateAnswer = z.infer<typeof validatePromptAnswer>;
