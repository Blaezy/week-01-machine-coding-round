import { useMemo, useRef } from "react";
import useLocalStorage from "./useLocalStorage";
import { KEYS, normalizeFeature, normalizeWeeks } from "../services/storageService";
import { makeInitialWeeks, makeSheetRound, makeWeek, SHEET_01, withIds } from "../data/initialData";
import { newId } from "../data/constants";
import { getStats } from "../utils/progress";
import { getTrackerItems } from "../utils/questionHelpers";

const INITIAL_WEEKS = makeInitialWeeks();

export default function useTracker(say) {
  const [weeks, setWeeks] = useLocalStorage(KEYS.weeks, INITIAL_WEEKS, (saved) => normalizeWeeks(saved, INITIAL_WEEKS));
  const [weekId, setWeekId] = useLocalStorage(KEYS.week, INITIAL_WEEKS[0].id);
  const lastDeleted = useRef(null);

  const week = weeks.find((w) => w.id === weekId) ?? weeks[0];
  const items = useMemo(() => getTrackerItems(week), [week]);
  const stats = useMemo(() => getStats(items), [items]);

  const updateWeek = (fn) => setWeeks((prev) => prev.map((w) => (w.id === week.id ? fn(w) : w)));

  const addQuestion = (data) => {
    updateWeek((w) => ({ ...w, questions: [{ id: newId(), ...data }, ...w.questions] }));
    say("Question added.");
  };

  const loadSheet = () => {
    updateWeek((w) => ({ ...w, questions: withIds(SHEET_01), round: w.round ?? makeSheetRound(w.id) }));
    say("Sheet 01 questions loaded.");
  };

  // Ids unique across questions and features
  const changeStatus = (id, status) =>
    updateWeek((w) => {
      const now = Date.now();
      const patch = (item) =>
        item.id === id && item.status !== status
          ? { ...item, status, updatedAt: now, completedAt: status === "Completed" ? now : null }
          : item;
      return {
        ...w,
        questions: w.questions.map(patch),
        round: w.round ? { ...w.round, features: w.round.features.map(patch) } : null,
      };
    });

  // Handles questions and round features
  const deleteQuestion = (id) => {
    const questionIndex = week.questions.findIndex((q) => q.id === id);
    if (questionIndex !== -1) {
      const question = week.questions[questionIndex];
      lastDeleted.current = { weekId: week.id, type: "question", item: question, index: questionIndex };
      updateWeek((w) => ({ ...w, questions: w.questions.filter((q) => q.id !== id) }));
      say(`Deleted "${question.title}".`, true);
      return;
    }

    const featureIndex = week.round?.features.findIndex((f) => f.id === id) ?? -1;
    if (featureIndex !== -1) {
      const feature = week.round.features[featureIndex];
      lastDeleted.current = { weekId: week.id, type: "feature", item: feature, index: featureIndex };
      updateWeek((w) => ({
        ...w,
        round: { ...w.round, features: w.round.features.filter((f) => f.id !== id), updatedAt: Date.now() },
      }));
      say(`Deleted "${feature.title}".`, true);
    }
  };

  const insertAt = (list, index, item) => {
    const next = [...list];
    next.splice(Math.min(index, next.length), 0, item);
    return next;
  };

  const undoDelete = () => {
    const saved = lastDeleted.current;
    if (!saved) return;

    if (saved.type === "week") {
      setWeeks((prev) => (prev.some((w) => w.id === saved.week.id) ? prev : insertAt(prev, saved.index, saved.week)));
      if (saved.previousWeekId === saved.week.id) setWeekId(saved.week.id);
    } else {
      setWeeks((prev) =>
        prev.map((w) => {
          if (w.id !== saved.weekId) return w;
          if (saved.type === "question") return { ...w, questions: insertAt(w.questions, saved.index, saved.item) };
          if (!w.round) return w;
          return { ...w, round: { ...w.round, features: insertAt(w.round.features, saved.index, saved.item), updatedAt: Date.now() } };
        })
      );
    }

    lastDeleted.current = null;
    say("Item restored.");
  };

  // Feature ids survive edits
  const saveRound = ({ title, subtitle, tags, features }) => {
    const editing = Boolean(week.round);
    const now = Date.now();
    updateWeek((w) => {
      const id = w.round?.id ?? newId();
      return {
        ...w,
        round: {
          id,
          weekId: w.id,
          title,
          subtitle,
          tags,
          features: features.map((f) => normalizeFeature(f, id)),
          createdAt: w.round?.createdAt ?? now,
          updatedAt: now,
        },
      };
    });
    say(editing ? "Coding round updated." : "Coding round created.");
  };

  const deleteRound = () => {
    if (!week.round || !window.confirm(`Delete the coding round "${week.round.title}" for ${week.name}?`)) return false;
    updateWeek((w) => ({ ...w, round: null }));
    say("Coding round deleted.");
    return true;
  };

  const addWeek = () => {
    const numbers = weeks.map((w) => Number(w.name.match(/(\d+)$/)?.[1] ?? 0));
    const next = makeWeek(Math.max(0, ...numbers) + 1);
    setWeeks((prev) => [...prev, next]);
    setWeekId(next.id);
    say(`${next.name} created.`);
  };

  const renameWeek = (id, name) => {
    setWeeks((prev) => prev.map((w) => (w.id === id ? { ...w, name } : w)));
    say("Week renamed.");
  };

  const deleteWeek = (id) => {
    if (weeks.length <= 1) return;
    const index = weeks.findIndex((w) => w.id === id);
    if (index === -1) return;

    const deletedWeek = weeks[index];
    const rest = weeks.filter((w) => w.id !== id);
    lastDeleted.current = { type: "week", week: deletedWeek, index, previousWeekId: weekId };

    setWeeks(rest);
    if (weekId === id) setWeekId(rest[Math.min(index, rest.length - 1)].id);
    say(`${deletedWeek.name} deleted.`, true);
  };

  return {
    weeks,
    week,
    items,
    stats,
    setWeekId,
    addQuestion,
    loadSheet,
    changeStatus,
    deleteQuestion,
    undoDelete,
    saveRound,
    deleteRound,
    addWeek,
    renameWeek,
    deleteWeek,
  };
}
