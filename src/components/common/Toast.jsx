import { Undo2, X } from "lucide-react";

export default function Toast({ toast, onUndo, onClose }) {
  if (!toast) return null;
  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex max-w-[calc(100vw-24px)] -translate-x-1/2 animate-rise items-center gap-3.5 rounded-xl bg-ink py-[11px] pl-[18px] pr-3.5 text-[0.9rem] font-medium text-bg shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      role="status"
    >
      <span>{toast.message}</span>
      {toast.undo && (
        <button type="button" className="inline-flex items-center gap-[5px] px-1 py-0.5 font-bold underline" onClick={onUndo}>
          <Undo2 size={14} /> Undo
        </button>
      )}
      <button type="button" className="grid p-0.5 opacity-60" onClick={onClose} aria-label="Dismiss">
        <X size={14} />
      </button>
    </div>
  );
}
