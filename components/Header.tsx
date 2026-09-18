"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
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
    setOpen(false);
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
            priority
          />
          <Logo tone="dark" className="h-6 w-auto sm:h-7" />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`rounded-[var(--radius-sm)] px-2 py-1.5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none hover:bg-white hover:text-navy hover:underline hover:underline-offset-4 focus-visible:bg-white focus-visible:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    pathname === item.href
                      ? "bg-white/10 text-white underline underline-offset-4 font-semibold hover:bg-white hover:text-navy"
                      : "text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/termin" size="md" onDark>
            Erstgespräch anfragen
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] text-white lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
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
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile Navigation" className="border-t border-white/10 bg-navy lg:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {siteConfig.nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={closeMenu}
                  className={`block rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium transition-colors duration-200 focus-visible:bg-white focus-visible:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    pathname === item.href ? "bg-white/10 text-white font-bold" : "text-white/80 hover:bg-white hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button href="/termin" className="w-full" onDark onClick={closeMenu}>
                Erstgespräch anfragen
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
