"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getAuthErrorMessage, verifyEmail } from "@/api/auth";
import { AuthCard, AuthNotice } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  authEmailSchema,
  authOtpSchema,
  getSchemaError,
} from "@/validation/auth";

export default function VerifyEmailForm({ email = "" }: { email?: string }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const mutation = useMutation({ mutationFn: verifyEmail });

  const form = useForm({
    defaultValues: { email, otp: "" },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setSuccessMessage(null);
      try {
        const response = await mutation.mutateAsync({
          email: value.email.trim(),
          otp: value.otp.trim(),
        });
        setSuccessMessage(
          response.message ?? "Your email is verified. You can now sign in.",
        );
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    },
  });

  return (
    <AuthCard
      description="Enter your email and the verification code sent to your inbox."
      footer={
        <Link
          className="font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
          href="/login"
        >
          Back to sign in
        </Link>
      }
      title="Verify your email"
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
          <form.Field
            name="otp"
            validators={{
              onBlur: ({ value }) => getSchemaError(authOtpSchema, value),
              onSubmit: ({ value }) => getSchemaError(authOtpSchema, value),
            }}
          >
            {(field) => (
              <AuthInput
                autoComplete="one-time-code"
                error={field.state.meta.errors.join(", ") || undefined}
                id={field.name}
                label="Verification code"
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                inputMode="numeric"
                maxLength={6}
                value={field.state.value}
              />
            )}
          </form.Field>
          <Button
            className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800"
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? "Verifying..." : "Verify email"}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
