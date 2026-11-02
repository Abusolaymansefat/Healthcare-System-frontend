"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  type AuthResponse,
  getAuthUser,
  getCurrentUser,
  login,
  loginWithGoogle,
  register,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from "@/api/auth";
import { clearAuthSession } from "@/lib/auth-token";

export const authQueryKeys = {
  me: ["auth", "me"] as const,
};

const currentUserQuery = {
  queryKey: authQueryKeys.me,
  queryFn: getCurrentUser,
  retry: false,
};

export function useCurrentUser() {
  return useQuery(currentUserQuery);
}

async function updateCurrentUserCache(
  queryClient: ReturnType<typeof useQueryClient>,
  response: AuthResponse,
) {
  const user = getAuthUser(response);
  if (user) {
    queryClient.setQueryData(authQueryKeys.me, user);
    return;
  }

  const currentUser = await queryClient.fetchQuery({
    ...currentUserQuery,
    staleTime: 0,
  });

  if (!currentUser) {
    throw new Error("Signed in, but the user profile could not be loaded.");
  }

  queryClient.setQueryData(authQueryKeys.me, currentUser);
}

function useSignInMutation<TInput>(
  mutationFn: (input: TInput) => Promise<AuthResponse>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (response) => updateCurrentUserCache(queryClient, response),
  });
}

export function useLogin() {
  return useSignInMutation(login);
}

export function useGoogleLogin() {
  return useSignInMutation(loginWithGoogle);
}

export function useRegister() {
  return useMutation({ mutationFn: register });
}

export function useRequestPasswordReset() {
  return useMutation({ mutationFn: requestPasswordReset });
}

export function useResetPassword() {
  return useMutation({ mutationFn: resetPassword });
}

export function useVerifyEmail() {
  return useMutation({ mutationFn: verifyEmail });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useCallback(() => {
    clearAuthSession();
    queryClient.setQueryData(authQueryKeys.me, null);
  }, [queryClient]);
}
