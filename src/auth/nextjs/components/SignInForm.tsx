"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormState, validateSignUpForm } from "../validations";

export const SignInForm = () => {
  const initialState: FormState = {
    errors: {},
    errorMessage: null,
    success: false,
  };
  const [state, formAction, isPending] = useActionState(
    validateSignUpForm,
    initialState,
  );
  return (
    <form
      // action={formAction}
      className="flex flex-col p-4 space-y-4 w-full md:max-w-[600px] mx-auto h-full rounded border border-gray-400"
    >
      <h2 className="text-center text-4xl">Sign In</h2>

      <div className="flex flex-col space-y-2">
        <label>
          Email <br />
          <input
            name="email"
            className="w-full p-2 rounded border border-gray-400 focus:outline-none"
            type="email"
          />
        </label>
        <label>
          Password <br />
          <input
            name="password"
            className="w-full p-2 rounded border border-gray-400 focus:outline-none"
            type="password"
          />
        </label>
      </div>
      <button
        className="bg-gray-400 p-3 text-black text-xl border-none rounded cursor-pointer"
        type="submit"
      >
        Sign In
      </button>
      <small className="flex items-center gap-2 justify-center">
        <span>Don't have an account</span>
        <Link className="text-blue-400" href="/sign-up">
          Sign Up
        </Link>
      </small>
    </form>
  );
};
