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
      className={`rounded-[var(--radius-md)] border border-navy-100 bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-red/30 hover:shadow-card-hover motion-reduce:transition-none ${className}`}
    >
      {children}
    </Tag>
  );
}

export function FactStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-navy-100 bg-white px-5 py-4 text-center shadow-card transition-[border-color,box-shadow] duration-200 hover:border-red/30 hover:shadow-card-hover motion-reduce:transition-none">
      <div className="font-mono text-2xl font-bold text-navy sm:text-3xl">{value}</div>
      <div className="mt-1 text-sm text-navy-600">{label}</div>
    </div>
  );
}
