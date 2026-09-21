import type { ReactNode } from "react";

export type IconName =
  | "orientation"
  | "system"
  | "action"
  | "jobcenter"
  | "social"
  | "provider"
  | "municipality"
  | "quality"
  | "respect"
  | "responsibility"
  | "progress"
  | "conversation"
  | "signpost"
  | "laptop"
  | "calendar"
  | "document"
  | "send";

const paths: Record<IconName, ReactNode> = {
  orientation: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2.3 4.7-4.7 2.3 2.3-4.7 4.7-2.3Z" /></>,
  system: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  action: <><path d="M4 19h5v-4h5v-4h6V5" /><path d="m16.5 8.5 3.5-3.5 3.5 3.5" /></>,
  jobcenter: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 5V3h8v2M8 11h8M8 15h5" /></>,
  social: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 20v-2a5.5 5.5 0 0 1 11 0v2M15 15.5a4 4 0 0 1 6 3.5v1" /></>,
  provider: <><rect x="3" y="4" width="8" height="7" rx="1" /><rect x="13" y="13" width="8" height="7" rx="1" /><path d="M11 7h4a2 2 0 0 1 2 2v4M13 17H9a2 2 0 0 1-2-2v-4" /></>,
  municipality: <><path d="m3 10 9-6 9 6M5 10v10h14V10M9 20v-6h6v6M3 20h18" /></>,
  quality: <><path d="m12 2 8 3v6c0 5-3.2 8.3-8 11-4.8-2.7-8-6-8-11V5l8-3Z" /><path d="m8.5 11.5 2.3 2.3 4.7-5" /></>,
  respect: <><path d="M3 11V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2v-4Z" /><path d="M8 9h8M8 12h5" /></>,
  responsibility: <><path d="M4 20h16M6 20v-7h5v7M14 20V9h5v11M9 7l3-3 3 3" /></>,
  progress: <><path d="M4 18h5v-4h5v-4h6V5" /><path d="m16 8 4-3 2 4" /></>,
  conversation: <><path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" /><path d="M8 9h8M8 12h5" /></>,
  signpost: <><path d="M6 21V3M6 5h12l-3 3 3 3H6M6 14h9l-2.5 3L15 20H6" /></>,
  laptop: <><rect x="4" y="4" width="16" height="12" rx="1" /><path d="M2 20h20M8 9h8M8 12h5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M8 15h3" /></>,
  document: <><path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M15 3v5h4M8 12h8M8 16h6" /></>,
  send: <><path d="m3 11 18-8-8 18-2.5-7.5L3 11ZM10.5 13.5 21 3" /></>,
};

export function VisualIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
