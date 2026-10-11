import { NavLink } from "react-router";
import { ArrowRight, BookOpen, Code, GitBranch, LayoutGrid, Target } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { cx } from "../../utils/styles";

const LINKS = [
  ["dashboard", "Dashboard", LayoutGrid],
  ["dsa", "DSA (LeetCode)", Code],
  ["git", "Git & GitHub", GitBranch],
  ["technical", "Full-Stack Technical", BookOpen],
  ["machine", "Machine Coding", Target],
];

const NAV_LINK = "flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-[0.93rem] font-medium text-ink no-underline";
const NAV_ACTIVE =
  "bg-surface-2 text-[#f2f0ea] shadow-[inset_3px_0_0_var(--primary)] light:bg-[#1b201d] light:shadow-none";

export default function Sidebar({ open, onClose }) {
  const { week, openModal } = useApp();

  return (
    <>
      {open && <div className="fixed inset-0 z-[25] bg-black/55 tablet:hidden" onClick={onClose} />}
      <aside
        className={cx(
          "fixed left-0 top-0 z-30 flex h-screen w-[264px] flex-col border-r bg-side transition-transform duration-200 ease-in-out tablet:sticky tablet:w-auto tablet:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-6 pb-[22px] pt-[26px]">
          <p className="font-heading text-[1.35rem] font-extrabold leading-[1.1] tracking-[0.04em]">SHERYIANS</p>
          <span className="text-[0.72rem] tracking-[0.16em] text-muted">CODING SCHOOL</span>
        </div>
        <nav className="grid gap-1 px-3.5" aria-label="Main">
          {LINKS.map(([path, label, Icon]) => (
            <NavLink
              key={path}
              to={`/${path}`}
              onClick={onClose}
              className={({ isActive }) => cx(NAV_LINK, isActive ? NAV_ACTIVE : "hover:bg-surface-2")}
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="relative mt-auto bg-band px-4 pb-[18px] pt-[78px]">
          <svg className="absolute left-0 top-[-1px] h-[90px] w-full fill-side" viewBox="0 0 248 90" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0h248v8C190 30 150 70 80 66 40 64 14 76 0 90Z" />
          </svg>
          <button
            type="button"
            className="relative flex w-full flex-col items-start gap-1.5 rounded-xl border bg-transparent p-3.5 text-left text-[0.88rem] text-on-band transition duration-150 hover:border-on-band-muted hover:bg-white/10"
            onClick={() => openModal("weeks")}
          >
            <span>Weekly Interview Preparation</span>
            <strong className="flex items-center justify-between gap-1 font-heading text-base">
              {week.name} <ArrowRight size={16} />
            </strong>
          </button>
        </div>
      </aside>
    </>
  );
}
