"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getAuthErrorMessage, requestPasswordReset } from "@/api/auth";
import { AuthCard, AuthNotice } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

export default function ForgetPasswordForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const mutation = useMutation({ mutationFn: requestPasswordReset });

  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const response = await mutation.mutateAsync(value.email);
        setSuccessMessage(
          response.message ??
            "If an account exists for that email, password reset instructions have been sent.",
        );
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    },
  });

  return (
    <AuthCard
      description="Enter the email address linked to your account and we’ll send password reset instructions."
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
      {errorMessage ? <AuthNotice>{errorMessage}</AuthNotice> : null}
      {successMessage ? (
        <AuthNotice variant="success">{successMessage}</AuthNotice>
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
              onBlur: ({ value }) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? "Enter a valid email address."
                  : undefined,
              onSubmit: ({ value }) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? "Enter a valid email address."
                  : undefined,
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
            {mutation.isPending ? "Sending instructions..." : "Send reset link"}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
