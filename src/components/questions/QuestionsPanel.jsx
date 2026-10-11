import { useMemo, useState } from "react";
import { Card, CardHead } from "../common/Card";
import { ALL_CATEGORIES, QUESTION_COPY } from "../../data/constants";
import { filterItems } from "../../utils/questionHelpers";
import QuestionFilters from "./QuestionFilters";
import QuestionList from "./QuestionList";

const DEFAULTS = { search: "", category: "All", status: "All", difficulty: "All" };

// Pass `category` to scope the list
export default function QuestionsPanel({ id, title, items, category, copy = QUESTION_COPY, onStatusChange, onDelete, onAdd, onLoadSheet }) {
  const [filters, setFilters] = useState(DEFAULTS);
  const scoped = useMemo(() => (category ? items.filter((q) => q.category === category) : items), [items, category]);
  const visible = useMemo(() => filterItems(scoped, filters), [scoped, filters]);

  const counts = {
    All: scoped.length,
    ...Object.fromEntries(ALL_CATEGORIES.map((c) => [c, scoped.filter((q) => q.category === c).length])),
  };
  const isFiltering = Object.keys(DEFAULTS).some((key) => filters[key] !== DEFAULTS[key]);
  const reset = () => setFilters(DEFAULTS);

  return (
    <Card id={id}>
      <CardHead title={title} aside={`Showing ${visible.length} of ${scoped.length}`} />
      <QuestionFilters
        filters={filters}
        counts={counts}
        showCategory={!category}
        searchLabel={copy.search}
        onChange={setFilters}
        onReset={reset}
        isFiltering={isFiltering}
      />
      <QuestionList
        items={visible}
        totalCount={scoped.length}
        copy={copy}
        showCategory={!category}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onAdd={onAdd}
        onLoadSheet={items.length === 0 ? onLoadSheet : undefined}
        onClearFilters={reset}
      />
    </Card>
  );
}
