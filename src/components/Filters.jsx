import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/constants";

function Select({ label, value, options, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="All">All</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function Filters({ filters, onChange, onReset, isFiltering }) {
  const set = (field) => (value) => onChange({ ...filters, [field]: value });

  return (
    <div className="filters">
      <label className="field search">
        <span>Search</span>
        <input
          type="search"
          value={filters.search}
          onChange={(e) => set("search")(e.target.value)}
          placeholder="Search questions"
        />
      </label>
      <Select label="Category" value={filters.category} options={CATEGORIES} onChange={set("category")} />
      <Select label="Status" value={filters.status} options={STATUSES} onChange={set("status")} />
      <Select label="Difficulty" value={filters.difficulty} options={DIFFICULTIES} onChange={set("difficulty")} />
      {isFiltering && (
        <button type="button" className="btn ghost" onClick={onReset}>
          Clear
        </button>
      )}
    </div>
  );
}
