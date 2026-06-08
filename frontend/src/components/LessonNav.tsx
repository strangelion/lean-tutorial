import Link from "next/link";

interface Lesson {
  slug: string;
  title: string;
  order: number;
  description?: string;
  duration?: string;
}

interface LessonNavProps {
  lessons: Lesson[];
  currentSlug: string;
}

export default function LessonNav({ lessons, currentSlug }: LessonNavProps) {
  const currentIndex = lessons.findIndex((l) => l.slug === currentSlug);

  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <nav className="flex items-center justify-between py-4 border-t border-gray-200 mt-8">
      <div>
        {prevLesson && (
          <Link
            href={`/learn/${prevLesson.slug}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            上一课：{prevLesson.title}
          </Link>
        )}
      </div>
      <span className="text-sm text-gray-500">
        第 {currentIndex + 1} / {lessons.length} 课
      </span>
      <div>
        {nextLesson && (
          <Link
            href={`/learn/${nextLesson.slug}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            下一课：{nextLesson.title}
          </Link>
        )}
      </div>
    </nav>
  );
}
