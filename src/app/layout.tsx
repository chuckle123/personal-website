import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CW9V9FDP34"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted'
            });
            gtag('config', 'G-CW9V9FDP34');
          `}
        </Script>
      </head>
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
