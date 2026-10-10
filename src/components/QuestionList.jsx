import QuestionItem from "./QuestionItem";

export default function QuestionList({ questions, totalCount, onStatusChange, onDelete, onLoadSheet, onClearFilters }) {
  // Empty state: nothing stored yet.
  if (totalCount === 0) {
    return (
      <div className="empty">
        <h3>No questions yet</h3>
        <p>Add your first question with the form, or start from this week's sheet.</p>
        <button type="button" className="btn primary" onClick={onLoadSheet}>
          Load Sheet 01 questions
        </button>
      </div>
    );
  }

  // No results state: questions exist but filters hide them all.
  if (questions.length === 0) {
    return (
      <div className="empty">
        <h3>No matching questions</h3>
        <p>Nothing fits your search or filters. Try different keywords or clear them.</p>
        <button type="button" className="btn ghost" onClick={onClearFilters}>
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <ul className="list">
      {questions.map((q) => (
        <QuestionItem key={q.id} question={q} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </ul>
  );
}
