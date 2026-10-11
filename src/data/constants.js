export const CATEGORIES = ["DSA", "Git", "Technical"];
// Created from round features
export const MACHINE = "Machine";
export const ALL_CATEGORIES = [...CATEGORIES, MACHINE];
export const CATEGORY_LABELS = { DSA: "DSA", Git: "Git", Technical: "Technical", Machine: "Machine Coding" };
// Route and stats keys
export const CATEGORY_KEY = { DSA: "dsa", Git: "git", Technical: "technical", Machine: "machine" };

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];
export const STATUSES = ["Pending", "In Progress", "Completed"];

export const newId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const SECTIONS = {
  dsa: {
    category: "DSA",
    title: "DSA (LeetCode)",
    unit: "problems",
    blurb: "Solve each problem on LeetCode yourself first. After an Accepted submission, upload a screenshot to this week's DSA Drive folder.",
  },
  git: {
    category: "Git",
    title: "Git & GitHub",
    unit: "scenarios",
    blurb: "Answer like an interview: first what you would do, then why. Be ready for the follow-ups.",
  },
  technical: {
    category: "Technical",
    title: "Full-Stack Technical",
    unit: "questions",
    blurb: "This section is cumulative. Revise older topics instead of studying only the newest one.",
  },
};

export const ROUTE_KEYS = ["dashboard", ...Object.keys(SECTIONS), "machine"];

export const QUESTION_COPY = {
  search: "Search questions",
  emptyTitle: "No questions yet",
  emptyText: "Add your first question, or start from the Sheet 01 list.",
  addLabel: "Add question",
  noMatchTitle: "No matching questions",
  noMatchText: "Nothing fits your search or filters. Try different keywords or clear them.",
};

export const FEATURE_COPY = {
  search: "Search features",
  emptyTitle: "No features yet",
  emptyText: "Edit the coding round to add the features you plan to build.",
  addLabel: "Edit Coding Round",
  noMatchTitle: "No matching features",
  noMatchText: "Nothing fits your search or filters. Try different keywords or clear them.",
};
