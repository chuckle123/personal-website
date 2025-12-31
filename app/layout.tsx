import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog Management Assistant",
  description: "AI-powered blog management with article search and creation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
