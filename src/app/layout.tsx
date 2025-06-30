import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Development",
  ],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    url: SITE_CONFIG.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
