import { CATEGORIES } from "../data/constants";

const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;

export default function Progress({ questions }) {
  const total = questions.length;
  const done = questions.filter((x) => x.status === "Completed").length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="card progress" aria-label="Progress">
      <div className="ring-wrap">
        <svg viewBox="0 0 120 120" className="ring" role="img" aria-label={`${percent}% complete`}>
          <circle cx="60" cy="60" r={RADIUS} className="ring-track" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            className="ring-fill"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - percent / 100)}
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="ring-label">
          <strong>{percent}%</strong>
          <span>complete</span>
        </div>
      </div>

      <div className="progress-bars">
        <h2>Progress</h2>
        <p className="muted">
          {done} of {total} questions completed
        </p>
        {CATEGORIES.map((cat) => {
          const items = questions.filter((x) => x.category === cat);
          const completed = items.filter((x) => x.status === "Completed").length;
          const pct = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);
          return (
            <div className="bar-row" key={cat}>
              <div className="bar-head">
                <span>{cat}</span>
                <span className="muted">
                  {completed}/{items.length}
                </span>
              </div>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
