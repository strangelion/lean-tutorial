interface GoalDisplayProps {
  goal: string;
  hypotheses?: string[];
}

export default function GoalDisplay({
  goal,
  hypotheses,
}: GoalDisplayProps) {
  return (
    <div className="border border-blue-200 rounded-lg bg-blue-50 p-4 font-mono text-sm">
      <div className="text-blue-600 font-semibold mb-2">当前目标</div>
      {hypotheses && hypotheses.length > 0 && (
        <div className="mb-2">
          {hypotheses.map((h, i) => (
            <div key={i} className="text-gray-700">
              {h}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-start gap-2 text-gray-900">
        <span className="text-blue-500 font-bold shrink-0">⊢</span>
        <span>{goal}</span>
      </div>
    </div>
  );
}
