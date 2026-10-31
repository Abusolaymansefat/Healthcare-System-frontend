import { ArrowRight, HeartPulse, Menu, ShieldCheck } from "lucide-react";
import Link from "next/link";

const routes = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="bg-teal-800 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
          <ShieldCheck
            aria-hidden="true"
            className="size-4 shrink-0 text-teal-200"
          />
          <span>
            Better care starts with a more connected healthcare experience.
          </span>
        </div>
      </div>

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          aria-label="Healthcare System home"
          className="flex min-w-0 items-center gap-3"
          href="/"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-900/15">
            <HeartPulse aria-hidden="true" className="size-6" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
              Healthcare System
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:block">
              Connected care platform
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {routes.map((route) => (
            <Link
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-teal-700"
              href={route.path}
              key={route.path}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-teal-800"
            href="/login"
          >
            Sign in
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition hover:bg-teal-800"
            href="/register"
          >
            Get started
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <details className="group relative md:hidden">
          <summary
            aria-label="Open navigation menu"
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 [&::-webkit-details-marker]:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {routes.map((route) => (
                <Link
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
                  href={route.path}
                  key={route.path}
                >
                  {route.name}
                </Link>
              ))}
              <div className="my-2 border-t border-slate-100" />
              <Link
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
                href="/login"
              >
                Sign in
              </Link>
              <Link
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                href="/register"
              >
                Get started
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}