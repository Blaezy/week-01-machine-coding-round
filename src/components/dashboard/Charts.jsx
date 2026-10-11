import { CAT_CLASS, cx } from "../../utils/styles";

export function WeeklyChart({ stats }) {
  const bars = [
    { name: "DSA", cat: "dsa", ...stats.dsa },
    { name: "Git & GitHub", cat: "git", ...stats.git },
    { name: "Full-Stack", cat: "technical", ...stats.technical },
    { name: "Machine Coding", cat: "machine", ...stats.machine },
  ];
  const max = Math.max(4, ...bars.map((b) => b.total));
  const ticks = [max, Math.round(max / 2), 0];

  return (
    <div className="grid h-[220px] grid-cols-[28px_1fr] gap-2">
      <div className="flex flex-col justify-between pb-[46px] text-right text-[0.78rem] text-muted">
        {ticks.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <div className="flex items-stretch justify-around gap-3 border-b">
        {bars.map((b) => (
          <div className={cx("grid max-w-[110px] flex-1 grid-rows-[1fr_auto_auto] justify-items-center", CAT_CLASS[b.cat])} key={b.name}>
            <div className="flex w-full max-w-[54px] items-end" role="img" aria-label={`${b.name}: ${b.done} of ${b.total} completed`}>
              <div className="flex min-h-1 w-full items-end overflow-hidden rounded-t-lg bg-cat/18" style={{ height: `${(b.total / max) * 100}%` }}>
                <div className="w-full bg-cat" style={{ height: `${b.total ? (b.done / b.total) * 100 : 0}%` }} />
              </div>
            </div>
            <span className="mt-1.5 text-center text-[0.78rem] font-semibold">{b.name}</span>
            <span className="text-[0.86rem] text-muted">
              {b.done}/{b.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityChart({ days }) {
  const max = Math.max(3, ...days.map((d) => d.count));
  return (
    <div className={cx("grid grid-cols-7 gap-1 sm:gap-2.5", CAT_CLASS.dsa)}>
      {days.map((d) => (
        <div className="grid grid-rows-[150px_auto_auto] justify-items-center" key={d.label}>
          <div
            className="flex w-full max-w-10 items-end border-b"
            role="img"
            aria-label={`${d.label}: ${d.count} completed${d.isToday ? " (today)" : ""}`}
          >
            <div
              className={cx("min-h-1 w-full rounded-t-md", d.count === 0 ? "bg-idle opacity-60" : "bg-cat")}
              style={{ height: `${Math.max(d.count / max, 0.03) * 100}%` }}
            />
          </div>
          <span className={cx("mt-1.5 text-center text-[0.78rem] font-semibold", d.isToday && "text-cat")}>{d.label}</span>
          <span className="text-[0.86rem] text-muted">{d.count}</span>
        </div>
      ))}
    </div>
  );
}

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Donut({ stats }) {
  const parts = [
    { label: "Completed", value: stats.done, color: "var(--ok)" },
    { label: "In Progress", value: stats.active, color: "var(--warn)" },
    { label: "Pending", value: stats.pending, color: "var(--idle)" },
  ];
  let offset = 0;
  return (
    <div className="flex flex-wrap items-center justify-center gap-[22px]">
      <div className="relative size-[150px]">
        <svg className="h-full w-full" viewBox="0 0 150 150" role="img" aria-label={`${stats.done} of ${stats.total} completed`}>
          <circle cx="75" cy="75" r={RADIUS} fill="none" stroke="var(--surface-2)" strokeWidth="16" />
          {stats.total > 0 &&
            parts.map((p) => {
              const length = (p.value / stats.total) * CIRCUMFERENCE;
              const arc = p.value > 0 && (
                <circle
                  key={p.label}
                  cx="75"
                  cy="75"
                  r={RADIUS}
                  fill="none"
                  stroke={p.color}
                  strokeWidth="16"
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 75 75)"
                />
              );
              offset += length;
              return arc;
            })}
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <strong className="font-heading text-2xl font-extrabold leading-[1.1]">
            {stats.done} / {stats.total}
          </strong>
          <span className="text-[0.78rem] text-muted">Completed</span>
        </div>
      </div>
      <ul className="grid min-w-[140px] gap-2.5">
        {parts.map((p) => (
          <li className="flex items-center gap-2.5 text-[0.9rem]" key={p.label}>
            <span className="size-2.5 rounded-full" style={{ background: p.color }} aria-hidden="true" />
            <span className="flex-1 text-muted">{p.label}</span>
            <strong>{p.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
