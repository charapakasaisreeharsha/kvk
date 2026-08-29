"use client";

import SmoothAnchorLink from "@/components/SmoothAnchorLink";
import { useLanguage } from "@/components/LanguageProvider";
import {
  Archive,
  BookOpen,
  Home,
  Images,
  Languages,
  Mail,
  Menu,
  Route,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", en: "Home", te: "హోమ్", icon: Home },
  { href: "about", en: "About", te: "పరిచయం", icon: UserRound },
  { href: "#journey", en: "Journey", te: "ప్రయాణం", icon: Route },
  { href: "#books", en: "Books", te: "గ్రంథాలు", icon: BookOpen },
  { href: "#awards", en: "Awards", te: "పురస్కారాలు", icon: Trophy },
  { href: "#contact", en: "Contact", te: "సంప్రదించండి", icon: Mail },
  { href: "#gallery", en: "Gallery", te: "గ్యాలరీ", icon: Images },
  { href: "/archive", en: "Archive", te: "Archive", icon: Archive },
]
  .map((link) => {
    if (link.href === "about") return { ...link, href: "/about" };
    if (link.href === "#gallery") return { ...link, href: "/gallery" };
    if (link.href.startsWith("#")) return { ...link, href: `/${link.href}` };
    return link;
  });

const labelMotion = {
  initial: { opacity: 0, y: 7 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -7 },
};

export default function Navbar({ sticky = true }: { sticky?: boolean }) {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLanguage = language === "en" ? "te" : "en";

  useEffect(() => {
    const updateNavbarBackground = () => {
      const hero = document.getElementById("hero");
      setPastHero(!hero || window.scrollY >= hero.offsetHeight - 80);
    };

    updateNavbarBackground();
    window.addEventListener("scroll", updateNavbarBackground, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbarBackground);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
        if (entry.isIntersecting) setMenuOpen(false);
      },
      { threshold: 0.08 },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      aria-hidden={footerVisible}
      className={`${sticky ? "fixed inset-x-0 top-0" : "relative"} z-50 px-3 py-3 transition-all duration-500 sm:px-6 sm:py-5 ${
        footerVisible ? "pointer-events-none -translate-y-5 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex w-full max-w-6xl items-center justify-center gap-x-1 gap-y-2 rounded-2xl px-3 py-2 transition-[background-color,box-shadow] duration-500 sm:rounded-full sm:px-5 ${
          pastHero
            ? "bg-[#8b6b2f] shadow-[0_12px_32px_rgba(80,25,0,0.24)]"
            : "bg-transparent shadow-none"
        }`}
      >
        <ul className="hidden flex-1 flex-wrap items-center justify-center gap-x-1 gap-y-1 sm:gap-x-2 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <SmoothAnchorLink
                href={link.href}
                scroll
                aria-current={pathname === link.href ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-3 sm:text-sm ${
                  pathname === link.href ? "bg-white/20" : ""
                }`}
              >
                <link.icon className="size-3.5" aria-hidden="true" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={language}
                    {...labelMotion}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="block"
                  >
                    {link[language]}
                  </motion.span>
                </AnimatePresence>
              </SmoothAnchorLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggleLanguage}
          aria-label={`Switch navigation language to ${otherLanguage === "en" ? "English" : "Telugu"}`}
          className="group flex shrink-0 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#8b6b2f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-4 sm:text-sm"
        >
          <Languages className="size-4 transition-transform duration-300 group-hover:rotate-12" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={language}
              {...labelMotion}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="min-w-5"
            >
              {language === "en" ? "EN" : "తె"}
            </motion.span>
          </AnimatePresence>
        </button>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-1 rounded-full p-2 text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`mx-auto mt-2 max-w-6xl rounded-2xl p-2 shadow-[0_12px_32px_rgba(80,25,0,0.24)] transition-colors duration-500 lg:hidden ${
              pastHero ? "bg-[#8b6b2f]" : "bg-[#8b6b2f]/95 backdrop-blur-md"
            }`}
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <SmoothAnchorLink
                    href={link.href}
                    scroll
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      pathname === link.href ? "bg-white/20" : ""
                    }`}
                  >
                    <link.icon className="size-4 shrink-0" aria-hidden="true" />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={language}
                        {...labelMotion}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="block"
                      >
                        {link[language]}
                      </motion.span>
                    </AnimatePresence>
                  </SmoothAnchorLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
