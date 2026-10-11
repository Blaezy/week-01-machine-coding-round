import { cx } from "../../utils/styles";

export default function ProgressBar({ percent, track = "bg-surface-2", fill = "bg-cat", className }) {
  return (
    <div className={cx("h-1.5 overflow-hidden rounded-full", track, className)}>
      <div className={cx("h-full rounded-full transition-[width] duration-500 ease-out", fill)} style={{ width: `${percent}%` }} />
    </div>
  );
}
