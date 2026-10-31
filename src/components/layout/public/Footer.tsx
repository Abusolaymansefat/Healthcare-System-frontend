import { ArrowRight, HeartPulse } from "lucide-react";
import Link from "next/link";

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
];

const accountLinks = [
  { name: "Sign in", path: "/login" },
  { name: "Create an account", path: "/register" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-slate-950 text-slate-300">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/70 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_0.7fr_0.7fr] md:gap-16">
          <div className="max-w-md">
            <Link
              aria-label="Healthcare System home"
              className="inline-flex items-center gap-3 text-white"
              href="/"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-teal-600 text-white">
                <HeartPulse aria-hidden="true" className="size-6" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Healthcare System
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A connected care experience designed to make it easier for
              patients and healthcare professionals to take the next step.
            </p>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition hover:text-white"
              href="/register"
            >
              Join the platform
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <nav aria-label="Explore" className="flex flex-col items-start gap-4">
            <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Explore
            </h2>
            {exploreLinks.map((link) => (
              <Link
                className="text-sm text-slate-400 transition hover:text-teal-300"
                href={link.path}
                key={link.path}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <nav
            aria-label="Your account"
            className="flex flex-col items-start gap-4"
          >
            <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
              Your account
            </h2>
            {accountLinks.map((link) => (
              <Link
                className="text-sm text-slate-400 transition hover:text-teal-300"
                href={link.path}
                key={link.path}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© Healthcare System. All rights reserved.</p>
          <p>Care that keeps everyone connected.</p>
        </div>
      </div>
    </footer>
  );
}
