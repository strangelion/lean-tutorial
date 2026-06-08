import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lean 中文交互式教程",
  description: "浏览器内学习 Lean 4 定理证明 — 零基础入门，全中文交互式教程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Lean 中文教程
            </a>
            <span className="text-sm text-gray-500">
              交互式定理证明入门
            </span>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          Built with Lean 4 + Next.js — 让形式化证明触手可及
        </footer>
      </body>
    </html>
  );
}
