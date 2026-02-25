"use client";
import Link from "next/link";
import { useState } from "react";

export default function PrivatePage() {
  const [role, setRole] = useState<"user" | "admin">("user");
  return (
    <div className="space-y-8 p-4">
      <h1 className="text-4xl">Private: {role}</h1>
      <div className="flex gap-4">
        <button
          onClick={() =>
            setRole((prev) => (prev === "user" ? "admin" : "user"))
          }
          className="px-4 py-2 text-black bg-gray-400 rounded"
        >
          Toggle Role
        </button>
        <Link className="px-4 py-2 text-black bg-gray-400 rounded" href="/">
          Home
        </Link>
      </div>
    </div>
  );
}
