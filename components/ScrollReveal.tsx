"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: HTML is visible before JS and the hero never waits. */
export function ScrollReveal() {
  const pathname = usePathname();
  const publicPage = !pathname.startsWith("/teilnehmer") && pathname !== "/coach" && pathname !== "/zugang" && pathname !== "/impressum" && pathname !== "/datenschutz";

  useEffect(() => {
    if (!publicPage) return;
    const progress = document.querySelector<HTMLElement>(".kv-scroll-progress");
    if (!progress) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      progress.style.transform = `scaleX(${fraction})`;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [publicPage, pathname]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!publicPage || preference.matches || !("IntersectionObserver" in window)) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main [data-reveal-section]"));
    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target as HTMLElement;
        section.dataset.sectionVisible = "";
        sectionObserver.unobserve(section);
      }
    }, { rootMargin: "0px 0px -80px 0px" });
    for (const section of sections) sectionObserver.observe(section);

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
      const stagger = element.hasAttribute("data-reveal") ? Math.min(siblings.indexOf(element), 3) * 100 : 0;
      element.style.setProperty("--reveal-delay", `${stagger}ms`);
      element.dataset.revealState = "pending";
      observer.observe(element);
    }

    const stop = () => {
      observer.disconnect();
      sectionObserver.disconnect();
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
  }, [pathname, publicPage]);

  return publicPage ? <div className="kv-scroll-progress" aria-hidden="true" /> : null;
}
