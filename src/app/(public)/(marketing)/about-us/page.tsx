import {
  ArrowRight,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const principles = [
  { icon: HeartPulse, label: "Care comes first" },
  { icon: UsersRound, label: "People stay connected" },
  { icon: ShieldCheck, label: "Trust matters" },
];

export default function AboutUs() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-950 via-teal-900 to-cyan-950 text-white dark:from-black dark:via-slate-950 dark:to-teal-950">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-48 -z-10 size-[34rem] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-28 -z-10 size-[25rem] rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-32 -z-10 size-[30rem] rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="mx-auto grid min-h-[440px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
              <HeartHandshake aria-hidden="true" className="size-4" />
              About our platform
            </div>
            <h1 className="mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              Bringing people closer to{" "}
              <span className="text-teal-300">better care.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-teal-50/75 sm:text-lg">
              Healthcare works better when people are connected. We are building
              a simpler digital experience that helps patients and healthcare
              professionals move forward together.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-teal-900 transition hover:bg-teal-50"
              href="/register"
            >
              Be part of the journey
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="relative mx-auto flex min-h-64 w-full max-w-sm items-center justify-center">
            <div
              aria-hidden="true"
              className="absolute size-64 rounded-full border border-teal-200/20 sm:size-72"
            />
            <div
              aria-hidden="true"
              className="absolute size-48 rounded-full border border-dashed border-teal-200/30 sm:size-56"
            />
            <div className="relative flex size-36 items-center justify-center rounded-[2.25rem] border border-white/15 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-sm sm:size-40">
              <HeartPulse
                aria-hidden="true"
                className="size-20 text-teal-200"
                strokeWidth={1.5}
              />
              <span className="absolute -bottom-4 -right-4 flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-teal-700 text-white shadow-xl">
                <UsersRound aria-hidden="true" className="size-6" />
              </span>
            </div>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-teal-200/80">
              Care is better together
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-3 sm:p-8">
          {principles.map(({ icon: Icon, label }) => (
            <div className="flex items-center gap-4" key={label}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
