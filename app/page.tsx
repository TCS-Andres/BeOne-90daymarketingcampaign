"use client";

import { useCallback, useMemo, useState } from "react";
import { MODULES, TOOLS } from "./lib/modules";
import ModuleSection from "./components/ModuleSection";

const NAV = MODULES.map((m) => ({ slug: m.slug, title: m.title }));

export default function Page() {
  const [prog, setProg] = useState<Record<string, { done: number; total: number }>>({});

  const onProgress = useCallback((slug: string, done: number, total: number) => {
    setProg((p) => (p[slug]?.done === done && p[slug]?.total === total ? p : { ...p, [slug]: { done, total } }));
  }, []);

  const { done, total, pct } = useMemo(() => {
    const vals = Object.values(prog);
    const d = vals.reduce((s, v) => s + v.done, 0);
    const t = vals.reduce((s, v) => s + v.total, 0);
    return { done: d, total: t, pct: t ? Math.round((d / t) * 100) : 0 };
  }, [prog]);

  return (
    <main>
      {/* Hero */}
      <header className="bg-navy text-cream">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Branches B1</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Build Your AI-Powered 90-Day Marketing Campaign for the Holidays
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/80">
            Come with your business. Leave with a complete 90-day holiday campaign ready to launch.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-cream/70">
            This page is the whole day. Work down it in order. Each module asks you some questions, then hands you
            a prompt to paste into Claude. By five o&apos;clock you will have your customer report, your dates, your
            message, three flyers, one video, and a dated calendar through December 31.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Your Q4 customer", "Your dates", "Your one message", "Three flyers", "One video"].map((b) => (
              <span key={b} className="rounded-full border border-gold/40 px-3.5 py-1.5 text-sm text-gold">
                {b}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#start-here" className="rounded-xl bg-gold px-6 py-3 font-medium text-navy transition hover:bg-cream">
              Start here
            </a>
            <a href="/files/Q4-2026_Moment-Menu.md" download className="rounded-xl border border-cream/30 px-6 py-3 font-medium text-cream transition hover:border-gold hover:text-gold">
              The Q4 Moment Menu
            </a>
          </div>
        </div>
      </header>

      {/* Sticky nav with progress */}
      <nav className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex items-center gap-4 overflow-x-auto py-3">
            {NAV.map((n) => (
              <a key={n.slug} href={"#" + n.slug} className="whitespace-nowrap text-sm text-muted transition hover:text-navy">
                {n.title}
              </a>
            ))}
          </div>
          <div className="pb-2.5">
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: pct + "%" }} />
              </div>
              <span className="whitespace-nowrap text-xs tabular-nums text-muted">
                {done} of {total} answered
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Modules */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {MODULES.map((m) => (
          <ModuleSection key={m.slug} module={m} onProgress={onProgress} />
        ))}

        {/* Tools */}
        <section id="tools" className="scroll-mt-24 border-t border-line py-14 sm:py-20">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl text-gold sm:text-3xl" aria-hidden>&#9733;</span>
            <h2 className="text-2xl font-semibold tracking-tight text-navy sm:text-4xl">Tools &amp; Software</h2>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink">
            Everything we use today. All free to start. Open an account and keep building after the workshop.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <div key={t.name} className="flex flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-navy">{t.name}</h3>
                  {t.free && (
                    <span className="rounded-full bg-cream px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold">
                      Free to start
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.blurb}</p>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-xl border border-blue px-4 py-2 text-sm text-blue transition hover:bg-bgBlue"
                >
                  Open <span aria-hidden>&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-line bg-navy py-12 text-cream">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="font-medium">The Creative Strategist &middot; A Branches B1 Program</p>
          <p className="mt-2 text-sm text-cream/60">
            Your answers save on this device only. Clearing your browser data clears them, so download your PDFs.
          </p>
          <a
            href="https://community.branchesb1.org/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-xl border border-cream/30 px-5 py-2.5 text-sm transition hover:border-gold hover:text-gold"
          >
            Back to B1
          </a>
        </div>
      </footer>
    </main>
  );
}
