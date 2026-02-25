import { AuthForm } from "@/auth/nextjs/components/auth-form";

export default function SignUpPage() {
  return (
    <div className="h-full flex flex-col pt-24 px-4">
      <AuthForm isLogin={false} />
    </div>
  );
}
