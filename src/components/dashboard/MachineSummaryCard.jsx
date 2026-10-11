import Icon from "../common/Icon";
import { roundProgress, roundStatus } from "../../utils/progress";
import { statusClass } from "../../utils/questionHelpers";

// Feature-level summary of the selected week's coding round. Uses the same progress calculation
// as the Machine Coding page.
export default function MachineSummaryCard({ round, onCreateRound }) {
  const { done, total, percent } = roundProgress(round);
  const status = roundStatus(round);
  return (
    <section className="card cat-machine">
      <div className="card-head">
        <h2>Machine coding</h2>
        {round && <span className={`muted ${statusClass(status)}`}>{status}</span>}
      </div>
      {round ? (
        <div className="resume">
          <p className="resume-title">{round.title}</p>
          <div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="muted resume-meta">
              {done} / {total} features completed
            </p>
          </div>
          <a className="link" href="#/machine">
            Open machine coding <Icon name="arrow" size={14} />
          </a>
        </div>
      ) : (
        <div className="resume">
          <p className="muted">No coding round for this week yet.</p>
          <div>
            <button type="button" className="btn primary" onClick={onCreateRound}>
              Create Coding Round
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
