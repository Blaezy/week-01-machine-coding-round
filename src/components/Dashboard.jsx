import { MACHINE_STATUSES } from "../data/constants";

function StatCard({ label, value, hint, children }) {
  return (
    <div className="card stat">
      <p className="stat-label">{label}</p>
      {children ?? <p className="stat-value">{value}</p>}
      {hint && <p className="stat-hint">{hint}</p>}
    </div>
  );
}

export default function Dashboard({ stats, machineStatus, onMachineStatusChange }) {
  const { total, dsaDone, dsaTotal, interviewDone, interviewTotal } = stats;

  return (
    <section className="dashboard" aria-label="Summary">
      <StatCard label="Total questions" value={total} hint="Across all categories" />
      <StatCard
        label="DSA problems completed"
        value={`${dsaDone} / ${dsaTotal}`}
        hint="LeetCode practice"
      />
      <StatCard
        label="Interview questions completed"
        value={`${interviewDone} / ${interviewTotal}`}
        hint="Git and Technical"
      />
      <StatCard label="Machine coding" hint="Weekly frontend task">
        <select
          className={`machine-select ${machineStatus.replace(/\s/g, "-").toLowerCase()}`}
          value={machineStatus}
          onChange={(e) => onMachineStatusChange(e.target.value)}
          aria-label="Machine coding status"
        >
          {MACHINE_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </StatCard>
    </section>
  );
}
