import { Band } from "../common/Band";
import ProgressCard from "./ProgressCard";

export default function ProgressOverview({ stats }) {
  return (
    <Band eyebrow="Welcome back" title="Your Interview Preparation Hub" tagline="Solve. Build. Explain. Communicate. Document.">
      <svg className="absolute right-0 top-16 -z-[5] w-[min(560px,52%)] opacity-50 pointer-events-none tablet:opacity-100 max-sm:hidden" viewBox="0 0 560 170" aria-hidden="true">
        <circle cx="330" cy="40" r="22" fill="#d9822b" />
        <path d="M0 170 120 120 190 140 300 70 380 110 430 55 560 150V170Z" fill="#ffffff" opacity="0.07" />
        <path d="M80 170 220 105 300 135 420 40 560 130V170Z" fill="#ffffff" opacity="0.06" />
        <path d="M0 170C120 150 260 160 380 135 450 120 520 140 560 150V170Z" fill="#ffffff" opacity="0.06" />
      </svg>

      <div className="mt-[34px] grid grid-cols-1 gap-4 sm:grid-cols-2 wide:grid-cols-4">
        <ProgressCard to="/dsa" title="DSA (LeetCode)" cat="dsa" unit="problems" {...stats.dsa} />
        <ProgressCard to="/git" title="Git & GitHub" cat="git" unit="scenarios" {...stats.git} />
        <ProgressCard to="/technical" title="Full-Stack Technical" cat="technical" unit="questions" {...stats.technical} />
        <ProgressCard to="/machine" title="Machine Coding" cat="machine" unit="features" {...stats.machine} />
      </div>
    </Band>
  );
}
