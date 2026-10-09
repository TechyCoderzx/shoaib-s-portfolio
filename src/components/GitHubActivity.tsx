import { useEffect, useMemo, useState } from "react";

const USER = "TechyCoderzx";
const DAYS = 84; // GitHub's public events API only covers ~90 days
const REFRESH_MS = 7 * 60 * 1000;
const COUNTED = new Set([
  "PushEvent",
  "CreateEvent",
  "PullRequestEvent",
  "IssuesEvent",
  "IssueCommentEvent",
  "PullRequestReviewEvent",
  "ReleaseEvent",
]);

type GhEvent = { type: string; created_at: string; payload?: { size?: number; commits?: unknown[] } };

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

async function fetchCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://api.github.com/users/${USER}/events/public?per_page=100&page=${page}`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const events: GhEvent[] = await res.json();
    for (const e of events) {
      if (!COUNTED.has(e.type)) continue;
      const n =
        e.type === "PushEvent"
          ? Math.max(1, e.payload?.size ?? e.payload?.commits?.length ?? 1)
          : 1;
      const k = dayKey(new Date(e.created_at));
      counts[k] = (counts[k] ?? 0) + n;
    }
    if (events.length < 100) break;
  }
  return counts;
}

export function GitHubActivity() {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchCounts()
        .then((c) => {
          if (!alive) return;
          setCounts(c);
          setFailed(false);
        })
        .catch(() => alive && setFailed(true)); // keep last good data
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: DAYS }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (DAYS - 1 - i));
      return d;
    });
  }, []);

  const fmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="gh-activity">
      <div className="status-label gh-live">
        <span className="status-dot" /> Live activity
      </div>
      <div className="contribution-placeholder" role="list" aria-label="GitHub activity, last 12 weeks">
        {days.map((d) => {
          const n = counts?.[dayKey(d)] ?? 0;
          const level = n === 0 ? "" : n >= 6 ? "hot" : n >= 3 ? "warm2" : "warm";
          const label = `${fmt.format(d)}\n${n === 0 ? "No activity" : `${n} ${n === 1 ? "activity" : "activities"}`}`;
          return (
            <i key={dayKey(d)} role="listitem" className={level} data-tip={label} title={label} aria-label={label.replace("\n", ", ")} />
          );
        })}
      </div>
      <p className="gh-note">
        {counts === null && !failed
          ? "Loading GitHub activity…"
          : counts === null && failed
            ? "GitHub is unavailable right now — activity will appear once it responds."
            : "Last 12 weeks · GitHub's public feed covers roughly 90 days."}
      </p>
    </div>
  );
}
