import { HeartPulse } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
      <Card className="w-full max-w-md rounded-3xl border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <CardHeader className="gap-4 px-6 pt-8 sm:px-8 sm:pt-10">
          <Link
            aria-label="Healthcare System home"
            className="flex w-fit items-center gap-2.5"
            href="/"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-teal-700 text-white">
              <HeartPulse aria-hidden="true" className="size-5" />
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Healthcare System
            </span>
          </Link>
          <div className="pt-2">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {title}
            </CardTitle>
            <CardDescription className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-8 sm:px-8 sm:pb-10">
          {children}
          {footer ? (
            <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
              {footer}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </main>
  );
}

export function AuthNotice({
  children,
  variant = "error",
}: {
  children: ReactNode;
  variant?: "error" | "success";
}) {
  return (
    <div
      className={
        variant === "error"
          ? "mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          : "mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
      }
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
