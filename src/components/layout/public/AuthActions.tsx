"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuthErrorMessage } from "@/api/auth";
import { authQueryKeys, currentUserQuery } from "@/api/auth-query";
import { clearAuthSession } from "@/lib/auth-token";

export default function AuthActions({ mobile = false }: { mobile?: boolean }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, error, isError, isPending } = useQuery(currentUserQuery);

  if (isPending) {
    return <span aria-hidden="true" className="size-10" />;
  }

  if (!user) {
    return (
      <span
        className={mobile ? "flex flex-col gap-1" : "flex items-center gap-2"}
      >
        {isError ? (
          <output className="max-w-64 text-xs text-amber-700 dark:text-amber-300">
            Session error: {getAuthErrorMessage(error)}
          </output>
        ) : null}
        <Link
          className={
            mobile
              ? "rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-teal-300"
              : "rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-teal-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-teal-300"
          }
          href="/login"
        >
          Sign in
        </Link>
      </span>
    );
  }

  function signOut() {
    clearAuthSession();
    queryClient.setQueryData(authQueryKeys.me, null);
    router.replace("/login");
  }

  return (
    <button
      className={
        mobile
          ? "rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700 dark:text-slate-200 dark:hover:bg-red-950/40 dark:hover:text-red-300"
          : "rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-slate-200 dark:hover:bg-red-950/40 dark:hover:text-red-300"
      }
      onClick={signOut}
      type="button"
    >
      Sign out
    </button>
  );
}
