import Button from "../common/Button";
import EmptyState from "../common/EmptyState";

export default function CodingRoundEmptyState({ onCreate }) {
  return (
    <EmptyState
      tall
      title="No coding round for this week"
      text="Create the week's machine-coding assignment with its own tags and a list of features. Each feature becomes a question you can track."
    >
      <Button variant="primary" onClick={onCreate}>
        Create Coding Round
      </Button>
    </EmptyState>
  );
}
