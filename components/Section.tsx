import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "white" | "navy" | "tint";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-navy",
  navy: "bg-navy text-white",
  tint: "bg-navy-50 text-navy",
};

export function Section({
  children,
  className = "",
  tone = "white",
  id,
  containerClassName = "",
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  containerClassName?: string;
  spacing?: "default" | "compact" | "hero";
}) {
  const spacingClasses = {
    default: "py-16 sm:py-20 lg:py-24",
    compact: "py-10 sm:py-12 lg:py-14",
    hero: "pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24",
  };
  return (
    <section id={id} className={`${toneClasses[tone]} ${spacingClasses[spacing]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "navy" | "white" }) {
  const colors = {
    // text-red-700 (not text-red): red at small/regular weight fails WCAG AA
    // (~4.4:1) against white/tinted backgrounds. red-700 gives ~8:1.
    red: "text-red-700 bg-red/10",
    navy: "text-navy bg-navy-50",
    white: "text-white bg-white/10",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-full)] px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wide ${colors[tone]}`}
    >
      {children}
    </span>
  );
}
