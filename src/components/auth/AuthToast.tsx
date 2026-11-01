"use client";

import { useEffect } from "react";

type AuthToastProps = {
  message: string;
  onDismiss: () => void;
  variant: "error" | "success";
};

export function AuthToast({ message, onDismiss, variant }: AuthToastProps) {
  useEffect(() => {
    const timeout = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timeout);
  }, [onDismiss]);

  return (
    <div
      className={`fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border px-4 py-3 text-sm shadow-lg ${
        variant === "error"
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950 dark:text-red-300"
          : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950 dark:text-emerald-300"
      }`}
      role={variant === "error" ? "alert" : "status"}
    >
      {message}
    </div>
  );
}
