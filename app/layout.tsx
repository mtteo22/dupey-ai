import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dupey.ai",
  description: "Find the best price or a better dupe — instantly for beauty, personal care & wellness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}