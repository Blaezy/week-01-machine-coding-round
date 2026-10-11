import QuestionsPanel from "../questions/QuestionsPanel";
import { FEATURE_COPY, MACHINE } from "../../data/constants";

export default function CodingFeatureList({ items, onStatusChange, onEditRound, onDeleteFeature }) {
  return (
    <QuestionsPanel
      title="Machine Coding features"
      items={items}
      category={MACHINE}
      copy={FEATURE_COPY}
      onStatusChange={onStatusChange}
      onDelete={onDeleteFeature}
      onAdd={onEditRound}
    />
  );
}
