import { z } from "zod";

export const authEmailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.");

export const authNameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters.")
  .max(20, "Name must be at most 20 characters.");

export const authPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[0-9]/, "Password must contain at least one number.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character.",
  );

export const loginPasswordSchema = authPasswordSchema;

export const authOtpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit OTP sent to your email.");

export function getSchemaError(
  schema: z.ZodType,
  value: string,
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}
