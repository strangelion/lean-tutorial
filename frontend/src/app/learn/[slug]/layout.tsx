import { getAllLessons } from "@/content/lessons";

export function generateStaticParams() {
  const lessons = getAllLessons();
  return lessons.map((l) => ({ slug: l.slug }));
}

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
