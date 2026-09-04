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
  metadataBase: new URL("https://www.thewallcodes.com"),
  title: "Dhawal Gajwe — Portfolio",
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
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
