import Image from "next/image";

export default function Logos({ height = 36, className = "" }: { height?: number; className?: string }) {
  const b1 = { w: Math.round((508 / 160) * height), h: height };
  const br = { w: Math.round((468 / 160) * height), h: height };
  return (
    <div className={"flex flex-wrap items-center gap-x-7 gap-y-3 " + className}>
      <Image src="/branches-logo.png" alt="Branches" width={br.w} height={br.h} priority />
      <span aria-hidden className="h-7 w-px bg-cream/25" />
      <Image src="/b1-logo.png" alt="B1, BE ONE" width={b1.w} height={b1.h} priority />
    </div>
  );
}
