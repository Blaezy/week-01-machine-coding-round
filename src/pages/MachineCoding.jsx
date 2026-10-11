import CodingRoundHeader from "../components/machine-coding/CodingRoundHeader";
import CodingFeatureList from "../components/machine-coding/CodingFeatureList";
import CodingRoundEmptyState from "../components/machine-coding/CodingRoundEmptyState";
import { PageBody } from "../components/common/Band";
import { useApp } from "../context/AppContext";
import { getMachineItems } from "../utils/questionHelpers";

export default function MachineCoding() {
  const { week, changeStatus, deleteQuestion, openModal } = useApp();

  return (
    <>
      <CodingRoundHeader week={week} round={week.round} />
      <PageBody>
        {week.round ? (
          <CodingFeatureList
            items={getMachineItems(week)}
            onStatusChange={changeStatus}
            onEditRound={() => openModal("round-edit")}
            onDeleteFeature={deleteQuestion}
          />
        ) : (
          <CodingRoundEmptyState onCreate={() => openModal("round-create")} />
        )}
      </PageBody>
    </>
  );
}
