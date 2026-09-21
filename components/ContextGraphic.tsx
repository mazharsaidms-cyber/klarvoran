type GraphicVariant = "application" | "conversation" | "workshop" | "cooperation";

type ContextGraphicProps = {
  variant: GraphicVariant;
  title: string;
  className?: string;
};

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ApplicationGraphic() {
  return (
    <>
      <rect x="98" y="68" width="286" height="286" rx="24" fill="#ffffff" />
      <path d="M305 68h79v79" fill="#e4e6e9" />
      <path d="m305 68 79 79" {...line} stroke="#c5161d" />
      <path d="M154 164h154M154 208h174M154 252h114" {...line} stroke="#1b222e" />
      <rect x="154" y="288" width="118" height="22" rx="11" fill="#ec1c23" />
      <circle cx="430" cy="274" r="82" fill="#f4f5f6" stroke="#ffffff" strokeWidth="10" />
      <circle cx="416" cy="260" r="34" {...line} stroke="#1b222e" />
      <path d="m441 285 44 44" {...line} stroke="#c5161d" />
      <path d="m403 260 12 13 24-28" {...line} stroke="#c5161d" />
    </>
  );
}

function ConversationGraphic() {
  return (
    <>
      <rect x="72" y="78" width="320" height="154" rx="28" fill="#ffffff" />
      <path d="m136 232-44 48 84-48" fill="#ffffff" />
      <path d="M132 132h196M132 176h132" {...line} stroke="#1b222e" />
      <rect x="246" y="244" width="322" height="116" rx="28" fill="#f4f5f6" />
      <path d="m508 360 42 38-78-38" fill="#f4f5f6" />
      <path d="M302 292h202M302 330h126" {...line} stroke="#1b222e" />
      <circle cx="510" cy="126" r="54" fill="#ec1c23" />
      <path d="m484 126 18 19 35-39" {...line} stroke="#ffffff" />
    </>
  );
}

function WorkshopGraphic() {
  return (
    <>
      <rect x="76" y="54" width="488" height="304" rx="28" fill="#ffffff" />
      <rect x="116" y="98" width="118" height="88" rx="14" fill="#f4f5f6" />
      <rect x="260" y="98" width="118" height="88" rx="14" fill="#f4f5f6" />
      <rect x="404" y="98" width="118" height="88" rx="14" fill="#f4f5f6" />
      <path d="M144 132h62M144 158h38M288 132h62M288 158h42M432 132h62M432 158h34" {...line} stroke="#1b222e" />
      <path d="M158 238h324M158 278h232" {...line} stroke="#1b222e" />
      <rect x="158" y="308" width="164" height="18" rx="9" fill="#ec1c23" />
      <path d="M132 358v34M508 358v34" {...line} stroke="#ffffff" />
    </>
  );
}

function CooperationGraphic() {
  return (
    <>
      <path d="M320 210 148 112M320 210l172-98M320 210 148 326M320 210l172 116" {...line} stroke="#ffffff" />
      <rect x="228" y="150" width="184" height="120" rx="24" fill="#ffffff" />
      <path d="M270 194h100M270 228h64" {...line} stroke="#1b222e" />
      <rect x="74" y="60" width="148" height="102" rx="20" fill="#f4f5f6" />
      <rect x="418" y="60" width="148" height="102" rx="20" fill="#f4f5f6" />
      <rect x="74" y="276" width="148" height="102" rx="20" fill="#f4f5f6" />
      <rect x="418" y="276" width="148" height="102" rx="20" fill="#f4f5f6" />
      <path d="M112 103h72M456 103h72M112 319h72M456 319h72" {...line} stroke="#1b222e" />
      <circle cx="320" cy="210" r="22" fill="#ec1c23" />
      <path d="m310 210 8 9 15-18" {...line} stroke="#ffffff" strokeWidth="6" />
    </>
  );
}

export function ContextGraphic({ variant, title, className = "" }: ContextGraphicProps) {
  return (
    <div
      className={`context-graphic overflow-hidden rounded-[var(--radius-lg)] border border-white/15 bg-navy-700 ${className}`}
    >
      <svg
        viewBox="0 0 640 440"
        role="img"
        aria-label={title}
        className="h-auto w-full text-white"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect width="640" height="440" fill="#2d3543" />
        <path d="M0 402h640" stroke="#454e5f" strokeWidth="2" />
        <g className="context-graphic-content">
          {variant === "application" && <ApplicationGraphic />}
          {variant === "conversation" && <ConversationGraphic />}
          {variant === "workshop" && <WorkshopGraphic />}
          {variant === "cooperation" && <CooperationGraphic />}
        </g>
      </svg>
    </div>
  );
}
