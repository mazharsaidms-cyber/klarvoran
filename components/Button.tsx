import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "text";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /**
   * Kennzeichnet einen Button auf dunkelblauer Fläche (tone="navy").
   * Steuert die Hover-Regeln nach Kundenvorgabe:
   * - Primary auf hell: #C5161D → hover #1B222E (Schrift bleibt weiß).
   * - Primary auf dunkel: #C5161D → hover weiß mit Navy-Schrift und rotem Rand.
   * - Secondary/Text auf dunkel: transparent/weiß → hover weiß mit Navy-Schrift.
   */
  onDark?: boolean;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] font-semibold transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-red disabled:opacity-50 disabled:pointer-events-none";

// Border-2 ist auch bei Varianten ohne sichtbaren Rand fix gesetzt, damit
// Abmessungen und Randstärke beim Hover-Wechsel nicht springen.
const variants: Record<Variant, { light: string; dark: string }> = {
  primary: {
    light: "bg-btn-red text-white border-2 border-btn-red hover:bg-navy hover:border-navy focus-visible:bg-navy focus-visible:border-navy shadow-card",
    dark: "bg-btn-red text-white border-2 border-btn-red hover:bg-white hover:text-navy hover:border-btn-red focus-visible:bg-white focus-visible:text-navy focus-visible:border-btn-red shadow-card",
  },
  secondary: {
    light: "border-2 border-navy bg-white text-navy hover:bg-navy hover:text-white focus-visible:bg-navy focus-visible:text-white",
    dark: "border-2 border-white text-white hover:bg-white hover:text-navy focus-visible:bg-white focus-visible:text-navy",
  },
  ghost: {
    light: "border-2 border-navy text-navy hover:bg-navy-50 focus-visible:bg-navy-50",
    dark: "border-2 border-white text-white hover:bg-white hover:text-navy focus-visible:bg-white focus-visible:text-navy",
  },
  text: {
    light: "text-navy underline underline-offset-4 decoration-navy-100 hover:text-btn-red hover:decoration-btn-red focus-visible:text-btn-red focus-visible:decoration-btn-red px-0",
    dark: "text-white underline underline-offset-4 decoration-white/50 hover:text-white hover:decoration-white focus-visible:text-white focus-visible:decoration-white px-0",
  },
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", onDark = false, children } = props;
  const classes = `${base} ${variants[variant][onDark ? "dark" : "light"]} ${
    variant === "text" ? "" : sizes[size]
  }`;

  if ("href" in props && props.href) {
    const {
      href,
      external,
      className,
      variant: _variant,
      size: _size,
      onDark: _onDark,
      ...rest
    } = props as ButtonAsLink;
    const linkClasses = `${classes} ${className ?? ""}`;
    if (external) {
      return (
        <a href={href} className={linkClasses} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={linkClasses} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  const {
    className,
    variant: _variant,
    size: _size,
    onDark: _onDark,
    ...rest
  } = props as ButtonAsButton;
  return (
    <button className={`${classes} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
