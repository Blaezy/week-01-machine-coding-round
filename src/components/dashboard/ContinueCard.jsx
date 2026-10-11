import Icon from "../common/Icon";
import { statusClass, timeAgo } from "../../utils/questionHelpers";

export default function ContinueCard({ item }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>Continue where you left off</h2>
        {item && <span className="muted">{timeAgo(item.at)}</span>}
      </div>
      {item ? (
        <div className="resume">
          <p className="muted">{item.label}</p>
          <p className="resume-title">{item.title}</p>
          <div className="tags">
            <span className={`tag ${statusClass(item.status)}`}>{item.status}</span>
            {item.detail && <span className="tag">{item.detail}</span>}
          </div>
          <a className="link" href={item.href}>
            {item.status === "Completed" ? "Review" : "Resume"} <Icon name="arrow" size={14} />
          </a>
        </div>
      ) : (
        <p className="muted">Nothing to resume yet. Update a question or work on a coding round and it will show up here.</p>
      )}
    </section>
  );
}
