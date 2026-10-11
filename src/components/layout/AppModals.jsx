import Modal from "../common/Modal";
import Toast from "../common/Toast";
import QuestionForm from "../questions/QuestionForm";
import CodingRoundForm from "../machine-coding/CodingRoundForm";
import ManageWeeks from "../weeks/ManageWeeks";
import { useApp } from "../../context/AppContext";
import useRouteKey from "../../hooks/useRouteKey";
import { SECTIONS } from "../../data/constants";

export default function AppModals() {
  const app = useApp();
  const { week, modal, closeModal } = app;
  const routeKey = useRouteKey();
  const roundMode = modal === "round-edit" ? "edit" : "create";

  return (
    <>
      {modal === "question" && (
        <Modal title="Add a question" onClose={closeModal}>
          <QuestionForm
            onAdd={(data) => {
              app.addQuestion(data);
              closeModal();
            }}
            onCancel={closeModal}
            existing={week.questions}
            defaultCategory={SECTIONS[routeKey]?.category ?? "DSA"}
          />
        </Modal>
      )}
      {(modal === "round-create" || modal === "round-edit") && (
        <Modal title={roundMode === "edit" && week.round ? "Edit coding round" : "Create coding round"} onClose={closeModal} wide>
          <CodingRoundForm
            key={`${week.id}-${modal}`}
            initial={roundMode === "edit" ? week.round : null}
            onSave={(data) => {
              app.saveRound(data);
              closeModal();
            }}
            onCancel={closeModal}
            onDelete={() => app.deleteRound() && closeModal()}
          />
        </Modal>
      )}
      {modal === "weeks" && (
        <Modal title="Manage Weeks" onClose={closeModal} wide>
          <ManageWeeks
            weeks={app.weeks}
            currentWeekId={week.id}
            onAdd={app.addWeek}
            onRename={app.renameWeek}
            onDelete={app.deleteWeek}
            onClose={closeModal}
          />
        </Modal>
      )}
      <Toast toast={app.toast} onUndo={app.undoDelete} onClose={app.dismissToast} />
    </>
  );
}
