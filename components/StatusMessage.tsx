import type { ActionState } from "@/lib/server/action-state";

const toneClasses: Record<ActionState["status"], string> = {
  idle: "hidden",
  success: "border-navy/20 bg-navy-50 text-navy",
  "dev-success": "border-amber-300 bg-amber-50 text-amber-900",
  error: "border-red/30 bg-red/5 text-red-700",
  "rate-limited": "border-red/30 bg-red/5 text-red-700",
};

export function StatusMessage({ state }: { state: ActionState }) {
  if (state.status === "idle") return null;
  const isError = state.status === "error" || state.status === "rate-limited";
  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`rounded-[var(--radius-md)] border px-4 py-3 text-sm leading-relaxed ${toneClasses[state.status]}`}
    >
      {state.message}
    </div>
  );
}
