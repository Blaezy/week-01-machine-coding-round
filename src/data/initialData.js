import { newId } from "./constants";

const q = (title, category, difficulty) => ({ title, category, difficulty, status: "Pending" });

// Sheet 01 starter list
export const SHEET_01 = [
  q("Two Sum (LC 1)", "DSA", "Easy"),
  q("Remove Duplicates from Sorted Array (LC 26)", "DSA", "Easy"),
  q("Move Zeroes (LC 283)", "DSA", "Easy"),
  q("Rotate Array (LC 189)", "DSA", "Medium"),
  q("3Sum (LC 15)", "DSA", "Medium"),
  q("Wrong branch, correct work", "Git", "Medium"),
  q("Merge conflict during PR", "Git", "Medium"),
  q("Secret accidentally committed", "Git", "Medium"),
  q("PR review with new changes", "Git", "Easy"),
  q("Recovering lost local work", "Git", "Hard"),
  q("JavaScript: async flow and the event loop", "Technical", "Medium"),
  q("React: unnecessary re-renders", "Technical", "Medium"),
  q("REST API + Express: request flow and 401s", "Technical", "Medium"),
  q("MongoDB + Mongoose: duplicate data", "Technical", "Hard"),
  q("Authentication + authorization + ImageKit", "Technical", "Hard"),
];

// Sheet 01 machine round
const SHEET_01_ROUND = {
  title: "Interview Practice Tracker",
  subtitle: "Build a responsive dashboard to manage weekly interview preparation.",
  tags: ["React", "Frontend", "JavaScript", "Responsive UI"],
  features: [
    ["Dashboard with totals and machine-coding status", "Medium"],
    ["Question tracker with category, difficulty and status", "Medium"],
    ["Search and filters by category, status and difficulty", "Medium"],
    ["Visual completion percentage", "Easy"],
    ["LocalStorage persistence", "Medium"],
    ["Responsive desktop and mobile layouts", "Medium"],
    ["Empty state, no-results state and form validation", "Medium"],
    ["Clean component structure and sensible UX", "Medium"],
  ],
};

export const withIds = (list) => list.map((item) => ({ id: newId(), ...item }));

// Fresh ids each call
export const makeSheetRound = (weekId) => {
  const id = newId();
  const now = Date.now();
  return {
    id,
    weekId,
    title: SHEET_01_ROUND.title,
    subtitle: SHEET_01_ROUND.subtitle,
    tags: [...SHEET_01_ROUND.tags],
    features: SHEET_01_ROUND.features.map(([title, difficulty]) => ({
      id: newId(),
      roundId: id,
      title,
      status: "Pending",
      difficulty,
      completedAt: null,
      updatedAt: null,
    })),
    createdAt: now,
    updatedAt: now,
  };
};


export const makeWeek = (number, questions = []) => ({
  id: newId(),
  name: `Week ${String(number).padStart(2, "0")}`,
  questions,
  round: null,
});

// Fresh install starts empty
export const makeInitialWeeks = () => [makeWeek(1)];
