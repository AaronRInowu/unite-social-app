import { z } from 'zod';

export const validatePhoneSchema = z.object({
  phone_number: z.string().max(15, 'Phone number must be at least 15 digits'),
}).refine((data) => {
  return data.phone_number.startsWith('+');
}, {
  message: "Phone number must contain the international prefix",
  path: ['phone_number'],
});

export  const verifyOtpSchema = z.object({
  code: z.string().length(6, 'Code must be exactly 6 digits'),
})

export type ValidatePhoneValues = z.infer<typeof validatePhoneSchema>;
export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>;
