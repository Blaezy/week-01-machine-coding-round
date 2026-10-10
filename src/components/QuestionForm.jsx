import { useState } from "react";
import { CATEGORIES, DIFFICULTIES, STATUSES } from "../data/constants";

const EMPTY = { title: "", category: "DSA", difficulty: "Easy", status: "Pending" };

export default function QuestionForm({ onAdd, existing }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (error) setError("");
  };

  const validate = () => {
    const title = form.title.trim();
    if (!title) return "Enter a question title.";
    if (title.length < 3) return "Title needs at least 3 characters.";
    if (title.length > 100) return "Title can be 100 characters at most.";
    const duplicate = existing.some(
      (q) => q.category === form.category && q.title.toLowerCase() === title.toLowerCase()
    );
    if (duplicate) return `This question is already in ${form.category}.`;
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    onAdd({ ...form, title: form.title.trim() });
    setForm(EMPTY);
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>Add a question</h2>

      <label className="field">
        <span>Question</span>
        <input
          type="text"
          value={form.title}
          onChange={update("title")}
          placeholder="e.g. Two Sum (LC 1)"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "form-error" : undefined}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Category</span>
          <select value={form.category} onChange={update("category")}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Difficulty</span>
          <select value={form.difficulty} onChange={update("difficulty")}>
            {DIFFICULTIES.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Status</span>
          <select value={form.status} onChange={update("status")}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <p id="form-error" className="error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn primary">
        Add question
      </button>
    </form>
  );
}
