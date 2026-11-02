"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";
import { getAuthErrorMessage } from "@/api/auth";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { useRequestPasswordReset } from "@/hooks/auth";
import { authEmailSchema, getSchemaError } from "@/validation/auth";

export default function ForgetPasswordForm() {
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const mutation = useRequestPasswordReset();

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setResetEmail(null);
      try {
        const response = await mutation.mutateAsync(value.email);
        setResetEmail(value.email.trim());
        toast.create({
          title: "Success",
          description:
            response.message ??
            "A password reset OTP has been sent to your email.",
          type: "success",
        });
      } catch (error) {
        toast.create({
          title: "Error",
          description: getAuthErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <AuthCard
      description="Enter the email address linked to your account and we’ll send a password reset OTP."
      footer={
        <Link
          className="font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
          href="/login"
        >
          Back to sign in
        </Link>
      }
      title="Forgot your password?"
    >
      {resetEmail ? (
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Enter the OTP sent to your email.{" "}
          <Link
            className="font-semibold text-teal-700 underline dark:text-teal-300"
            href={`/reset-password?email=${encodeURIComponent(resetEmail)}`}
          >
            Continue to reset password
          </Link>
        </p>
      ) : null}
      <form
        className="space-y-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => getSchemaError(authEmailSchema, value),
              onSubmit: ({ value }) => getSchemaError(authEmailSchema, value),
            }}
          >
            {(field) => (
              <AuthInput
                autoComplete="email"
                error={field.state.meta.errors.join(", ") || undefined}
                id={field.name}
                label="Email"
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                type="email"
                value={field.state.value}
              />
            )}
          </form.Field>
          <Button
            className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? "Sending OTP..." : "Send OTP"}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
