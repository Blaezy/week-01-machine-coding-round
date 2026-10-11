import { Calendar, Moon, Pencil, Plus, Menu, Sun } from "lucide-react";
import Button from "../common/Button";
import { useApp } from "../../context/AppContext";
import useRouteKey from "../../hooks/useRouteKey";

const TOOL_BUTTON =
  "grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-white/18 bg-white/8 text-[0.88rem] font-semibold text-[#f2f0ea] hover:bg-white/16";

export default function Header({ theme, onTheme, onMenu }) {
  const { weeks, week, setWeekId, openModal } = useApp();
  const onMachinePage = useRouteKey() === "machine";

  const action = onMachinePage
    ? week.round
      ? { label: "Edit Coding Round", Icon: Pencil, modal: "round-edit" }
      : { label: "Create Coding Round", Icon: Plus, modal: "round-create" }
    : { label: "Add question", Icon: Plus, modal: "question" };

  return (
    <div className="absolute inset-x-3.5 top-3.5 z-[5] flex items-center justify-between gap-2.5 sm:inset-x-8 sm:top-[18px]">
      <button type="button" className={`${TOOL_BUTTON} tablet:hidden`} onClick={onMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <div className="ml-auto flex items-center gap-2">
        <select
          className="h-[38px] w-auto rounded-[10px] border-white/18 bg-white/8 px-2.5 py-0 text-[0.88rem] font-semibold text-[#f2f0ea] hover:bg-white/16 [&_option]:text-[#1d2420]"
          value={week.id}
          onChange={(e) => setWeekId(e.target.value)}
          aria-label="Select week"
        >
          {weeks.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
        <button type="button" className={TOOL_BUTTON} onClick={() => openModal("weeks")} title="Manage weeks" aria-label="Manage weeks">
          <Calendar size={18} />
        </button>
        <button
          type="button"
          className={TOOL_BUTTON}
          onClick={onTheme}
          title="Toggle theme"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Button variant="inverse" onClick={() => openModal(action.modal)} aria-label={action.label}>
          <action.Icon size={16} /> <span className="max-sm:hidden">{action.label}</span>
        </Button>
      </div>
    </div>
  );
}
