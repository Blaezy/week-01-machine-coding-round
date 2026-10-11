import { CATEGORY_KEY } from "../data/constants";

export const percentOf = (done, total) => (total === 0 ? 0 : Math.round((done / total) * 100));

export function roundProgress(round) {
  const features = round?.features ?? [];
  const done = features.filter((f) => f.status === "Completed").length;
  return { total: features.length, done, percent: percentOf(done, features.length) };
}

// Pass questions plus machine features
export function getStats(items) {
  const count = (list, status) => list.filter((q) => q.status === status).length;
  const byCategory = (category) => {
    const list = items.filter((q) => q.category === category);
    return { total: list.length, done: count(list, "Completed") };
  };
  const total = items.length;
  const done = count(items, "Completed");
  const active = count(items, "In Progress");
  return {
    total,
    done,
    active,
    pending: total - done - active,
    percent: percentOf(done, total),
    ...Object.fromEntries(Object.entries(CATEGORY_KEY).map(([category, key]) => [key, byCategory(category)])),
  };
}
