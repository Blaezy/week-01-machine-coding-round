import { useMemo } from "react";
import ProgressOverview from "../components/dashboard/ProgressOverview";
import { WeeklyChart, ActivityChart, Donut } from "../components/dashboard/Charts";
import QuestionsPanel from "../components/questions/QuestionsPanel";
import { Card, CardHead } from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";
import { PageBody } from "../components/common/Band";
import { useApp } from "../context/AppContext";
import { getWeekActivity } from "../utils/questionHelpers";

const GRID = "grid grid-cols-1 gap-[18px] tablet:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]";

export default function Dashboard() {
  const { week, weeks, items, stats, changeStatus, deleteQuestion, loadSheet, openModal } = useApp();
  const activity = useMemo(() => getWeekActivity(weeks), [weeks]);

  const message =
    stats.total === 0
      ? "Add your first question to start this week."
      : stats.percent === 100
        ? "Week cleared. Every question is done."
        : `${stats.total - stats.done} questions left. Focus on understanding, not just completing.`;

  return (
    <>
      <ProgressOverview stats={stats} />

      <PageBody>
        <div className={GRID}>
          <section className="relative grid content-center gap-2.5 overflow-hidden rounded-[14px] bg-[linear-gradient(120deg,#1b201d_40%,#2b332e)] p-7 text-[#f2f0ea] after:absolute after:-bottom-[50px] after:-right-10 after:size-60 after:rounded-full after:bg-[radial-gradient(circle,rgba(217,130,43,0.35),transparent_70%)] after:content-['']">
            <p className="text-[0.85rem] tracking-[0.04em] text-[#c9cdc5]">This week · {week.name}</p>
            <h2 className="font-heading text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.15] tracking-[-0.02em]">
              Stay Consistent.
              <br />
              Make Real Progress.
            </h2>
            <p className="max-w-[46ch] text-[#c9cdc5]">{message}</p>
            <div className="relative z-[1] mt-1.5 flex max-w-[360px] items-center gap-3">
              <ProgressBar className="flex-1" percent={stats.percent} track="bg-white/16" fill="bg-[#d9822b]" />
              <strong>{stats.percent}%</strong>
            </div>
          </section>

          <Card>
            <CardHead title="Submission overview" />
            <Donut stats={stats} />
          </Card>
        </div>

        <div className={GRID}>
          <Card>
            <CardHead title="Weekly activity" aside={`${activity.total} completed this week`} />
            <ActivityChart days={activity.days} />
            {activity.total === 0 && (
              <p className="mt-3 text-[0.86rem] text-muted">
                Completions are logged from today. Mark a question or feature done to see it here.
              </p>
            )}
          </Card>

          <Card>
            <CardHead title="Weekly progress" aside={week.name} />
            <WeeklyChart stats={stats} />
          </Card>
        </div>

        <QuestionsPanel
          id="all-questions"
          title="All questions"
          items={items}
          onStatusChange={changeStatus}
          onDelete={deleteQuestion}
          onAdd={() => openModal("question")}
          onLoadSheet={loadSheet}
        />
      </PageBody>
    </>
  );
}
