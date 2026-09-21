"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: HTML is visible before JS and the hero never waits. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window) || pathname === "/impressum" || pathname === "/datenschutz") return;

    const candidates = Array.from(document.querySelectorAll<HTMLElement>(
      "main [data-reveal], main [data-reveal-section] > div > :not(:has([data-reveal]))",
    ));
    const targets = candidates.filter((element) =>
      !element.closest(".kv-hero, form") &&
      !element.querySelector("form, input, select, textarea") &&
      !["SCRIPT", "STYLE"].includes(element.tagName) &&
      element.getBoundingClientRect().top >= window.innerHeight,
    );

    const reveal = (element: HTMLElement) => {
      element.dataset.revealState = "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    for (const element of targets) {
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const stagger = element.hasAttribute("data-reveal") ? Math.min(siblings.indexOf(element), 3) * 65 : 0;
      element.style.setProperty("--reveal-delay", `${stagger}ms`);
      element.dataset.revealState = "pending";
      observer.observe(element);
    }

    const stop = () => {
      observer.disconnect();
      for (const element of targets) {
        delete element.dataset.revealState;
        element.style.removeProperty("--reveal-delay");
      }
    };
    const onPreferenceChange = () => { if (preference.matches) stop(); };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-reveal-state="pending"]');
      if (element) {
        element.style.setProperty("--reveal-delay", "0ms");
        reveal(element);
      }
    };
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("focusin", onFocus);
    return () => {
      stop();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  return null;
}
