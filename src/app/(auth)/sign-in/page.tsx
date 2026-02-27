import { AuthForm } from "@/auth/nextjs/components/SignInForm";

export default function SingInPage() {
  return (
    <div className="h-full flex flex-col pt-24 px-4">
      <AuthForm isLogin={true} />
    </div>
  );
}
