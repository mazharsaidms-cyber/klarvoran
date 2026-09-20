/**
 * In-memory Rate-Limit-Schnittstelle. Ausreichend für eine einzelne Serverinstanz.
 * Für einen mehrinstanzigen Produktivbetrieb (z. B. mehrere Serverless-Instanzen)
 * hier durch einen geteilten Store ersetzen (z. B. Upstash Redis via REST-API) –
 * die Funktionssignatur bleibt dabei unverändert.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5_000;
const CLEANUP_INTERVAL_MS = 60_000;
let nextCleanupAt = 0;

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

function pruneBuckets(now: number) {
  if (now < nextCleanupAt && buckets.size < MAX_BUCKETS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  // Auch bei vielen wechselnden IP-Adressen bleibt der Speicherverbrauch
  // begrenzt. Map bewahrt die Einfügereihenfolge, daher fallen zuerst die
  // ältesten noch vorhandenen Buckets heraus.
  while (buckets.size >= MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value as string | undefined;
    if (!oldestKey) break;
    buckets.delete(oldestKey);
  }

  nextCleanupAt = now + CLEANUP_INTERVAL_MS;
}

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  pruneBuckets(now);
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
