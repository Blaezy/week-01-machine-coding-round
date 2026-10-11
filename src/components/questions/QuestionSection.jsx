import QuestionsPanel from "./QuestionsPanel";
import { Band, BandProgress, PageBody } from "../common/Band";
import { useApp } from "../../context/AppContext";
import { SECTIONS } from "../../data/constants";
import { percentOf } from "../../utils/progress";

// Shared by DSA, Git and Technical pages
export default function QuestionSection({ sectionKey }) {
  const { week, items, stats, changeStatus, deleteQuestion, openModal } = useApp();
  const section = SECTIONS[sectionKey];
  const { done, total } = stats[sectionKey];

  return (
    <>
      <Band cat={sectionKey} eyebrow={week.name} title={section.title} tagline={section.blurb}>
        <BandProgress done={done} total={total} percent={percentOf(done, total)} unit={section.unit} />
      </Band>
      <PageBody>
        <QuestionsPanel
          title={`${section.title} questions`}
          items={items}
          category={section.category}
          onStatusChange={changeStatus}
          onDelete={deleteQuestion}
          onAdd={() => openModal("question")}
        />
      </PageBody>
    </>
  );
}
