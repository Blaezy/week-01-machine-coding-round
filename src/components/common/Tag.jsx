import { cx } from "../../utils/styles";

const TONES = {
  neutral: "border-border bg-bg text-muted",
  cat: "border-transparent bg-cat/12 text-cat",
  Easy: "border-border bg-bg text-ok",
  Medium: "border-border bg-bg text-warn",
  Hard: "border-border bg-bg text-bad",
};

export default function Tag({ tone = "neutral", className, ...props }) {
  return <span className={cx("rounded-full border px-[9px] py-0.5 text-[0.74rem] font-semibold", TONES[tone], className)} {...props} />;
}
