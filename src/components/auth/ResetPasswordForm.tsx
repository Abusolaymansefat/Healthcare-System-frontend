"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  getAuthErrorMessage,
  requestPasswordReset,
  resetPassword,
} from "@/api/auth";
import { AuthCard, AuthNotice } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthToast } from "@/components/auth/AuthToast";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  authEmailSchema,
  authOtpSchema,
  authPasswordSchema,
  getSchemaError,
} from "@/validation/auth";

export default function ResetPasswordForm({ email = "" }: { email?: string }) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
  } | null>(null);
  const [isReset, setIsReset] = useState(false);
  const resetMutation = useMutation({ mutationFn: resetPassword });
  const resendMutation = useMutation({ mutationFn: requestPasswordReset });
  const dismissToast = useCallback(() => setToast(null), []);

  const form = useForm({
    defaultValues: { email, otp: "", password: "" },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setToast(null);
      setIsReset(false);
      try {
        const response = await resetMutation.mutateAsync(value);
        setIsReset(true);
        setToast({
          message: response.message ?? "Your password has been updated.",
        });
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    },
  });

  async function handleResendOtp() {
    setErrorMessage(null);
    setToast(null);
    const currentEmail = form.getFieldValue("email");
    const emailError = getSchemaError(authEmailSchema, currentEmail);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    try {
      const response = await resendMutation.mutateAsync(currentEmail);
      form.setFieldValue("otp", "");
      setToast({
        message: response.message ?? "A new OTP has been sent to your email.",
      });
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    }
  }

  return (
    <AuthCard
      description="Enter the email address and OTP we sent you, then choose a new password."
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
      {toast ? (
        <AuthToast
          message={toast.message}
          onDismiss={dismissToast}
          variant="success"
        />
      ) : null}
      {isReset ? (
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
          Password updated.{" "}
          <Link
            className="font-semibold text-teal-700 underline dark:text-teal-300"
            href="/login"
          >
            Sign in
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
          <form.Field
            name="otp"
            validators={{
              onBlur: ({ value }) => getSchemaError(authOtpSchema, value),
              onSubmit: ({ value }) => getSchemaError(authOtpSchema, value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <AuthInput
                  autoComplete="one-time-code"
                  error={field.state.meta.errors.join(", ") || undefined}
                  id={field.name}
                  inputMode="numeric"
                  label="OTP"
                  maxLength={6}
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  value={field.state.value}
                />
                <Button
                  className="h-auto px-0 text-sm font-medium text-teal-700 hover:bg-transparent hover:text-teal-800 dark:text-teal-300"
                  disabled={resendMutation.isPending || resetMutation.isPending}
                  onClick={() => void handleResendOtp()}
                  type="button"
                  variant="link"
                >
                  {resendMutation.isPending
                    ? "Sending OTP..."
                    : "Send a new OTP"}
                </Button>
              </div>
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => getSchemaError(authPasswordSchema, value),
              onSubmit: ({ value }) =>
                getSchemaError(authPasswordSchema, value),
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
            disabled={resetMutation.isPending || resendMutation.isPending}
            type="submit"
          >
            {resetMutation.isPending
              ? "Resetting password..."
              : "Reset password"}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
