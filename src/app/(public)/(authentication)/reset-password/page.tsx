import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type ResetPasswordPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

async function ResetPasswordContent({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return <ResetPasswordForm token={Array.isArray(token) ? token[0] : token} />;
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
