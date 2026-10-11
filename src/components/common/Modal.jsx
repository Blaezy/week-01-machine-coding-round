import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import { cx } from "../../utils/styles";

export default function Modal({ title, onClose, wide = false, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    (ref.current?.querySelector("[data-autofocus]") ?? ref.current?.querySelector("input, select, button"))?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-40 grid animate-fade place-items-center bg-[rgba(5,8,6,0.6)] p-4 backdrop-blur-[4px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={cx(
          "max-h-[92vh] w-full animate-pop overflow-auto rounded-[18px] border bg-surface p-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-[22px]",
          wide ? "max-w-[640px]" : "max-w-[480px]"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={ref}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2>{title}</h2>
          <Button variant="icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
