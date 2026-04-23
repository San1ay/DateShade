"use client";

import { useEffect, useRef, useState } from "react";
import MonthGrid from "@/components/monthGrid";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const INITIAL_RANGE = 5;

function yearLabel(year: number, currentYear: number) {
  const diff = year - currentYear;
  if (diff === 0) return "— now";
  if (diff === 1) return "— next year";
  if (diff === -1) return "— last year";
  if (diff > 0) return `— ${diff} years from now`;
  return `— ${Math.abs(diff)} years ago`;
}

export default function Home() {
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const currentYearRef = useRef<HTMLElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  const [minYear, setMinYear] = useState(currentYear - INITIAL_RANGE);
  const [maxYear, setMaxYear] = useState(currentYear + INITIAL_RANGE);

  useEffect(() => {
    currentYearRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target === topSentinelRef.current) setMinYear(y => y - 5);
        if (entry.target === bottomSentinelRef.current) setMaxYear(y => y + 5);
      });
    }, { rootMargin: "200px" });

    if (topSentinelRef.current) observer.observe(topSentinelRef.current);
    if (bottomSentinelRef.current) observer.observe(bottomSentinelRef.current);

    return () => observer.disconnect();
  }, []);

  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  return (
    <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
      <style>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem;
        }
        @media (min-width: 640px) {
          .calendar-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .calendar-grid { grid-template-columns: repeat(6, 1fr); }
        }
      `}</style>

      <div ref={topSentinelRef} style={{ height: "1px" }} />

      {years.map(year => (
        <section
          key={year}
          id={`year-${year}`}
          ref={year === currentYear ? currentYearRef : null}
          style={{ marginBottom: "4rem", scrollMarginTop: "1rem" }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.2em", marginBottom: "2rem", opacity: year === currentYear ? 0.9 : 0.5 }}>
            {year}{" "}
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>
              {yearLabel(year, currentYear)}
            </span>
          </h2>

          <div className="calendar-grid">
            {Array.from({ length: 12 }, (_, mi) => (
              <MonthGrid
                key={mi}
                month={mi + 1}
                monthName={MONTHS[mi]}
                year={year}
                today={today}
              />
            ))}
          </div>
        </section>
      ))}

      <div ref={bottomSentinelRef} style={{ height: "1px" }} />
    </div>
  );
}