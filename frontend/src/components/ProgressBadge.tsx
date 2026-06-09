"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";

export default function ProgressBadge({ total }: { total: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const progress = getProgress();
    setCount(progress.completedLessons.length);
  }, []);

  return (
    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
      已学 {count} / {total} 课
    </span>
  );
}
