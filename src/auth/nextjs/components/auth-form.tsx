import Link from "next/link";

interface Props {
  isLogin: boolean;
}

export const AuthForm = ({ isLogin }: Props) => {
  return (
    <form className="flex flex-col p-4 space-y-4 w-full md:max-w-[600px] mx-auto h-full rounded border border-gray-400">
      <h2 className="text-center text-4xl">
        {isLogin ? "Sign In" : "Sign Up"}
      </h2>
      <div className="flex flex-col space-y-2">
        {isLogin && (
          <label>
            Name <br />
            <input
              className="w-full p-2 rounded border border-gray-400 focus:outline-none"
              type="text"
            />
          </label>
        )}
        <label>
          Email <br />
          <input
            className="w-full p-2 rounded border border-gray-400 focus:outline-none"
            type="email"
          />
        </label>
        <label>
          Password <br />
          <input
            className="w-full p-2 rounded border border-gray-400 focus:outline-none"
            type="password"
          />
        </label>
      </div>
      <button
        className="bg-gray-400 p-3 text-black text-xl border-none rounded"
        type="submit"
      >
        {isLogin ? "Sign In" : "Sign Up"}
      </button>
      <small className="text-center">
        <span>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </span>{" "}
        <Link
          className="text-blue-400"
          href={isLogin ? "/sign-up" : "/sign-in"}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </Link>
      </small>
    </form>
  );
};
