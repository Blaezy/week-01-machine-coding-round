export const cx = (...classes) => classes.filter(Boolean).join(" ");

export const CAT_CLASS = {
  all: "[--cat:var(--all)]",
  dsa: "[--cat:var(--dsa)]",
  git: "[--cat:var(--git)]",
  technical: "[--cat:var(--technical)]",
  machine: "[--cat:var(--machine)]",
};

export const STATUS_CLASS = {
  Pending: "text-muted",
  "In Progress": "border-warn/45 text-warn",
  Completed: "border-ok/45 text-ok",
};
