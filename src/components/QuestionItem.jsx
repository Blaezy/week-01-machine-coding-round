import { STATUSES } from "../data/constants";

export default function QuestionItem({ question, onStatusChange, onDelete }) {
  const { id, title, category, difficulty, status } = question;

  return (
    <li className={`item ${status === "Completed" ? "done" : ""}`}>
      <div className="item-main">
        <p className="item-title">{title}</p>
        <div className="tags">
          <span className="tag">{category}</span>
          <span className={`tag diff-${difficulty.toLowerCase()}`}>{difficulty}</span>
        </div>
      </div>

      <div className="item-actions">
        <select
          className={`status-select status-${status.replace(/\s/g, "-").toLowerCase()}`}
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          aria-label={`Status for ${title}`}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          type="button"
          className="btn icon"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${title}`}
          title="Delete"
        >
          ✕
        </button>
      </div>
    </li>
  );
}
