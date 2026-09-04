import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://www.thewallcodes.com"),
  title: {
    default: "Dhawal Gajwe — AI Engineer",
    template: "%s · Dhawal Gajwe",
  },
  description:
    "AI engineer. Shipped iOS apps, production LLM systems, and voice agents — proof of work, not just a resume.",
  openGraph: {
    title: "Dhawal Gajwe — Portfolio",
    description:
      "AI engineer. Shipped iOS apps, production LLM systems, and voice agents — proof of work, not just a resume.",
    url: "https://www.thewallcodes.com",
    siteName: "Dhawal Gajwe",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  keywords: [
    "Dhawal Gajwe",
    "AI engineer",
    "machine learning engineer",
    "LLM",
    "RAG",
    "voice AI",
    "iOS apps",
    "portfolio",
  ],
  authors: [{ name: "Dhawal Gajwe", url: "https://www.thewallcodes.com" }],
  creator: "Dhawal Gajwe",
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dhawal Gajwe",
  jobTitle: "AI Engineer",
  url: "https://www.thewallcodes.com",
  sameAs: [
    "https://github.com/BillDhawal",
    "https://www.linkedin.com/in/dhawalgajwe/",
  ],
  knowsAbout: [
    "Machine Learning",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Voice AI",
    "iOS Development",
  ],
  alumniOf: "University of Arizona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
