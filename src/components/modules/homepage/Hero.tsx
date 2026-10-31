import {
  ArrowRight,
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 -z-10 size-[30rem] rounded-full bg-teal-200/30 blur-3xl"
      />
      <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm">
            <span className="size-2 rounded-full bg-teal-500" />
            Care, connected
          </span>
          <h1 className="mt-7 text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            A healthier journey starts with{" "}
            <span className="text-teal-700">better connection.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            A simpler way for patients and healthcare professionals to stay
            connected and take the next step in care with confidence.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/15 transition hover:bg-teal-800"
              href="/register"
            >
              Get started
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-800"
              href="/about-us"
            >
              Discover our mission
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="size-4 text-teal-700"
              />
              A more connected experience
            </span>
            <span className="inline-flex items-center gap-2">
              <HeartPulse aria-hidden="true" className="size-4 text-teal-700" />
              Built around better care
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[340px] w-full max-w-lg items-center justify-center sm:min-h-[410px]">
          <div
            aria-hidden="true"
            className="absolute size-[min(78vw,350px)] rounded-full border border-teal-200/70"
          />
          <div
            aria-hidden="true"
            className="absolute size-[min(58vw,260px)] rounded-full border border-dashed border-teal-300/70"
          />
          <div className="relative flex size-40 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-2xl shadow-teal-900/25 sm:size-48">
            <HeartPulse
              aria-hidden="true"
              className="size-20 sm:size-24"
              strokeWidth={1.5}
            />
            <span className="absolute -right-3 -top-3 flex size-12 items-center justify-center rounded-2xl border-4 border-white bg-emerald-500 shadow-lg">
              <ShieldCheck aria-hidden="true" className="size-5 text-white" />
            </span>
          </div>

          <div className="absolute left-0 top-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 sm:left-2 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <CalendarDays aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Your care journey
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">
                  Starts here
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 sm:right-2 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Stethoscope aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Patients & professionals
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">
                  Connected in care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
