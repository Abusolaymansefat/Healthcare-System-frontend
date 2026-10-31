import apiClient from "@/lib/apiClient";
import {
  getAccessToken,
  isLocallySignedOut,
  setAccessToken,
} from "@/lib/auth-token";

const AUTH_API_PREFIX = "/api/v1/auth";

export type AuthUser = {
  id?: string;
  name?: string;
  email: string;
  role?: string;
};

export type AuthResponse = {
  accessToken?: string;
  access_token?: string;
  token?: string;
  user?: AuthUser;
  message?: string;
  data?: AuthResponse | AuthUser;
};

type MessageResponse = {
  message?: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type RegisterInput = LoginInput & {
  name: string;
};

function saveAccessToken(response: AuthResponse) {
  let current: AuthResponse | AuthUser | undefined = response;
  while (current && !("email" in current)) {
    const token = current.accessToken ?? current.access_token ?? current.token;
    if (token) {
      setAccessToken(token);
      return;
    }
    if (current.user) {
      current = current.user;
      continue;
    }
    current = current.data;
  }
  setAccessToken(null);
}

export function getAuthUser(response: AuthResponse): AuthUser | undefined {
  let current: AuthResponse | AuthUser | undefined = response;
  while (current && !("email" in current)) {
    if (current.user) {
      current = current.user;
      continue;
    }
    current = current.data;
  }
  return current && "email" in current ? current : undefined;
}

export async function login(input: LoginInput) {
  const response = await apiClient<AuthResponse>(`${AUTH_API_PREFIX}/login`, {
    method: "POST",
    body: input,
  });
  saveAccessToken(response);
  return response;
}

export async function register(input: RegisterInput) {
  return apiClient<MessageResponse>(`${AUTH_API_PREFIX}/register`, {
    method: "POST",
    body: input,
  });
}

export async function requestPasswordReset(email: string) {
  return apiClient<MessageResponse>(`${AUTH_API_PREFIX}/forget-password`, {
    method: "POST",
    body: { email },
  });
}

export async function resetPassword(input: {
  token: string;
  password: string;
}) {
  return apiClient<MessageResponse>(`${AUTH_API_PREFIX}/reset-password`, {
    method: "POST",
    body: input,
  });
}

export async function verifyEmail(input: { email: string; otp: string }) {
  return apiClient<MessageResponse>(`${AUTH_API_PREFIX}/verify-email`, {
    method: "POST",
    body: {
      email: input.email.trim(),
      otp: input.otp.trim(),
    },
  });
}

export async function refreshToken() {
  const response = await apiClient<AuthResponse>(
    `${AUTH_API_PREFIX}/refresh-token`,
    {
      method: "POST",
    },
  );
  saveAccessToken(response);
  return response;
}

function getStatusCode(error: unknown) {
  if (typeof error !== "object" || error === null || !("response" in error)) {
    return undefined;
  }

  const response = error.response;
  return response instanceof Response ? response.status : undefined;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (isLocallySignedOut()) {
    return null;
  }

  try {
    const response = await apiClient<AuthResponse>(`${AUTH_API_PREFIX}/me`);
    const user = getAuthUser(response);
    if (!user) {
      throw new Error("The auth/me response did not contain a user.");
    }
    return user;
  } catch (error) {
    if (getStatusCode(error) !== 401) {
      throw error;
    }

    if (!getAccessToken()) {
      return null;
    }

    try {
      await refreshToken();
    } catch (refreshError) {
      setAccessToken(null);
      throw refreshError;
    }
    const response = await apiClient<AuthResponse>(`${AUTH_API_PREFIX}/me`);
    const user = getAuthUser(response);
    if (!user) {
      throw new Error("The auth/me response did not contain a user.");
    }
    return user;
  }
}

export async function loginWithGoogle(credential: string) {
  const response = await apiClient<AuthResponse>(`${AUTH_API_PREFIX}/google`, {
    method: "POST",
    body: {
      credential,
      idToken: credential,
      token: credential,
    },
  });
  saveAccessToken(response);
  return response;
}

export function getAuthErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const data =
      "data" in error ? error.data : "_data" in error ? error._data : undefined;
    if (typeof data === "object" && data !== null) {
      const messages: string[] = [];

      if ("message" in data) {
        if (typeof data.message === "string" && data.message.length > 0) {
          messages.push(data.message);
        } else if (Array.isArray(data.message)) {
          messages.push(
            ...data.message.filter(
              (message): message is string => typeof message === "string",
            ),
          );
        }
      }

      const issueLists = [
        "issues" in data && Array.isArray(data.issues) ? data.issues : [],
        "errors" in data && Array.isArray(data.errors) ? data.errors : [],
      ];

      for (const issues of issueLists) {
        for (const issue of issues) {
          if (
            typeof issue === "object" &&
            issue !== null &&
            "message" in issue &&
            typeof issue.message === "string"
          ) {
            messages.push(issue.message);
          }
        }
      }

      if (messages.length > 0) {
        return [...new Set(messages)].join(" ");
      }
    }
  }

  return error instanceof Error ? error.message : "Something went wrong.";
}
