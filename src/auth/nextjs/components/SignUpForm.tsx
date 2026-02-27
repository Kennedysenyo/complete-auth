"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormState, validateSignUpForm } from "../validations";

export const SignUPForm = () => {
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
      action={formAction}
      className="flex flex-col p-4 space-y-4 w-full md:max-w-[600px] mx-auto h-full rounded border border-gray-400"
    >
      <h2 className="text-center text-4xl">Sign Up</h2>

      <div className="flex flex-col space-y-2">
        <div>
          <label>
            Name <br />
            <input
              name="name"
              className="w-full p-2 rounded border border-gray-400 focus:outline-none"
              type="text"
            />
          </label>
          {state.errors.name && (
            <small className="text-xs text-red-600">{state.errors.name}</small>
          )}
        </div>

        <div>
          <label>
            Email <br />
            <input
              name="email"
              className="w-full p-2 rounded border border-gray-400 focus:outline-none"
              type="email"
            />
          </label>
          {state.errors.email && (
            <small className="text-xs text-red-600">{state.errors.email}</small>
          )}
        </div>

        <div>
          <label>
            Password <br />
            <input
              name="password"
              className="w-full p-2 rounded border border-gray-400 focus:outline-none"
              type="password"
            />
          </label>
          {state.errors.password && (
            <small className="text-xs text-red-600">
              {state.errors.password}
            </small>
          )}
        </div>
      </div>
      <button
        className="bg-gray-400 p-3 text-black text-xl border-none rounded cursor-pointer"
        type="submit"
      >
        Sign Up
      </button>
      <small className="text-center">
        <span>Already have an account?</span>
        <Link className="text-blue-400" href="/sign-in">
          "Sign In
        </Link>
      </small>
    </form>
  );
};
