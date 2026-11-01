"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  getAuthErrorMessage,
  getAuthUser,
  login,
  loginWithGoogle,
} from "@/api/auth";
import { authQueryKeys, currentUserQuery } from "@/api/auth-query";
import { AuthCard, AuthNotice } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  authEmailSchema,
  getSchemaError,
  loginPasswordSchema,
} from "@/validation/auth";

type GoogleCredentialResponse = {
  credential: string;
};

type GoogleCredentialHandler = (credential: string) => Promise<void>;

let activeGoogleCredentialHandler: GoogleCredentialHandler | null = null;
let initializedGoogleClientId: string | null = null;

async function loadSignedInUser(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  const user = await queryClient.fetchQuery({
    ...currentUserQuery,
    staleTime: 0,
  });

  if (!user) {
    throw new Error("Signed in, but the user profile could not be loaded.");
  }

  queryClient.setQueryData(authQueryKeys.me, user);
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              theme: "outline";
              size: "large";
              text: "continue_with";
              shape: "pill";
              width: number;
            },
          ) => void;
        };
      };
    };
  }
}

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const loginMutation = useMutation({ mutationFn: login });
  const googleLoginMutation = useMutation({ mutationFn: loginWithGoogle });
  const googleSignIn = googleLoginMutation.mutateAsync;
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const googleIdentity = window.google?.accounts.id;
    const button = googleButtonRef.current;

    if (!googleScriptLoaded || !googleClientId || !googleIdentity || !button) {
      return;
    }

    const handleGoogleCredential: GoogleCredentialHandler = async (
      credential,
    ) => {
      setErrorMessage(null);
      try {
        const response = await googleSignIn(credential);
        const user = getAuthUser(response);
        if (user) {
          queryClient.setQueryData(authQueryKeys.me, user);
        } else {
          await loadSignedInUser(queryClient);
        }
        router.replace("/");
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    };

    activeGoogleCredentialHandler = handleGoogleCredential;
    if (initializedGoogleClientId !== googleClientId) {
      googleIdentity.initialize({
        client_id: googleClientId,
        callback: ({ credential }) => {
          void activeGoogleCredentialHandler?.(credential);
        },
      });
      initializedGoogleClientId = googleClientId;
    }

    button.replaceChildren();
    googleIdentity.renderButton(button, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      shape: "pill",
      width: Math.min(360, window.innerWidth - 64),
    });

    return () => {
      if (activeGoogleCredentialHandler === handleGoogleCredential) {
        activeGoogleCredentialHandler = null;
      }
    };
  }, [googleClientId, googleSignIn, googleScriptLoaded, queryClient, router]);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      try {
        const response = await loginMutation.mutateAsync(value);
        const user = getAuthUser(response);
        if (user) {
          queryClient.setQueryData(authQueryKeys.me, user);
        } else {
          await loadSignedInUser(queryClient);
        }
        router.replace("/");
      } catch (error) {
        setErrorMessage(getAuthErrorMessage(error));
      }
    },
  });

  return (
    <AuthCard
      description="Sign in to continue to your connected care experience."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300"
            href="/register"
          >
            Create an account
          </Link>
        </>
      }
      title="Welcome back"
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
              onBlur: ({ value }) => getSchemaError(loginPasswordSchema, value),
              onSubmit: ({ value }) =>
                getSchemaError(loginPasswordSchema, value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <AuthInput
                  autoComplete="current-password"
                  error={field.state.meta.errors.join(", ") || undefined}
                  id={field.name}
                  label="Password"
                  onBlur={field.handleBlur}
                  onChange={field.handleChange}
                  type="password"
                  value={field.state.value}
                />
                <div className="text-right">
                  <Link
                    className="text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-300"
                    href="/forget-password"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            )}
          </form.Field>
          <Button
            className="h-11 w-full rounded-xl bg-teal-700 text-sm font-semibold text-white hover:bg-teal-800"
            disabled={loginMutation.isPending}
            type="submit"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </FieldGroup>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        or continue with
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
      {googleClientId ? (
        <>
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
            onLoad={() => setGoogleScriptLoaded(true)}
            onError={() =>
              setErrorMessage("Google sign-in could not be loaded. Try again.")
            }
          />
          <div
            aria-busy={googleLoginMutation.isPending}
            className="flex min-h-11 w-full justify-center"
            ref={googleButtonRef}
          />
          {googleLoginMutation.isPending ? (
            <p className="mt-2 text-center text-xs text-slate-500">
              Signing in with Google...
            </p>
          ) : null}
        </>
      ) : (
        <AuthNotice>
          Google sign-in is unavailable. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID to
          enable it.
        </AuthNotice>
      )}
    </AuthCard>
  );
}
