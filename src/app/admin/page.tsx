import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-4xl">Admin Page</h1>

      <Link href="/" className="px-4 py-2 rounded bg-gray-400 text-black">
        Home
      </Link>
    </div>
  );
}
