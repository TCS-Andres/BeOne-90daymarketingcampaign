import type { Metadata } from "next";
import { DM_Sans, Quicksand } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/i18n";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-sans" });
const quicksand = Quicksand({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Build Your AI-Powered 90-Day Marketing Campaign | Branches B1",
  description:
    "Your workshop hub. Build a complete 90-day holiday marketing campaign for your business, one module at a time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${quicksand.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
