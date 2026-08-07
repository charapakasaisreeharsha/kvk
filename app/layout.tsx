import type { Metadata } from "next";
import { Aboreto, Noto_Serif_Telugu } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aboreto",
});

const telugu = Noto_Serif_Telugu({
  subsets: ["telugu"],
  weight: ["400", "700"],
  variable: "--font-telugu",
});

export const metadata: Metadata = {
  title: "Sri Kuppa Venkata Krishna Murthy",
  description:
    "Official portfolio of Sri Kuppa Venkata Krishna Murthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${aboreto.variable} ${telugu.variable} antialiased`}
      >
        <SmoothScroll />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
