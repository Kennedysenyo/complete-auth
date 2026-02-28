import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, {
    error: (iss) =>
      !iss.input
        ? "Name is required."
        : "Name must be greater than 3 characters.",
  }),
  email: z.email(),
  password: z.string().min(8, {
    error: (iss) =>
      !iss.input
        ? "Password is required."
        : "Password must have >=8 characters.",
  }),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(1, { error: (iss) => (!iss.input ? "Enter password" : "") }),
});
