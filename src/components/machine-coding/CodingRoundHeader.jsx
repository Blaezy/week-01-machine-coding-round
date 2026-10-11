import { Band, BandProgress } from "../common/Band";
import { roundProgress } from "../../utils/progress";

export default function CodingRoundHeader({ week, round }) {
  if (!round) {
    return (
      <Band
        cat="machine"
        eyebrow={week.name}
        title="Machine Coding"
        tagline="No coding round for this week yet. Create one to track its features."
      />
    );
  }

  return (
    <Band cat="machine" eyebrow={week.name} title={round.title} tagline={round.subtitle}>
      {round.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {round.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/16 bg-white/10 px-3 py-[5px] text-[0.8rem] font-semibold">
              {t}
            </li>
          ))}
        </ul>
      )}
      <BandProgress {...roundProgress(round)} unit="features" />
    </Band>
  );
}
