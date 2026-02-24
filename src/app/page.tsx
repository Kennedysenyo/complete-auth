import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center gap-4 p-3">
      <Link
        href="/sign-in"
        className="px-4 py-2 bg-gray-400 text-black text-xl rounded-md"
      >
        Login
      </Link>
      <Link
        href="/sign-up"
        className="px-4 py-2 bg-gray-400 text-black text-xl rounded-md"
      >
        Signup
      </Link>
    </div>
  );
}
