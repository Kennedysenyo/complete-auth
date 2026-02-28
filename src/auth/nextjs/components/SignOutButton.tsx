"use client";

import { useTransition } from "react";
import { signOut } from "../actions";

export const SignOutButton = () => {
  const [pending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };
  return (
    <button
      aria-disabled={pending}
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-600 text-white text-xl rounded"
    >
      Log Out
    </button>
  );
};
