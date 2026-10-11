import { Search } from "lucide-react";
import Button from "../common/Button";
import { ALL_CATEGORIES, CATEGORY_LABELS, DIFFICULTIES, STATUSES } from "../../data/constants";
import { CAT_CLASS, cx } from "../../utils/styles";

function FilterSelect({ label, allLabel, value, options, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
      <option value="All">{allLabel}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export default function QuestionFilters({ filters, counts, showCategory, searchLabel, onChange, onReset, isFiltering }) {
  const set = (field) => (value) => onChange({ ...filters, [field]: value });

  return (
    <div className="mb-4 grid gap-3.5">
      {showCategory && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...ALL_CATEGORIES].map((c) => {
            const active = filters.category === c;
            return (
              <button
                key={c}
                type="button"
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-[13px] py-[7px] text-[0.86rem] font-semibold",
                  CAT_CLASS[c.toLowerCase()],
                  active ? "border-cat bg-cat/14 text-ink" : "text-muted hover:border-border-hover hover:text-ink"
                )}
                aria-pressed={active}
                onClick={() => set("category")(c)}
              >
                {CATEGORY_LABELS[c] ?? c}
                <span
                  className={cx(
                    "min-w-[22px] rounded-full px-[7px] py-px text-center text-[0.74rem] font-semibold",
                    active ? "bg-cat text-on-cat" : "bg-surface-2 text-muted"
                  )}
                >
                  {counts[c]}
                </span>
              </button>
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-2 items-end gap-2.5 sm:grid-cols-[1.6fr_1fr_1fr_auto]">
        <label className="relative col-span-2 block sm:col-auto">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            className="pl-9"
            type="search"
            value={filters.search}
            onChange={(e) => set("search")(e.target.value)}
            placeholder={searchLabel}
            aria-label={searchLabel}
          />
        </label>
        <FilterSelect label="Status" allLabel="All statuses" value={filters.status} options={STATUSES} onChange={set("status")} />
        <FilterSelect label="Difficulty" allLabel="All difficulties" value={filters.difficulty} options={DIFFICULTIES} onChange={set("difficulty")} />
        {isFiltering && (
          <Button className="col-span-2 sm:col-auto" onClick={onReset}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
