export const CATEGORIES = ["DSA", "Git", "Technical"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];
export const STATUSES = ["Pending", "In Progress", "Completed"];
export const MACHINE_STATUSES = ["Not Started", "In Progress", "Completed"];


const q = (title, category, difficulty) => ({
  title,
  category,
  difficulty,
  status: "Pending",
});

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
