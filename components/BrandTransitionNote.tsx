import { siteConfig } from "@/lib/site-config";

export function BrandTransitionNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm leading-relaxed text-navy-600 ${className}`}>
      {siteConfig.transitionNote}
    </p>
  );
}
