import type { Metadata } from "next";
import { Cinzel, Lora, Noto_Serif_Telugu } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";
import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

const telugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  weight: ["400", "700"],
  variable: "--font-telugu",
});

export const metadata: Metadata = {
  title: {
    default: "Sri Kuppa Venkata Krishna Murthy",
    template: "%s | Sri Kuppa Venkata Krishna Murthy",
  },
  description:
    "Official portfolio of Prof. K. V. Krishna Murthy, scholar of Sanskrit literature, Vedic sciences, and modern science.",
  applicationName: "Sri Kuppa Venkata Krishna Murthy",
  keywords: [
    "Kuppa Venkata Krishna Murthy",
    "K. V. Krishna Murthy",
    "Sanskrit scholar",
    "Vedic sciences",
    "Sanskrit literature",
    "Indian scholarship",
  ],
  openGraph: {
    type: "website",
    siteName: "Sri Kuppa Venkata Krishna Murthy",
    title: "Sri Kuppa Venkata Krishna Murthy",
    description:
      "Official portfolio of Prof. K. V. Krishna Murthy, scholar of Sanskrit literature, Vedic sciences, and modern science.",
  },
  twitter: {
    card: "summary",
    title: "Sri Kuppa Venkata Krishna Murthy",
    description:
      "Official portfolio of Prof. K. V. Krishna Murthy, scholar of Sanskrit literature, Vedic sciences, and modern science.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${cinzel.variable} ${telugu.variable} antialiased`}
      >
        <LanguageProvider>
          <SmoothScroll />
          <PageLoader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
