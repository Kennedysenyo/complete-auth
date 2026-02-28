import { SignInForm } from "@/auth/nextjs/components/SignInForm";

export default function SingInPage() {
  return (
    <div className="h-full flex flex-col pt-24 px-4">
      <SignInForm />
    </div>
  );
}
