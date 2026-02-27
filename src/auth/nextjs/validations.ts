"use server";

import z from "zod";
import { signUpSchema } from "./schema";

type SignUpData = z.infer<typeof signUpSchema>;

type FormFieldErrorType = Partial<Record<keyof SignUpData, string>>;

export type FormState = {
  errors: FormFieldErrorType;
  errorMessage: string | null;
  success: boolean;
};

export const validateSignUpForm = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const data = Object.fromEntries(formData);

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    let errors: FormFieldErrorType = {};
    const flattenedErrors = z.flattenError(result.error).fieldErrors;
    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { errors, errorMessage: null, success: false };
  }

  return { errors: {}, errorMessage: null, success: true };
};

export const validateSignInForm = async () => {};
