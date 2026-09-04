import Link from "next/link";
import SmoothAnchorLink from "@/components/SmoothAnchorLink";
import { ArrowUpRight, PenLine } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Journey", href: "/journey" },
  { label: "Gurus", href: "/gurus" },
  { label: "Books", href: "/archive" },
  { label: "Gallery", href: "/gallery" },
  { label: "Awards", href: "/#awards" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[var(--foreground)] text-[var(--background)]">
      <div
        id="contact"
        className="relative overflow-hidden bg-[var(--primary)] bg-cover bg-center bg-no-repeat px-4 pb-6 pt-8 text-[var(--background)] sm:px-6 sm:pb-10 sm:pt-12 md:px-10 lg:px-16 lg:pt-14"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139, 107, 47, 0.88), rgba(139, 107, 47, 0.88)), url('/footer-bg.png')",
        }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 lg:max-w-xl">
            <h2 className="text-3xl font-semibold leading-none sm:text-4xl">Let&apos;s connect</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--background)]/80 sm:mt-4 sm:text-base">
              विद्या ददाति विनयं विनयाद्याति पात्रताम्।
            </p>
          </div>

          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-6 border-t border-[var(--background)]/20 pt-6 sm:gap-x-10 lg:w-auto lg:border-0 lg:pt-0">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-1.5 text-left text-sm font-medium sm:text-base lg:text-right">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SmoothAnchorLink
                      href={link.href}
                      className="inline-flex items-center gap-1 text-[var(--background)]/80 transition-colors hover:text-[var(--background)]"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </SmoothAnchorLink>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="flex flex-col gap-1.5 text-right text-sm font-medium sm:text-base">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <span className="inline-flex items-center gap-1 text-[var(--background)]/60">
                    {link.label}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mt-10 select-none leading-[0.85] sm:mt-16 md:mt-20">
          <span
            className="block whitespace-nowrap pr-6 font-bold tracking-[-0.06em] text-[var(--background)]"
            style={{ fontSize: "clamp(2.25rem, 12vw, 10rem)" }}
          >
            KVKM Legacy.
          </span>
          <Link
            href="/admin"
            scroll
            aria-label="Admin login"
            title="Admin login"
            className="absolute bottom-0 right-0 rounded p-1 text-[var(--background)]/20 transition-opacity hover:text-[var(--background)]/70 focus-visible:text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--background)]"
          >
            <PenLine className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-1.5 border-t border-[var(--background)]/20 pt-4 text-xs leading-5 text-[var(--background)]/70 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-sm">
          <p>© {new Date().getFullYear()} KVKM Legacy.</p>
          <p>Built with care, for the pursuit of knowledge.</p>
        </div>
      </div>
    </footer>
  );
}
