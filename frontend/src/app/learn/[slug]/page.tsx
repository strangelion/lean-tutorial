"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import LeanEditor from "@/components/LeanEditor";
import GoalDisplay from "@/components/GoalDisplay";
import LessonNav from "@/components/LessonNav";
import ProgressBar from "@/components/ProgressBar";
import { getProgress, markLessonCompleted } from "@/lib/progress";
import type { UserProgress } from "@/lib/progress";
import { getAllLessons, getLesson, type LessonMeta } from "@/content/lessons";

// generateStaticParams is in layout.tsx (server component)

const LESSON_LIST = getAllLessons();

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = getLesson(slug) as LessonMeta | undefined;
  const [completed, setCompleted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    completedExercises: {},
  });

  useEffect(() => {
    setProgress(getProgress());
  }, [slug]);

  const completedCount = LESSON_LIST.filter((l) =>
    progress.completedLessons.includes(l.slug),
  ).length;

  const handleSuccess = useCallback(() => {
    setCompleted(true);
    if (lesson) {
      markLessonCompleted(lesson.slug);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到课程</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <ProgressBar current={completedCount} total={LESSON_LIST.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column: lesson content */}
        <div className="lg:col-span-3 space-y-5">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-gray-400">
                第 {lesson.order} 课
              </span>
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {lesson.title}
            </h1>
          </div>

          {/* Introduction (like NNG's Introduction) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Introduction
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {lesson.introduction}
            </div>
          </div>

          {/* New tactics & concepts (like NNG's inventory) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              本关学到的新东西
            </h2>

            {lesson.newTactics.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-green-700 mb-2">
                  策略 (Tactics)
                </h3>
                <div className="space-y-2">
                  {lesson.newTactics.map((t) => (
                    <div
                      key={t.name}
                      className="flex gap-2 text-sm border-l-2 border-green-300 pl-3"
                    >
                      <code className="text-green-700 font-mono font-semibold shrink-0">
                        {t.name}
                      </code>
                      <span className="text-gray-600">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lesson.newConcepts.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-blue-700 mb-2">
                  概念 (Concepts)
                </h3>
                <div className="space-y-2">
                  {lesson.newConcepts.map((c) => (
                    <div
                      key={c.name}
                      className="flex gap-2 text-sm border-l-2 border-blue-300 pl-3"
                    >
                      <code className="text-blue-700 font-mono font-semibold shrink-0">
                        {c.name}
                      </code>
                      <span className="text-gray-600">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Goal */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              证明目标
            </h2>
            <GoalDisplay
              goal={lesson.goal}
              hypotheses={
                lesson.hypotheses.length > 0
                  ? lesson.hypotheses
                  : undefined
              }
            />
          </div>

          {/* Step-by-step hints (like NNG's Hint) */}
          <div className="bg-white border border-amber-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3">
              分步提示
            </h2>
            <ol className="space-y-2.5">
              {lesson.hints.map((hint, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-gray-700"
                >
                  <span className="text-amber-500 font-bold shrink-0">
                    {i + 1}.
                  </span>
                  <span>{hint}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Solution (collapsible) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              {showSolution ? "收起参考解答 ▲" : "查看参考解答 ▼"}
            </button>
            {showSolution && (
              <pre className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono text-gray-800 overflow-x-auto">
                {lesson.solution}
              </pre>
            )}
          </div>

          {/* Conclusion (like NNG's Conclusion) */}
          {completed && (
            <div className="bg-green-50 border border-green-300 rounded-lg p-6">
              <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3">
                Conclusion
              </h2>
              <div className="text-sm text-green-800 leading-relaxed whitespace-pre-line">
                {lesson.conclusion}
              </div>
            </div>
          )}
        </div>

        {/* Right column: editor */}
        <div className="lg:col-span-2">
          <div className="sticky top-4 space-y-4">
            {/* Quick usage guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
              <strong>怎么玩：</strong>
              编辑器里有预写代码。
              直接点 <strong>运行 ▶</strong> 看效果，
              或修改代码后运行。
              卡住了看左侧的提示。
            </div>
            <LeanEditor
              initialCode={lesson.initialCode}
              exerciseId={lesson.slug}
              lessonSlug={lesson.slug}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>

      <LessonNav lessons={LESSON_LIST} currentSlug={lesson.slug} />
    </div>
  );
}
