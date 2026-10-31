import { Suspense } from "react";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

type AccountVerifyProps = {
  searchParams: Promise<{ email?: string }>;
};

async function AccountVerifyContent({ searchParams }: AccountVerifyProps) {
  const { email } = await searchParams;
  return <VerifyEmailForm email={email} />;
}

export default function AccountVerify(props: AccountVerifyProps) {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
          Loading email verification...
        </main>
      }
    >
      <AccountVerifyContent {...props} />
    </Suspense>
  );
}
