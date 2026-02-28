"use server";

import z from "zod";
import { signInSchema, signUpSchema } from "./schema";
import { signIn, signUp } from "./actions";

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;

type SignUpFormFieldErrorType = Partial<Record<keyof SignUpData, string>>;
type SignInFormFieldErrorType = Partial<Record<keyof SignInData, string>>;

export type SignUpFormState = {
  errors: SignUpFormFieldErrorType;
  errorMessage: string | null;
  success: boolean;
};

export type SignInFormState = {
  errors: SignInFormFieldErrorType;
  errorMessage: string | null;
  success: boolean;
};

export const validateSignUpForm = async (
  _prevState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  const data = Object.fromEntries(formData);

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    let errors: SignUpFormFieldErrorType = {};
    const flattenedErrors = z.flattenError(result.error).fieldErrors;
    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { errors, errorMessage: null, success: false };
  }

  const errorMessage = await signUp(result.data);
  if (errorMessage) {
    return { errors: {}, errorMessage, success: false };
  }

  return { errors: {}, errorMessage: null, success: true };
};

export const validateSignInForm = async (
  _prevState: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> => {
  const rawData = Object.fromEntries(formData);

  const result = signInSchema.safeParse(rawData);

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    let errors: SignInFormFieldErrorType = {};

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { errors, errorMessage: null, success: false };
  }

  // console.log(result.data);

  const errorMessage = await signIn(result.data);
  if (errorMessage) return { errors: {}, errorMessage, success: false };

  return { errors: {}, errorMessage: null, success: true };
};
