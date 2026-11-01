import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type ResetPasswordPageProps = {
  searchParams: Promise<{ email?: string | string[] }>;
};

async function ResetPasswordContent({ searchParams }: ResetPasswordPageProps) {
  const { email } = await searchParams;

  return <ResetPasswordForm email={Array.isArray(email) ? email[0] : email} />;
}

export default function ResetPasswordPage(props: ResetPasswordPageProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          Loading password reset...
        </main>
      }
    >
      <ResetPasswordContent {...props} />
    </Suspense>
  );
}
