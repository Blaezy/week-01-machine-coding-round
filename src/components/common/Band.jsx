import { CAT_CLASS, cx } from "../../utils/styles";
import ProgressBar from "./ProgressBar";

export function Band({ cat = "all", eyebrow, title, tagline, className, children }) {
  return (
    <section
      className={cx(
        "relative isolate overflow-hidden bg-band px-[18px] pb-6 pt-[78px] text-on-band before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(500px_220px_at_85%_0%,color-mix(in_srgb,var(--cat,#5f8f75)_28%,transparent),transparent_70%)] before:content-[''] sm:px-8 sm:pb-[30px]",
        CAT_CLASS[cat],
        className
      )}
    >
      <p className="text-[0.74rem] uppercase tracking-[0.14em] text-on-band-muted">{eyebrow}</p>
      <h1 className="mb-2 mt-1.5 font-heading text-[clamp(1.8rem,4vw,2.7rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">{title}</h1>
      {tagline && <p className="max-w-[62ch] text-base text-[#d3d6cf]">{tagline}</p>}
      {children}
    </section>
  );
}

export function BandProgress({ done, total, percent, unit }) {
  return (
    <div className="mt-5 grid max-w-[420px] gap-2 text-[0.92rem]">
      <p>
        <strong>
          {done} / {total}
        </strong>{" "}
        {unit} completed
      </p>
      <ProgressBar percent={percent} track="bg-white/14" />
    </div>
  );
}

export function PageBody({ children }) {
  return <div className="grid w-full max-w-[1240px] gap-[18px] px-3.5 pb-6 pt-4 sm:px-8 sm:pb-7 sm:pt-[22px] [&>*]:min-w-0">{children}</div>;
}
