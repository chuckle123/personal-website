import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MagneticDotGrid from "@/components/MagneticDotGrid";

export const metadata: Metadata = {
  title: "Cameron Spencer — AI Engineer",
  description:
    "Staff software engineer specializing in AI/LLM integration, TypeScript, React, and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="px-6 py-8 max-w-content mx-auto">
        <MagneticDotGrid />
        <header className="relative z-10 bg-bg mb-8">
          <Navigation />
        </header>
        <main className="relative z-10 bg-bg">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
