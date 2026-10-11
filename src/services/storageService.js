import { DIFFICULTIES, STATUSES, newId } from "../data/constants";

export const KEYS = { weeks: "ipt:weeks", week: "ipt:week", theme: "ipt:theme" };

export function readItem(key, fallback, migrate) {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return fallback;
    const parsed = JSON.parse(saved);
    return migrate ? migrate(parsed) : parsed;
  } catch {
    return fallback;
  }
}

export function writeItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked
  }
}

// Normalizers are idempotent

// Legacy shape: { label, done }
export function normalizeFeature(f, roundId) {
  const status = STATUSES.includes(f.status) ? f.status : f.done ? "Completed" : "Pending";
  return {
    id: f.id ?? newId(),
    roundId,
    title: String(f.title ?? f.label ?? "").trim(),
    status,
    difficulty: DIFFICULTIES.includes(f.difficulty) ? f.difficulty : "Medium",
    completedAt: status === "Completed" && typeof f.completedAt === "number" ? f.completedAt : null,
    updatedAt: typeof f.updatedAt === "number" ? f.updatedAt : null,
  };
}

// Legacy round status ignored
function normalizeRound(r, weekId) {
  if (!r) return null;
  const id = r.id ?? newId();
  const now = Date.now();
  return {
    id,
    weekId,
    title: r.title ?? "",
    subtitle: r.subtitle ?? "",
    tags: Array.isArray(r.tags) ? r.tags : [],
    features: (Array.isArray(r.features) ? r.features : []).map((f) => normalizeFeature(f, id)),
    createdAt: typeof r.createdAt === "number" ? r.createdAt : now,
    updatedAt: typeof r.updatedAt === "number" ? r.updatedAt : now,
  };
}

function normalizeWeek(w) {
  const { machine: _legacy, ...rest } = w; // legacy field dropped
  return {
    ...rest,
    questions: Array.isArray(rest.questions) ? rest.questions : [],
    round: normalizeRound(rest.round, rest.id),
  };
}

export const normalizeWeeks = (saved, fallback) =>
  Array.isArray(saved) && saved.length > 0 ? saved.map(normalizeWeek) : fallback;
