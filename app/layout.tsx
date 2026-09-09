import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Линкбичлэг",
  description: "Монгол бичлэгийн вэб UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
