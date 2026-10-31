import { ofetch } from "ofetch";
import { getAccessToken } from "@/lib/auth-token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
  onRequest({ options }) {
    if (!BASE_URL) {
      throw new Error("Set NEXT_PUBLIC_API_URL before calling the API.");
    }

    const token = getAccessToken();
    if (token) {
      const headers = new Headers(options.headers);
      headers.set("Authorization", `Bearer ${token}`);
      options.headers = headers;
    }
  },
});

export default apiClient;
