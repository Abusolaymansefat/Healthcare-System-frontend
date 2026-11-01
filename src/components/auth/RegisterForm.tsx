"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuthErrorMessage, register } from "@/api/auth";
import { AuthCard, AuthNotice } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  authEmailSchema,
  authNameSchema,
  authPasswordSchema,
  getSchemaError,
} from "@/validation/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const registerMutation = useMutation({ mutationFn: register });

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      try {
        await registerMutation.mutateAsync(value);
        router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    },
  });

  return (
    <AuthCard
      description="Create an account to start your connected care journey."
      footer={
        <>
          Already have an account?{" "}
          <Link
            className="font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
            href="/login"
          >
            Sign in
          </Link>
        </>
      }
      title="Create your account"
    >
      {errorMessage ? <AuthNotice>{errorMessage}</AuthNotice> : null}
      <form
        className="space-y-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-4">
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) => getSchemaError(authNameSchema, value),
              onSubmit: ({ value }) => getSchemaError(authNameSchema, value),
            }}
          >
            {(field) => (
              <AuthInput
                autoComplete="name"
                error={field.state.meta.errors.join(", ") || undefined}
                id={field.name}
                label="Full name"
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                value={field.state.value}
              />
            )}
          </form.Field>
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
                label="Password"
                onBlur={field.handleBlur}
                onChange={field.handleChange}
                type="password"
                value={field.state.value}
              />
            )}
          </form.Field>
          <Button
            className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800"
            disabled={registerMutation.isPending}
            type="submit"
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Create account"}
          </Button>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
