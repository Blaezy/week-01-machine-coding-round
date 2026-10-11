import { cx } from "../../utils/styles";

export default function EmptyState({ title, text, tall = false, children }) {
  const Title = tall ? "h2" : "h3";
  return (
    <section
      className={cx(
        "grid justify-items-center gap-2.5 rounded-[14px] border-[1.5px] border-dashed text-center",
        tall ? "bg-surface px-5 py-[72px]" : "px-4 py-11"
      )}
    >
      <Title className={tall ? "text-[1.4rem] font-extrabold" : undefined}>{title}</Title>
      <p className="max-w-[42ch] text-muted">{text}</p>
      <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">{children}</div>
    </section>
  );
}
