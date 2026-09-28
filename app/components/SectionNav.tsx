"use client";

import { useEffect, useRef, useState } from "react";

export type NavItem = { slug: string; num: string; title: string; optional?: boolean };
type Prog = Record<string, { done: number; total: number }>;

/** Which section is currently under the reading line near the top of the viewport. */
function useActiveSection(items: NavItem[]) {
  const [active, setActive] = useState(items[0]?.slug ?? "");
  const ticking = useRef(false);

  useEffect(() => {
    let settle: ReturnType<typeof setTimeout>;
    const compute = () => {
      ticking.current = false;
      const line = 160;
      // near the bottom of the page the last section wins, since it may be short
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 80) {
        setActive(items[items.length - 1].slug);
        return;
      }
      let current = items[0].slug;
      for (const it of items) {
        const el = document.getElementById(it.slug);
        if (el && el.getBoundingClientRect().top <= line) current = it.slug;
      }
      setActive(current);
    };
    const onScroll = () => {
      // a trailing recompute, so a final scroll that gets coalesced away
      // still settles on the right section
      clearTimeout(settle);
      settle = setTimeout(compute, 120);
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return active;
}

function Count({ p }: { p?: { done: number; total: number } }) {
  if (!p || p.total === 0) return null;
  const complete = p.done === p.total;
  return (
    <span
      className={
        "ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums " +
        (complete ? "bg-gold text-navy" : p.done > 0 ? "bg-bgBlue text-blue" : "text-muted")
      }
    >
      {p.done}/{p.total}
    </span>
  );
}

/** Vertical rail. Desktop and landscape tablet only. */
export function SideNav({ items, progress }: { items: NavItem[]; progress: Prog }) {
  const active = useActiveSection(items);
  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <div className="sticky top-8 pb-10">
        <p className="mb-3 pl-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          On this page
        </p>
        <ul className="relative border-l border-line">
          {items.map((it) => {
            const on = active === it.slug;
            return (
              <li key={it.slug} className="relative">
                {on && <span className="absolute -left-px top-0 h-full w-0.5 bg-gold" aria-hidden />}
                <a
                  href={"#" + it.slug}
                  aria-current={on ? "true" : undefined}
                  className={
                    "flex items-center gap-2 py-2 pl-3 pr-2 text-sm leading-snug transition " +
                    (on ? "font-medium text-navy" : "text-muted hover:text-navy")
                  }
                >
                  <span className={"shrink-0 text-[11px] tabular-nums " + (on ? "text-gold" : "text-line")}>
                    {it.num}
                  </span>
                  <span className="min-w-0">{it.title}</span>
                  <Count p={progress[it.slug]} />
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#tools"
          className="mt-3 block pl-3 text-sm text-muted transition hover:text-navy"
        >
          Tools &amp; Software
        </a>
      </div>
    </nav>
  );
}

/** Compact sticky bar showing where you are. Below lg, tap to open the full list. */
export function TopNav({
  items,
  progress,
  done,
  total,
}: {
  items: NavItem[];
  progress: Prog;
  done: number;
  total: number;
}) {
  const active = useActiveSection(items);
  const [open, setOpen] = useState(false);
  const current = items.find((i) => i.slug === active) ?? items[0];
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="sticky top-0 z-30 border-b border-line bg-cream/95 backdrop-blur lg:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-5 py-3 text-left sm:px-8"
      >
        <span className="text-xs tabular-nums text-gold">{current.num}</span>
        <span className="min-w-0 flex-1 truncate font-medium text-navy">{current.title}</span>
        <span className="whitespace-nowrap text-xs tabular-nums text-muted">
          {done}/{total}
        </span>
        <span aria-hidden className={"text-muted transition " + (open ? "rotate-180" : "")}>
          &#9662;
        </span>
      </button>

      <div className="px-5 pb-2 sm:px-8">
        <div className="h-1 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: pct + "%" }} />
        </div>
      </div>

      {open && (
        <ul className="border-t border-line bg-cream px-5 py-2 sm:px-8">
          {items.map((it) => {
            const on = active === it.slug;
            return (
              <li key={it.slug}>
                <a
                  href={"#" + it.slug}
                  onClick={() => setOpen(false)}
                  className={
                    "flex items-center gap-2.5 py-2.5 text-sm " + (on ? "font-medium text-navy" : "text-muted")
                  }
                >
                  <span className={"text-[11px] tabular-nums " + (on ? "text-gold" : "text-line")}>{it.num}</span>
                  <span className="min-w-0">{it.title}</span>
                  <Count p={progress[it.slug]} />
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#tools"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 py-2.5 text-sm text-muted"
            >
              <span className="text-[11px] text-line">&#9733;</span> Tools &amp; Software
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
