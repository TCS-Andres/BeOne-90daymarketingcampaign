"use client";

import { useState } from "react";
import type { Module } from "../lib/modules";
import Questionnaire from "./Questionnaire";

export default function ModuleSection({
  module: m,
  onProgress,
}: {
  module: Module;
  onProgress?: (slug: string, done: number, total: number) => void;
}) {
  const [openStuck, setOpenStuck] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <section id={m.slug} className="scroll-mt-24 border-t border-line py-14 sm:py-20">
      <div className="flex items-baseline gap-4">
        <span className="font-semibold text-gold text-2xl sm:text-3xl tabular-nums">{m.num}</span>
        <h2 className="font-semibold text-navy text-2xl sm:text-4xl tracking-tight">{m.title}</h2>
      </div>

      <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-ink">{m.blurb}</p>
      {m.time && <p className="mt-2 text-sm text-muted">{m.time}</p>}

      {m.files.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Resources</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.files.map((f) => (
              <a
                key={f.href + f.label}
                href={f.href}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-sm text-blue transition hover:border-gold hover:text-navy"
              >
                <span aria-hidden>&#8595;</span>
                {f.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {m.checklist && (
        <ol className="mt-8 space-y-2">
          {m.checklist.map((c, i) => (
            <li key={i}>
              <label
                className={
                  "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition " +
                  (checked[i] ? "border-gold bg-cream text-muted line-through" : "border-line bg-white text-ink hover:border-blueLight")
                }
              >
                <input
                  type="checkbox"
                  checked={!!checked[i]}
                  onChange={() => setChecked((p) => ({ ...p, [i]: !p[i] }))}
                  className="mt-0.5 accent-[#C8A24B]"
                />
                <span>{c}</span>
              </label>
            </li>
          ))}
        </ol>
      )}

      <Questionnaire module={m} onProgress={(d, t) => onProgress?.(m.slug, d, t)} />

      {m.stuck && m.stuck.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/50 bg-cream">
          <button
            onClick={() => setOpenStuck((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-left font-medium text-navy"
          >
            <span>Stuck? Three things that usually go wrong here</span>
            <span aria-hidden className="text-gold">{openStuck ? "−" : "+"}</span>
          </button>
          {openStuck && (
            <dl className="space-y-4 border-t border-gold/40 px-5 py-4">
              {m.stuck.map((s, i) => (
                <div key={i}>
                  <dt className="text-sm font-semibold text-navy">{s.q}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink">{s.a}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {m.tools && (
        <p className="mt-5 text-sm text-muted">
          Tools used: <span className="text-navy">{m.tools.join(" · ")}</span>
        </p>
      )}
    </section>
  );
}
