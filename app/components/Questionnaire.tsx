"use client";

import { useEffect, useMemo, useState } from "react";
import type { Field, Module } from "../lib/modules";

type Answers = Record<string, string | string[]>;

const OTHER = "__other__";

function isAnswered(f: Field, a: Answers): boolean {
  const v = a[f.id];
  if (f.type === "check") return Array.isArray(v) && v.length > 0;
  return typeof v === "string" && v.trim().length > 0;
}

function renderValue(f: Field, a: Answers): string {
  const v = a[f.id];
  let base = "";
  if (Array.isArray(v)) base = v.join(", ");
  else if (typeof v === "string") base = v;
  const other = a[f.id + OTHER];
  if (typeof other === "string" && other.trim()) {
    base = base ? base + ", " + other.trim() : other.trim();
  }
  let out = base.trim();
  const fu = "followUp" in f ? f.followUp : undefined;
  if (fu) {
    const fv = a[fu.id];
    if (typeof fv === "string" && fv.trim()) {
      out = out ? out + "\n   " + fv.trim() : fv.trim();
    }
  }
  return out || "(not answered)";
}

function stripMd(s: string) {
  return s.replace(/\*\*/g, "").trim();
}

export default function Questionnaire({
  module: m,
  onProgress,
}: {
  module: Module;
  onProgress?: (done: number, total: number) => void;
}) {
  const key = "b1-q4-" + m.slug;
  const fields = m.fields || [];
  const [answers, setAnswers] = useState<Answers>({});
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState<"idle" | "ok" | "err">("idle");
  const [hoverInfo, setHoverInfo] = useState<string | null>(null);
  const [pinnedInfo, setPinnedInfo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(key, JSON.stringify(answers));
    } catch {}
  }, [answers, key, loaded]);

  const done = useMemo(() => fields.filter((f) => isAnswered(f, answers)).length, [fields, answers]);

  useEffect(() => {
    if (loaded) onProgress?.(done, fields.length);
  }, [done, fields.length, loaded, onProgress]);

  function set(id: string, v: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: v }));
  }

  function toggle(id: string, opt: string) {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      return { ...prev, [id]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
    });
  }

  function answersBlock(): string {
    return fields
      .map((f) => {
        const label = stripMd(f.label);
        return `${label}\n   ${renderValue(f, answers).replace(/\n/g, "\n   ")}`;
      })
      .join("\n\n");
  }

  async function buildPrompt(): Promise<string> {
    const block = answersBlock();
    if (!m.promptFile) return block;
    try {
      const res = await fetch(m.promptFile);
      if (!res.ok) throw new Error("fetch failed");
      const md = await res.text();
      const i = md.indexOf("## INPUT");
      if (i === -1) throw new Error("no input marker");
      const headEnd = md.indexOf("\n", i);
      const rule = md.indexOf("\n---\n", headEnd);
      const next = md.indexOf("\n## ", headEnd);
      const cands = [rule, next].filter((n) => n !== -1);
      const j = cands.length ? Math.min(...cands) : -1;
      const head = md.slice(0, headEnd + 1);
      const tail = j === -1 ? "" : md.slice(j);
      return head + "\n" + block + "\n" + tail;
    } catch {
      return "MY ANSWERS\n\n" + block;
    }
  }

  async function copyPrompt() {
    const text = await buildPrompt();
    try {
      await navigator.clipboard.writeText(text);
      setCopied("ok");
    } catch {
      setCopied("err");
    }
    setTimeout(() => setCopied("idle"), 4000);
  }

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const W = 612, M = 54, maxW = W - M * 2;
    let y = M;

    const line = (txt: string, size: number, color: string, bold = false, gap = 6) => {
      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      const parts = doc.splitTextToSize(txt, maxW) as string[];
      for (const p of parts) {
        if (y > 720) { doc.addPage(); y = M; }
        doc.text(p, M, y);
        y += size + 2;
      }
      y += gap;
    };

    line("Module " + m.num + ": " + m.title, 18, "#16243D", true, 4);
    line("Build Your AI-Powered 90-Day Marketing Campaign  |  Branches B1", 9, "#5A6473", false, 4);
    line(new Date().toLocaleDateString(), 9, "#5A6473", false, 14);

    fields.forEach((f) => {
      line(stripMd(f.label), 10.5, "#2C5697", true, 3);
      line(renderValue(f, answers), 10.5, "#2B2B2B", false, 12);
    });

    if (y > 700) { doc.addPage(); y = M; }
    doc.setFontSize(8);
    doc.setTextColor("#5A6473");
    doc.setFont("helvetica", "normal");
    doc.text("The Creative Strategist  |  A Branches B1 Program", M, 745);

    doc.save("Module-" + m.num + "_" + m.slug + "_my-answers.pdf");
  }

  function clearAll() {
    if (!confirm("Clear your answers for this module? This cannot be undone.")) return;
    setAnswers({});
    try { localStorage.removeItem(key); } catch {}
  }

  if (fields.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-7 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
        <h4 className="font-semibold text-navy text-lg">Questionnaire</h4>
        <span className="text-xs text-muted">
          {done} of {fields.length} answered &middot; saves automatically on this device
        </span>
      </div>

      {m.note && <p className="mt-4 rounded-xl bg-bgBlue px-4 py-3 text-sm leading-relaxed text-navy">{m.note}</p>}

      <div className="mt-6 space-y-8">
        {fields.map((f) => (
          <div key={f.id}>
            <label className="block font-medium text-navy leading-snug">{stripMd(f.label)}</label>
            {f.help && <p className="mt-1 text-sm text-muted leading-relaxed">{f.help}</p>}

            {(f.type === "short" || f.type === "long") && (
              f.type === "long" ? (
                <textarea
                  rows={3}
                  value={(answers[f.id] as string) || ""}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.id, e.target.value)}
                  className="mt-3 w-full rounded-xl border border-line bg-cream px-3 py-2 text-ink outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                />
              ) : (
                <input
                  value={(answers[f.id] as string) || ""}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.id, e.target.value)}
                  className="mt-3 w-full rounded-xl border border-line bg-cream px-3 py-2 text-ink outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                />
              )
            )}

            {(f.type === "radio" || f.type === "check") && (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {f.options.map((opt) => {
                  const checked =
                    f.type === "check"
                      ? Array.isArray(answers[f.id]) && (answers[f.id] as string[]).includes(opt)
                      : answers[f.id] === opt;
                  const infoText = f.info?.[opt];
                  const infoKey = f.id + "::" + opt;
                  const infoPinned = pinnedInfo === infoKey;
                  const infoOpen = infoPinned || hoverInfo === infoKey;
                  return (
                    <div key={opt} className="sm:contents">
                      <div
                        className={
                          "rounded-xl border transition " +
                          (checked ? "border-blue bg-bgBlue" : "border-line bg-cream hover:border-blueLight")
                        }
                      >
                        <div className="flex items-start gap-2 px-3 py-2">
                          <label className={"flex flex-1 cursor-pointer items-start gap-2 text-sm " + (checked ? "text-navy" : "text-ink")}>
                            <input
                              type={f.type === "check" ? "checkbox" : "radio"}
                              name={f.id}
                              checked={checked}
                              onChange={() => (f.type === "check" ? toggle(f.id, opt) : set(f.id, opt))}
                              className="mt-0.5 accent-[#2C5697]"
                            />
                            <span>{opt}</span>
                          </label>
                          {infoText && (
                            <button
                              type="button"
                              aria-label={"What is " + opt + "?"}
                              aria-expanded={infoOpen}
                              onMouseEnter={() => setHoverInfo(infoKey)}
                              onMouseLeave={() => setHoverInfo(null)}
                              onFocus={() => setHoverInfo(infoKey)}
                              onBlur={() => setHoverInfo(null)}
                              onClick={(e) => {
                                e.preventDefault();
                                setPinnedInfo(infoPinned ? null : infoKey);
                              }}
                              className={
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition " +
                                (infoOpen ? "border-gold bg-gold text-navy" : "border-gold/60 text-gold hover:bg-gold hover:text-navy")
                              }
                            >
                              i
                            </button>
                          )}
                        </div>
                        {infoText && infoOpen && (
                          <p className="border-t border-gold/40 bg-white/70 px-3 py-2.5 text-[13px] leading-relaxed text-ink">
                            {infoText}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {(f.type === "radio" || f.type === "check") && f.allowOther && (
              <input
                value={(answers[f.id + OTHER] as string) || ""}
                placeholder="Other, in your own words"
                onChange={(e) => set(f.id + OTHER, e.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-cream px-3 py-2 text-ink outline-none focus:border-blue focus:ring-1 focus:ring-blue"
              />
            )}

            {(f.type === "radio" || f.type === "check") && f.followUp && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-navy">{f.followUp.label}</label>
                {f.followUp.help && <p className="mt-1 text-sm text-muted">{f.followUp.help}</p>}
                <textarea
                  rows={2}
                  value={(answers[f.followUp.id] as string) || ""}
                  onChange={(e) => set(f.followUp!.id, e.target.value)}
                  className="mt-2 w-full rounded-xl border border-line bg-cream px-3 py-2 text-ink outline-none focus:border-blue focus:ring-1 focus:ring-blue"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-line pt-5">
        {m.pasteHint && <p className="mb-3 text-sm text-muted">{m.pasteHint}</p>}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyPrompt}
            className="rounded-xl bg-blue px-5 py-2.5 font-medium text-white transition hover:bg-gold hover:text-navy"
          >
            {copied === "ok" ? "Copied. Now paste it into Claude." : copied === "err" ? "Copy blocked, use the PDF below" : "Copy my prompt"}
          </button>
          <button
            onClick={downloadPdf}
            className="rounded-xl border border-blue px-5 py-2.5 font-medium text-blue transition hover:bg-bgBlue"
          >
            Download my answers (PDF)
          </button>
          <button onClick={clearAll} className="rounded-xl px-4 py-2.5 text-sm text-muted transition hover:text-navy">
            Clear
          </button>
        </div>
        <p className="mt-3 text-xs text-muted">
          If the copy button does not bring your answers across, download the PDF and copy them from there. Both get you to the same place.
        </p>
      </div>
    </div>
  );
}
