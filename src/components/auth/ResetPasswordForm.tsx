"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getAuthErrorMessage, resetPassword } from "@/api/auth";
import { AuthCard, AuthNotice } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

export default function ResetPasswordForm({ token = "" }: { token?: string }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const mutation = useMutation({ mutationFn: resetPassword });

  const form = useForm({
    defaultValues: { token, password: "" },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const response = await mutation.mutateAsync(value);
        setSuccessMessage(
          response.message ??
            "Your password has been updated. You can now sign in.",
        );
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    },
  });

  return (
    <AuthCard
      description="Use the reset token from your email to choose a new password."
      footer={
        <Link
          className="font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
          href="/login"
        >
          Back to sign in
        </Link>
      }
      title="Set a new password"
    >
      {errorMessage ? <AuthNotice>{errorMessage}</AuthNotice> : null}
      {successMessage ? (
        <AuthNotice variant="success">
          {successMessage}{" "}
          <Link className="font-semibold underline" href="/login">
            Sign in
          </Link>
        </AuthNotice>
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
            name="token"
            validators={{
              onBlur: ({ value }) =>
                value.trim().length === 0
                  ? "Enter the reset token from your email."
                  : undefined,
              onSubmit: ({ value }) =>
                value.trim().length === 0
                  ? "Enter the reset token from your email."
                  : undefined,
            }}
          >
            {(field) => (
              <AuthInput
                autoComplete="one-time-code"
                error={field.state.meta.errors.join(", ") || undefined}
                id={field.name}
                label="Reset token"
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
              />
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) =>
                value.length < 8
                  ? "Password must be at least 8 characters."
                  : undefined,
              onSubmit: ({ value }) =>
                value.length < 8
                  ? "Password must be at least 8 characters."
                  : undefined,
            }}
          >
            {(field) => (
              <AuthInput
                autoComplete="new-password"
                error={field.state.meta.errors.join(", ") || undefined}
                id={field.name}
                label="New password"
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                type="password"
                value={field.state.value}
              />
            )}
          </form.Field>
          <Button
            className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? "Updating password..." : "Update password"}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
