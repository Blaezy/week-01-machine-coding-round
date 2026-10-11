import { cx } from "../../utils/styles";

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-[10px] border text-[0.9rem] font-semibold transition duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS = {
  primary: "border-transparent bg-primary px-4 py-2.5 text-primary-ink hover:brightness-110",
  ghost: "border-border bg-transparent px-4 py-2.5 text-ink hover:bg-surface-2",
  danger: "border-border bg-transparent px-4 py-2.5 text-ink hover:border-bad/45 hover:text-bad",
  icon: "border-transparent bg-transparent p-2 text-muted hover:bg-bad/12 hover:text-bad",
  inverse:
    "h-[38px] border-transparent bg-[#f2f0ea] px-3.5 text-[#1b201d] hover:brightness-110 max-sm:w-[38px] max-sm:px-0",
};

export default function Button({ variant = "ghost", type = "button", className, ...props }) {
  return <button type={type} className={cx(BASE, VARIANTS[variant], className)} {...props} />;
}
