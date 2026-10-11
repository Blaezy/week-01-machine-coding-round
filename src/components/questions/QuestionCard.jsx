import { Check, Trash2 } from "lucide-react";
import Button from "../common/Button";
import Tag from "../common/Tag";
import { CATEGORY_LABELS, MACHINE, STATUSES } from "../../data/constants";
import { CAT_CLASS, STATUS_CLASS, cx } from "../../utils/styles";

// `showCategory` is false on single-category pages
export default function QuestionCard({ question, onStatusChange, onDelete, showCategory = true }) {
  const { id, title, category, difficulty, status, tags = [] } = question;
  const done = status === "Completed";
  const isFeature = category === MACHINE;

  return (
    <li
      className={cx(
        "flex flex-wrap items-center gap-3.5 rounded-xl border border-l-4 border-l-cat bg-surface-2 px-3.5 py-3 hover:border-[color-mix(in_srgb,var(--cat)_55%,var(--border))] hover:border-l-cat sm:flex-nowrap",
        CAT_CLASS[category.toLowerCase()]
      )}
    >
      <button
        type="button"
        className={cx(
          "grid size-6 shrink-0 place-items-center rounded-full border-2 text-on-cat",
          done ? "border-ok bg-ok" : "border-border-hover bg-transparent hover:border-cat"
        )}
        onClick={() => onStatusChange(id, done ? "Pending" : "Completed")}
        aria-label={done ? `Mark "${title}" as pending` : `Mark "${title}" as completed`}
      >
        {done && <Check size={14} />}
      </button>

      <div className="grid min-w-0 flex-[1_1_calc(100%-40px)] gap-1.5 sm:flex-1">
        <p className={cx("font-semibold [overflow-wrap:anywhere]", done && "text-muted line-through decoration-idle")}>{title}</p>
        <div className="flex flex-wrap gap-1.5">
          {(!isFeature || showCategory || tags.length === 0) && <Tag tone="cat">{CATEGORY_LABELS[category] ?? category}</Tag>}
          {isFeature &&
            tags.map((t) => (
              <Tag key={t} tone={showCategory ? "neutral" : "cat"}>
                {t}
              </Tag>
            ))}
          {difficulty && <Tag tone={difficulty}>{difficulty}</Tag>}
        </div>
      </div>

      <div className="flex w-full shrink-0 items-center justify-between gap-1 sm:w-auto sm:justify-start">
        <select
          className={cx(
            "mr-1.5 w-auto flex-1 rounded-full px-2.5 py-[7px] text-[0.85rem] font-semibold sm:mr-0 sm:flex-none",
            STATUS_CLASS[status]
          )}
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          aria-label={`Status for ${title}`}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {onDelete && (
          <Button variant="icon" onClick={() => onDelete(id)} aria-label={`Delete ${title}`} title="Delete">
            <Trash2 size={16} />
          </Button>
        )}
      </div>
    </li>
  );
}
