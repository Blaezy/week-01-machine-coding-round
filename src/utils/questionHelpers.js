import { MACHINE, newId } from "../data/constants";

export const makeFeature = (title = "", difficulty = "Medium") => ({
  id: newId(),
  title,
  status: "Pending",
  difficulty,
  completedAt: null,
  updatedAt: null,
});

// View only, never stored
const featureToItem = (feature, round) => ({
  id: feature.id,
  title: feature.title,
  category: MACHINE,
  difficulty: feature.difficulty,
  status: feature.status,
  completedAt: feature.completedAt,
  updatedAt: feature.updatedAt,
  tags: [],
  roundId: round.id,
});

export const getMachineItems = (week) => (week.round ? week.round.features.map((f) => featureToItem(f, week.round)) : []);

export const getTrackerItems = (week) => [...week.questions, ...getMachineItems(week)];

export function filterItems(items, { search, category, status, difficulty }) {
  const term = search.trim().toLowerCase();
  return items.filter(
    (q) =>
      (!term || q.title.toLowerCase().includes(term) || (q.tags ?? []).some((t) => t.toLowerCase().includes(term))) &&
      (category === "All" || q.category === category) &&
      (status === "All" || q.status === status) &&
      (difficulty === "All" || q.difficulty === difficulty)
  );
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// Monday to Sunday, all weeks
export function getWeekActivity(weeks, now = new Date()) {
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const days = DAY_LABELS.map((label, i) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    return { label, date, count: 0, isToday: sameDay(date, now) };
  });
  const start = days[0].date.getTime();
  const end = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 7).getTime();

  const add = (ts) => {
    if (typeof ts !== "number" || ts < start || ts >= end) return;
    const day = days.find((d) => sameDay(d.date, new Date(ts)));
    if (day) day.count += 1;
  };
  weeks.forEach((w) => {
    w.questions.forEach((q) => q.status === "Completed" && add(q.completedAt));
    w.round?.features.forEach((f) => f.status === "Completed" && add(f.completedAt));
  });
  return { days, total: days.reduce((sum, d) => sum + d.count, 0) };
}
