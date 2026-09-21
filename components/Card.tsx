import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={`content-card min-w-0 rounded-[var(--radius-md)] border border-navy-100 bg-white p-6 shadow-card ${className}`}
    >
      {children}
    </Tag>
  );
}

export function FactStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 rounded-[var(--radius-md)] border border-navy-100 bg-white px-3 py-4 text-center shadow-card sm:px-5">
      <div className="font-mono text-lg font-bold text-navy sm:text-xl lg:text-2xl">{value}</div>
      <div className="mt-1 text-sm text-navy-600">{label}</div>
    </div>
  );
}
