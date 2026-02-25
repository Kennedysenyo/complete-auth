import Link from "next/link";

export default function Home() {
  // const fullUser = null;
  const fullUser = { id: "", name: "Ken", role: "user" };
  return (
    <div>
      {fullUser == null ? (
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
      ) : (
        <div className="p-4 space-y-3 shadow-md">
          <p>User: </p>
          <span>Role: </span>
          <div className="flex gap-4 items-center mt-4">
            <Link
              href="/private"
              className="px-4 py-2 bg-gray-400 text-black text-xl rounded"
            >
              Private Page
            </Link>
            <button className="px-4 py-2 bg-red-600 text-white text-xl rounded">
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
