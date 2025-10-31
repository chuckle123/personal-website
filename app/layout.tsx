import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cabinet Designer",
  description: "Design your wooden cabinet with drag & drop and 3D visualization",
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
