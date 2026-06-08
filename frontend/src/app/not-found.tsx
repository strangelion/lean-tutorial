import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          页面未找到
        </h2>
        <p className="text-gray-600 mb-6">
          你要找的页面不存在，可能已经被移动或删除。
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
