"use client";

import { useState } from "react";
import { useLang } from "../lib/i18n";
import type { Module } from "../lib/modules";
import Questionnaire from "./Questionnaire";

export default function ModuleSection({
  module: m,
  onProgress,
}: {
  module: Module;
  onProgress?: (slug: string, done: number, total: number) => void;
}) {
  const { t } = useLang();
  const [openStuck, setOpenStuck] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <section
      id={m.slug}
      className={
        "scroll-mt-28 lg:scroll-mt-10 border-t border-line py-14 sm:py-20 " +
        (m.optional ? "-mx-5 rounded-2xl bg-bgGrey px-5 sm:-mx-8 sm:px-8" : "")
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-semibold text-gold text-2xl sm:text-3xl tabular-nums">{m.num}</span>
        <h2 className="font-semibold text-navy text-2xl sm:text-4xl tracking-tight">{t(m.title)}</h2>
        {m.optional && (
          <span className="rounded-full border border-gold bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold">
            {t(m.optionalLabel || "Optional")}
          </span>
        )}
      </div>

      <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-ink">{t(m.blurb)}</p>
      {m.time && <p className="mt-2 text-sm text-muted">{t(m.time)}</p>}

      {m.links && m.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {m.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-blue bg-bgBlue px-4 py-2 text-sm text-blue transition hover:border-gold hover:text-navy"
            >
              {t(l.label)} <span aria-hidden>&rarr;</span>
            </a>
          ))}
        </div>
      )}

      {m.files.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{t("Resources")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.files.map((f) => (
              <a
                key={f.href + f.label}
                href={f.href}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-sm text-blue transition hover:border-gold hover:text-navy"
              >
                <span aria-hidden>&#8595;</span>
                {t(f.label)}
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
                <span>{t(c)}</span>
              </label>
            </li>
          ))}
        </ol>
      )}

      <Questionnaire module={m} onProgress={m.optional ? undefined : (d, t) => onProgress?.(m.slug, d, t)} />

      {m.stuck && m.stuck.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/50 bg-cream">
          <button
            onClick={() => setOpenStuck((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-left font-medium text-navy"
          >
            <span>{t("Stuck? Three things that usually go wrong here")}</span>
            <span aria-hidden className="text-gold">{openStuck ? "−" : "+"}</span>
          </button>
          {openStuck && (
            <dl className="space-y-4 border-t border-gold/40 px-5 py-4">
              {m.stuck.map((s, i) => (
                <div key={i}>
                  <dt className="text-sm font-semibold text-navy">{t(s.q)}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink">{t(s.a)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}

      {m.tools && (
        <p className="mt-5 text-sm text-muted">
          {t("Tools used:")} <span className="text-navy">{m.tools.join(" · ")}</span>
        </p>
      )}
    </section>
  );
}
