import type { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "white" | "navy" | "tint";

const toneClasses: Record<Tone, string> = {
  white: "kv-section-paper text-navy",
  navy: "kv-section-navy text-white",
  tint: "kv-section-mist text-navy",
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
    default: "py-10 sm:py-12 lg:py-14",
    compact: "py-8 sm:py-9 lg:py-10",
    hero: "pt-8 pb-11 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14",
  };
  return (
    <section id={id} data-reveal-section={spacing !== "hero" ? "" : undefined} className={`${toneClasses[tone]} ${spacingClasses[spacing]} ${className}`}>
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
