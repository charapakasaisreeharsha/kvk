import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View photographs from the life and work of Prof. K. V. Krishna Murthy, including teaching, scholarship, publications, and public appearances.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
