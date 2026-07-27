"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    hideTimer.current = setTimeout(() => setVisible(false), 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");

      if (!hero) return;

      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      const isPastHero = window.scrollY >= heroBottom - 80;
      setPastHero(isPastHero);

      if (!isPastHero) {
        setVisible(true);
        return;
      }

      setVisible(true);
      scheduleHide();
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, []);

  return (
    <header
      onMouseEnter={() => {
        if (hideTimer.current) {
          clearTimeout(hideTimer.current);
        }
        setVisible(true);
      }}
      onMouseLeave={() => {
        if (pastHero) {
          scheduleHide();
        }
      }}
      className={`fixed left-1/2 top-3 z-50 w-full max-w-7xl -translate-x-1/2 px-4 transition-all duration-500 sm:top-6 sm:px-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 pointer-events-none opacity-0"
      }`}
    >
      <nav
        className={`flex h-14 items-center justify-between rounded-full border px-4 transition-colors duration-500 sm:h-16 sm:px-8 ${
          pastHero
            ? "border-[#b7833f] bg-[#a87532] shadow-[0_8px_32px_rgba(0,0,0,.25)]"
            : "border-transparent bg-transparent shadow-none"
        }`}
      >
        {/* Logo / Name */}
        <div>
          <h1 className="max-w-48 text-xs font-bold tracking-wide text-white sm:max-w-none sm:text-lg">
            Sri Kuppa Venkata Krishna Murthy
          </h1>
        </div>

        {/* Language Toggle */}
        <div className="hidden items-center rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-xl sm:flex">
          <button
            onClick={() => setLanguage("en")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              language === "en"
                ? "bg-white text-black shadow"
                : "text-white hover:bg-white/10"
            }`}
          >
            EN
          </button>

          <button
            onClick={() => setLanguage("te")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              language === "te"
                ? "bg-white text-black shadow"
                : "text-white hover:bg-white/10"
            }`}
          >
            తె
          </button>
        </div>

        {/* Navigation */}
        <ul className="hidden items-center gap-5 text-sm font-bold tracking-wide text-white xl:flex">
          <li>
            <Link href="#about" className="transition hover:text-amber-300">
              {language === "en" ? "About" : "పరిచయం"}
            </Link>
          </li>

          <li>
            <Link href="#journey" className="transition hover:text-amber-300">
              {language === "en" ? "Journey" : "ప్రయాణం"}
            </Link>
          </li>

          <li>
            <Link href="#research" className="transition hover:text-amber-300">
              {language === "en" ? "Research" : "పరిశోధన"}
            </Link>
          </li>

          <li>
            <Link href="#books" className="transition hover:text-amber-300">
              {language === "en" ? "Books" : "గ్రంథాలు"}
            </Link>
          </li>

          <li>
            <Link href="#awards" className="transition hover:text-amber-300">
              {language === "en" ? "Awards" : "పురస్కారాలు"}
            </Link>
          </li>

          <li>
            <Link href="#contact" className="transition hover:text-amber-300">
              {language === "en" ? "Contact" : "సంప్రదించండి"}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => {
            if (hideTimer.current) clearTimeout(hideTimer.current);
            setVisible(true);
            setMenuOpen((isOpen) => !isOpen);
          }}
          className="rounded-full p-2 text-white transition hover:bg-white/10 xl:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          className={`mt-3 rounded-2xl border p-4 shadow-[0_8px_32px_rgba(0,0,0,.25)] xl:hidden ${
            pastHero
              ? "border-[#b7833f] bg-[#a87532]"
              : "border-white/20 bg-black/30 backdrop-blur-xl"
          }`}
        >
          <div className="mb-4 flex items-center justify-between rounded-full border border-white/20 bg-white/10 p-1 sm:hidden">
            <button
              onClick={() => setLanguage("en")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${language === "en" ? "bg-white text-black" : "text-white"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("te")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${language === "te" ? "bg-white text-black" : "text-white"}`}
            >
              తె
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm font-bold text-white sm:grid-cols-3">
            {[
              ["#about", language === "en" ? "About" : "పరిచయం"],
              ["#journey", language === "en" ? "Journey" : "ప్రయాణం"],
              ["#research", language === "en" ? "Research" : "పరిశోధన"],
              ["#books", language === "en" ? "Books" : "గ్రంథాలు"],
              ["#awards", language === "en" ? "Awards" : "పురస్కారాలు"],
              ["#contact", language === "en" ? "Contact" : "సంప్రదించండి"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 transition hover:bg-white/10"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
