"use client";

import { animate, createTimeline } from "animejs";
import {
  BookOpenCheck,
  Building2,
  FileText,
  GraduationCap,
  Handshake,
  Landmark,
  LibraryBig,
  Microscope,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Milestone = {
  role: string;
  org: string;
  years: string;
  context: string;
  icon: LucideIcon;
};

const content: Record<"en" | "te", { heading: string; subheading: string; label: string; milestones: Milestone[] }> = {
  en: {
    label: "Roles & Milestones",
    heading: "A career in service of learning",
    subheading:
      "Each role widened the reach of his work—from teaching and editorial stewardship to research leadership and institutional service.",
    milestones: [
      { role: "Chief Editor", org: "Bhaktimala, Avadhoota Datta Peetham, Mysore", years: "Since 1986", context: "Guiding a monthly publication devoted to spiritual scholarship.", icon: FileText },
      { role: "Trustee", org: "Avadhoota Datta Peetham, Mysore", years: "1986–2000", context: "Supporting the stewardship of a major spiritual institution.", icon: Landmark },
      { role: "Sanskrit Teacher", org: "SGS Veda Sastra Pathasala, Mysore", years: "1986–2004", context: "Teaching a new generation through the traditional pathasala system.", icon: GraduationCap },
      { role: "Educational Officer (Vidyadhikari)", org: "Avadhoota Datta Peetham, Mysore", years: "Since 1990", context: "Shaping its long-term educational direction and curriculum.", icon: BookOpenCheck },
      { role: "Executive Trustee", org: "Sri Bhaktimala Trust, Mysore", years: "1991–2002", context: "Helping turn a literary and devotional mission into sustained work.", icon: Handshake },
      { role: "Selection Committee Member", org: "A.P. Endowments Department", years: "2002", context: "Contributing expert judgment to the selection of Veda Sastra Pandits.", icon: UsersRound },
      { role: "Member", org: "Sri Venkateswara Institute of Higher Vedic Studies, TTD", years: "2003", context: "Bringing traditional insight into a higher-education setting.", icon: Building2 },
      { role: "Chairman & Managing Trustee", org: "Institute of Scientific Research on Vedas (I-SERVE)", years: "2004–2016", context: "Leading research that connects Vedic knowledge with modern inquiry.", icon: Microscope },
      { role: "Board Member, Ayurveda Studies", org: "Dr. N.T.R. University of Medical Sciences, Vijayawada", years: "2008–2009", context: "Offering a Vedic perspective to the study of Ayurveda.", icon: Stethoscope },
      { role: "Professor", org: "School of Vedic Studies & Research, JNIAS, Hyderabad", years: "Academic appointment", context: "Continuing a career of teaching, research and public scholarship.", icon: LibraryBig },
    ],
  },
  te: {
    label: "పాత్రలు & మైలురాళ్లు",
    heading: "విద్యాసేవలో గడిచిన వృత్తి జీవితం",
    subheading:
      "బోధన, సంపాదకత్వం నుండి పరిశోధన నాయకత్వం, సంస్థాగత సేవ వరకు ఒక్కో పాత్ర ఆయన పని పరిధిని విస్తరించింది.",
    milestones: [
      { role: "చీఫ్ ఎడిటర్", org: "భక్తిమాల, అవధూత దత్త పీఠం, మైసూర్", years: "1986 నుండి", context: "ఆధ్యాత్మిక పాండిత్యానికి అంకితమైన మాసపత్రికకు దిశానిర్దేశం.", icon: FileText },
      { role: "ట్రస్టీ", org: "అవధూత దత్త పీఠం, మైసూర్", years: "1986–2000", context: "ఒక ప్రధాన ఆధ్యాత్మిక సంస్థ నిర్వహణకు తోడ్పాటు.", icon: Landmark },
      { role: "సంస్కృత ఉపాధ్యాయుడు", org: "SGS వేద శాస్త్ర పాఠశాల, మైసూర్", years: "1986–2004", context: "సాంప్రదాయ పాఠశాల విధానంలో కొత్త తరానికి బోధన.", icon: GraduationCap },
      { role: "విద్యాధికారి", org: "అవధూత దత్త పీఠం, మైసూర్", years: "1990 నుండి", context: "దీర్ఘకాలిక విద్యా దిశ, పాఠ్యప్రణాళికకు రూపకల్పన.", icon: BookOpenCheck },
      { role: "కార్యనిర్వాహక ట్రస్టీ", org: "శ్రీ భక్తిమాల ట్రస్ట్, మైసూర్", years: "1991–2002", context: "సాహిత్య, భక్తి లక్ష్యాన్ని నిరంతర కార్యంగా మలచడంలో సహకారం.", icon: Handshake },
      { role: "ఎంపిక కమిటీ సభ్యుడు", org: "ఆంధ్రప్రదేశ్ ధార్మిక శాఖ", years: "2002", context: "వేద శాస్త్ర పండితుల ఎంపికలో నిపుణ అభిప్రాయం.", icon: UsersRound },
      { role: "సభ్యుడు", org: "శ్రీ వేంకటేశ్వర ఉన్నత వేద అధ్యయన సంస్థ, TTD", years: "2003", context: "ఉన్నత విద్యా వ్యవస్థలో సాంప్రదాయ అంతర్దృష్టిని అందించడం.", icon: Building2 },
      { role: "చైర్మన్ & మేనేజింగ్ ట్రస్టీ", org: "I-SERVE", years: "2004–2016", context: "వేద జ్ఞానాన్ని ఆధునిక పరిశోధనతో అనుసంధానించే నాయకత్వం.", icon: Microscope },
      { role: "బోర్డు సభ్యుడు, ఆయుర్వేద అధ్యయనాలు", org: "డా. ఎన్.టి.ఆర్. వైద్య విశ్వవిద్యాలయం, విజయవాడ", years: "2008–2009", context: "ఆయుర్వేద అధ్యయనానికి వేద దృక్పథాన్ని అందించడం.", icon: Stethoscope },
      { role: "ప్రొఫెసర్", org: "వేద అధ్యయన & పరిశోధన విభాగం, JNIAS, హైదరాబాద్", years: "అకడమిక్ నియామకం", context: "బోధన, పరిశోధన, ప్రజా పాండిత్య వృత్తిని కొనసాగించడం.", icon: LibraryBig },
    ],
  },
};

export default function Milestones() {
  const { language } = useLanguage();
  const t = content[language];
  const milestones = t.milestones;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reachedMilestone, setReachedMilestone] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = Array.from(section.querySelectorAll<SVGPathElement>("[data-milestone-path]"));
    const drawing = createTimeline({
      autoplay: false,
      defaults: { ease: "linear" },
    });
    paths.forEach((path) => {
      drawing.add(path, { strokeDashoffset: [100, 0], duration: 500 });
    });

    let frame = 0;
    const syncDrawing = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const start = window.innerHeight * 0.78;
      const end = -bounds.height * 0.15;
      const progress = Math.min(1, Math.max(0, (start - bounds.top) / (start - end)));
      drawing.seek(progress * drawing.duration);
      setReachedMilestone(
        progress === 0
          ? -1
          : Math.min(milestones.length - 1, Math.floor(progress * (milestones.length - 1))),
      );
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(syncDrawing);
    };

    syncDrawing();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      drawing.cancel();
    };
  }, [milestones.length]);

  useEffect(() => {
    if (reachedMilestone < 0) return;
    const card = cardRefs.current[reachedMilestone];
    if (!card) return;

    animate(card, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 520,
      delay: 360,
      ease: "outQuad",
    });
  }, [reachedMilestone]);

  return (
    <section ref={sectionRef} className="mb-24" aria-labelledby="milestones-heading">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">{t.label}</p>
        <h3 id="milestones-heading" className="mt-4 text-3xl font-normal text-[var(--foreground)]">{t.heading}</h3>
        <p className="mt-3 leading-7 text-[var(--secondary)]">{t.subheading}</p>
      </div>

      <div className="relative">
        {milestones.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;
          const isLast = index === milestones.length - 1;
          const isReached = index <= reachedMilestone;
          const isCurrent = index === reachedMilestone;
          const routePath = isLeft
            ? "M4 4 H286 Q308 4 308 26 V106 M301 99 L308 106 L315 99"
            : "M316 4 H34 Q12 4 12 26 V106 M5 99 L12 106 L19 99";
          return (
            <div key={item.role} className="relative pb-8 last:pb-0 sm:pb-8">
              <div ref={(node) => { cardRefs.current[index] = node; }} className={`flex items-start gap-5 sm:items-center sm:gap-7 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse sm:text-right"} ${isReached ? "opacity-100" : "translate-y-3 opacity-0"}`}>
                <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border shadow-sm ring-4 ring-[var(--background)] transition-all duration-500 ${isCurrent ? "border-[var(--accent)] bg-[#fff8da] text-[var(--primary)] shadow-[0_0_0_6px_rgba(201,162,39,0.16)]" : isReached ? "border-[var(--accent)]/70 bg-[#fffdf2] text-[var(--primary)]" : "border-[var(--accent)]/40 bg-[var(--background)] text-[var(--primary)]"}`}>
                  <Icon aria-hidden="true" size={27} strokeWidth={1.7} />
                </div>
                <div className={`relative z-10 max-w-md ${isLeft ? "" : "sm:flex sm:flex-col sm:items-end"}`}>
                  <span className={`text-xs font-bold uppercase tracking-[0.16em] ${isReached ? "text-[var(--accent)]" : "text-[var(--primary)]"}`}>{item.years}</span>
                  <h4 className={`mt-1 text-lg font-normal transition-colors duration-500 ${isCurrent ? "text-[var(--primary)]" : "text-[var(--foreground)]"}`}>{item.role}</h4>
                  <p className="mt-1 text-sm font-medium text-[var(--secondary)]">{item.org}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--secondary)]/80">{item.context}</p>
                </div>
              </div>

              {!isLast && <svg className={`pointer-events-none absolute top-10 z-0 hidden h-28 w-80 text-[var(--accent)]/75 sm:block ${isLeft ? "left-[42%]" : "right-[42%]"}`} viewBox="0 0 320 112" fill="none" aria-hidden="true">
                <defs>
                  <mask id={`milestone-route-${index}`} maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="112">
                    <path data-milestone-path pathLength="100" d={routePath} stroke="white" strokeWidth="7" strokeDasharray="100" strokeDashoffset="100" strokeLinecap="round" strokeLinejoin="round" />
                  </mask>
                </defs>
                <path d={routePath} mask={`url(#milestone-route-${index})`} stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
              {!isLast && <span className="absolute left-8 top-16 h-[calc(100%-4rem)] border-l-2 border-dashed border-[var(--accent)]/40 sm:hidden" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}