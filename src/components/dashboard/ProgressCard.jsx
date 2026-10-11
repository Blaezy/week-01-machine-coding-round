import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ProgressBar from "../common/ProgressBar";
import { percentOf } from "../../utils/progress";
import { CAT_CLASS, cx } from "../../utils/styles";

export default function ProgressCard({ to, title, done, total, unit, cat }) {
  return (
    <Link
      to={to}
      className={cx(
        "grid gap-0.5 rounded-[14px] border bg-surface px-5 py-[18px] text-ink no-underline transition duration-150 hover:-translate-y-0.5 hover:border-cat",
        CAT_CLASS[cat]
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[0.98rem]">{title}</h3>
        <ArrowRight size={16} />
      </div>
      <p className="mt-1.5 font-heading text-base text-muted">
        <strong className="text-[2rem] font-extrabold tracking-[-0.02em] text-ink">{done}</strong> / {total}
      </p>
      <p className="text-[0.86rem] text-muted">{unit} completed</p>
      <ProgressBar className="mt-2.5" percent={percentOf(done, total)} />
    </Link>
  );
}
