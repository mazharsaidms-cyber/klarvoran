"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function Header() {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openPathname === pathname;
  const institutionalPage = pathname === "/fachkraefte-kooperationspartner" || pathname.startsWith("/fuer-");
  const workshopPage = pathname === "/leistungen/workshops";
  const ctaHref = institutionalPage || workshopPage ? `${pathname}#anfrage` : "/termin";
  const ctaLabel = workshopPage ? "Workshop anfragen" : pathname === "/fuer-jobcenter" ? "Teilnahme abstimmen" : institutionalPage ? "Kooperation anfragen" : "Erstgespräch anfragen";

  function isActive(href: string) {
    if (href === "/fachkraefte-kooperationspartner") return institutionalPage;
    if (href === "/leistungen") return pathname.startsWith("/leistungen");
    return pathname === href;
  }
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpenPathname(null);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) firstMobileLinkRef.current?.focus();
  }, [open]);

  function closeMenu() {
    setOpenPathname(null);
    menuButtonRef.current?.focus();
  }

  return (
    // Durchgehend dunkelblauer Header (Kundenvorgabe) – performant, SSR-stabil,
    // ohne Scroll-Listener. Bleibt auch auf hellen Leseseiten lesbar.
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-[var(--radius-sm)]"
        >
          <Image
            src={siteConfig.images.badge}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-white p-0.5"
          />
          <Logo tone="dark" className="h-6 w-auto sm:h-7" />
        </Link>

        <div className="hidden lg:block">
          <Button href={ctaHref} size="md" onDark>
            {ctaLabel}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-2 text-sm font-semibold text-white lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpenPathname(open ? null : pathname)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
          <span>Menü</span>
        </button>
      </div>

      <nav aria-label="Hauptnavigation" className="hidden border-t border-white/10 lg:block">
        <ul className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? (pathname === item.href ? "page" : "location") : undefined}
                className={`header-nav-link ${isActive(item.href) ? "header-nav-active" : ""} ${item.href === "/avgs" ? "font-bold" : "font-medium"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Schnellzugriff" className="border-t border-white/10 lg:hidden">
        <ul className="mx-auto flex max-w-6xl items-center justify-between gap-1 px-5 sm:px-6">
          {siteConfig.nav.filter((item) => ["/avgs", "/leistungen", "/fachkraefte-kooperationspartner", "/kontakt"].includes(item.href)).map((item) => (
            <li key={item.href} className={item.href === "/fachkraefte-kooperationspartner" ? "hidden sm:block" : undefined}>
              <Link
                href={item.href}
                onClick={() => setOpenPathname(null)}
                aria-current={isActive(item.href) ? (pathname === item.href ? "page" : "location") : undefined}
                className={`header-nav-link ${isActive(item.href) ? "header-nav-active" : ""} ${item.href === "/avgs" ? "font-bold" : "font-medium"}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <noscript>
        <nav aria-label="Navigation ohne JavaScript" className="border-t border-white/10 px-5 py-3 lg:hidden">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile Navigation" className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto border-t border-white/10 bg-navy lg:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {siteConfig.nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  aria-current={isActive(item.href) ? (pathname === item.href ? "page" : "location") : undefined}
                  onClick={closeMenu}
                  className={`block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium transition-colors duration-200 focus-visible:bg-white focus-visible:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive(item.href) ? "bg-white/10 text-white font-bold" : "text-white/80 hover:bg-white hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button href={ctaHref} className="w-full" onDark onClick={closeMenu}>
                {ctaLabel}
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
