import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Button from "../common/Button";

export default function ManageWeeks({ weeks, currentWeekId, onAdd, onRename, onDelete, onClose }) {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  const startRename = (week) => {
    setEditingId(week.id);
    setName(week.name);
  };

  const saveRename = (id) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onRename(id, trimmed);
    setEditingId(null);
  };

  return (
    <div className="grid gap-4">
      <p className="text-[0.9rem] text-muted">Create and organize your interview preparation weeks.</p>

      <ul className="grid gap-2">
        {weeks.map((week) => {
          const editing = editingId === week.id;
          return (
            <li className="flex flex-col items-start justify-between gap-3 rounded-xl border p-3 min-[481px]:flex-row min-[481px]:items-center" key={week.id}>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {editing ? (
                  <input
                    className="min-w-[100px] bg-surface-2 p-2"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveRename(week.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    aria-label="Week name"
                  />
                ) : (
                  <>
                    <strong>{week.name}</strong>
                    {week.id === currentWeekId && (
                      <span className="rounded-full border px-[7px] py-[3px] text-[0.72rem] text-primary">Current</span>
                    )}
                  </>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-0.5 self-end min-[481px]:self-auto">
                {editing ? (
                  <Button onClick={() => saveRename(week.id)}>Save</Button>
                ) : (
                  <>
                    <Button variant="icon" title="Rename week" aria-label={`Rename ${week.name}`} onClick={() => startRename(week)}>
                      <Pencil size={17} />
                    </Button>
                    <Button
                      variant="icon"
                      title="Delete week"
                      aria-label={`Delete ${week.name}`}
                      disabled={weeks.length === 1}
                      onClick={() => onDelete(week.id)}
                    >
                      <Trash2 size={17} />
                    </Button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between gap-2.5 pt-2">
        <Button variant="primary" onClick={onAdd}>
          <Plus size={16} />
          Create new week
        </Button>
        <Button onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}
