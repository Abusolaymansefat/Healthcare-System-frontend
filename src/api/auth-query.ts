import { getCurrentUser } from "@/api/auth";

export const authQueryKeys = {
  me: ["auth", "me"] as const,
};

export const currentUserQuery = {
  queryKey: authQueryKeys.me,
  queryFn: getCurrentUser,
  retry: false,
};
