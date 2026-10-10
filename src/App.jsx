import { useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { SHEET_01 } from "./data/constants";
import Dashboard from "./components/Dashboard";
import Progress from "./components/Progress";
import QuestionForm from "./components/QuestionForm";
import Filters from "./components/Filters";
import QuestionList from "./components/QuestionList";

const DEFAULT_FILTERS = { search: "", category: "All", status: "All", difficulty: "All" };
const newId = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export default function App() {
  const [questions, setQuestions] = useLocalStorage("ipt:questions", []);
  const [machineStatus, setMachineStatus] = useLocalStorage("ipt:machine", "Not Started");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const addQuestion = (data) => setQuestions((prev) => [{ id: newId(), ...data }, ...prev]);

  const loadSheet = () =>
    setQuestions(SHEET_01.map((item) => ({ id: newId(), ...item })));

  const changeStatus = (id, status) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));

  const deleteQuestion = (id) => {
    const target = questions.find((q) => q.id === id);
    if (target && window.confirm(`Delete "${target.title}"?`)) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const stats = useMemo(() => {
    const done = (list) => list.filter((q) => q.status === "Completed").length;
    const dsa = questions.filter((q) => q.category === "DSA");
    const interview = questions.filter((q) => q.category !== "DSA");
    return {
      total: questions.length,
      dsaTotal: dsa.length,
      dsaDone: done(dsa),
      interviewTotal: interview.length,
      interviewDone: done(interview),
    };
  }, [questions]);

  const visible = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return questions.filter(
      (q) =>
        (!term || q.title.toLowerCase().includes(term)) &&
        (filters.category === "All" || q.category === filters.category) &&
        (filters.status === "All" || q.status === filters.status) &&
        (filters.difficulty === "All" || q.difficulty === filters.difficulty)
    );
  }, [questions, filters]);

  const isFiltering = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);
  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="app">
      <header className="header">
        <h1>Interview Practice Tracker</h1>
        <p className="muted">Track your weekly DSA, Git, and technical interview prep in one place.</p>
      </header>

      <Dashboard stats={stats} machineStatus={machineStatus} onMachineStatusChange={setMachineStatus} />

      <div className="layout">
        <aside className="side">
          <Progress questions={questions} />
          <QuestionForm onAdd={addQuestion} existing={questions} />
        </aside>

        <main className="card main">
          <div className="main-head">
            <h2>Questions</h2>
            <span className="muted">
              {visible.length} of {questions.length}
            </span>
          </div>
          <Filters filters={filters} onChange={setFilters} onReset={clearFilters} isFiltering={isFiltering} />
          <QuestionList
            questions={visible}
            totalCount={questions.length}
            onStatusChange={changeStatus}
            onDelete={deleteQuestion}
            onLoadSheet={loadSheet}
            onClearFilters={clearFilters}
          />
        </main>
      </div>
    </div>
  );
}
