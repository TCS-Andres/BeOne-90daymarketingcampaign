"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ES } from "./es";

export type Lang = "en" | "es";

const KEY = "b1-q4-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "es" || saved === "en") {
        setLangState(saved);
        return;
      }
      // first visit: follow the browser, since a lot of this room reads Spanish first
      if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es")) {
        setLangState("es");
      }
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (s: string) => {
      if (lang === "en" || !s) return s;
      return ES[s] ?? s; // untranslated strings fall back to English rather than breaking
    },
    [lang]
  );

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

/** The toggle itself. Rendered in the hero. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const opts: { id: Lang; label: string; full: string }[] = [
    { id: "en", label: "EN", full: "English" },
    { id: "es", label: "ES", full: "Español" },
  ];
  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={"inline-flex items-center rounded-full border border-cream/30 p-0.5 " + className}
    >
      {opts.map((o) => {
        const on = lang === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setLang(o.id)}
            aria-pressed={on}
            title={o.full}
            className={
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition " +
              (on ? "bg-gold text-navy" : "text-cream/70 hover:text-cream")
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
