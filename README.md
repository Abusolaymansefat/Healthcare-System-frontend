This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Authentication API

Authentication screens use TanStack Form and the shared shadcn UI components. Set
`NEXT_PUBLIC_API_URL` to the backend origin (for example,
`http://localhost:5000`). Auth requests use the `/api/v1/auth` prefix exposed by
the Express router:

| Method | Path | Request |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | `{ "name", "email", "password" }` |
| `POST` | `/api/v1/auth/login` | `{ "email", "password" }` |
| `POST` | `/api/v1/auth/forget-password` | `{ "email" }` (sends a password reset OTP) |
| `POST` | `/api/v1/auth/reset-password` | `{ "email", "otp", "newPassword" }` |
| `POST` | `/api/v1/auth/verify-email` | `{ "email", "otp" }` (6-digit string) |
| `GET` | `/api/v1/auth/me` | Authenticated user |
| `POST` | `/api/v1/auth/refresh-token` | Refresh the session |
| `POST` | `/api/v1/auth/google` | Google ID token in `credential`, `idToken`, and `token` |

The backend should set refresh credentials using an HttpOnly cookie. Login and
refresh responses may also include an `accessToken` (or `token`) and an optional
`user` object for in-memory Bearer authentication. `/auth/me` should return the
user object directly or as `{ "user": { "email": "..." } }`. After requesting a
password reset OTP, users can enter it at `/reset-password?email=...`. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
to your Google OAuth client ID to enable the Google Identity Services button.
For cookie-based sessions, configure the backend to allow credentialed CORS from
the frontend origin.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
