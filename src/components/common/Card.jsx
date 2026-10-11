import { cx } from "../../utils/styles";

export function Card({ className, ...props }) {
  return <section className={cx("rounded-[14px] border bg-surface p-5 shadow-card", className)} {...props} />;
}

export function CardHead({ title, aside }) {
  return (
    <div className="mb-3.5 flex items-baseline justify-between gap-2.5">
      <h2>{title}</h2>
      {aside && <span className="text-[0.86rem] text-muted">{aside}</span>}
    </div>
  );
}
