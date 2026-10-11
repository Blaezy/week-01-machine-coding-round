import Button from "../common/Button";
import EmptyState from "../common/EmptyState";
import QuestionCard from "./QuestionCard";

export default function QuestionList({ items, totalCount, copy, showCategory, onStatusChange, onDelete, onAdd, onLoadSheet, onClearFilters }) {
  if (totalCount === 0) {
    return (
      <EmptyState title={copy.emptyTitle} text={copy.emptyText}>
        <Button variant="primary" onClick={onAdd}>
          {copy.addLabel}
        </Button>
        {onLoadSheet && <Button onClick={onLoadSheet}>Load Sheet 01 questions</Button>}
      </EmptyState>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState title={copy.noMatchTitle} text={copy.noMatchText}>
        <Button onClick={onClearFilters}>Clear filters</Button>
      </EmptyState>
    );
  }

  return (
    <ul className="grid gap-2.5">
      {items.map((q) => (
        <QuestionCard key={q.id} question={q} showCategory={showCategory} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </ul>
  );
}
