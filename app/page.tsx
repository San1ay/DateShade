"use client";

import { useEffect, useRef, useState } from "react";
import MonthGrid from "@/components/monthGrid";
import { MONTHS } from "@/utils/constants";
import ScrollYearSelector from "@/components/ScrollYearSelector";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const handleCheckYear = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const y = formData.get("year");
    if (y) {
      router.push(`/${y}`);
    }
  };

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
        /* Hides the default browser arrows on number inputs */
        .no-spinners::-webkit-outer-spin-button,
        .no-spinners::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        .no-spinners {
            -moz-appearance: textfield;
        }
      `}</style>

      {/* Fixed Year Overview Form */}
      <form
        onSubmit={handleCheckYear}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem",
          borderRadius: "8px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>
          Check Year Overview
        </span>
        <input
          name="year"
          type="number"
          defaultValue={currentYear}
          className="no-spinners"
          style={{
            fontSize: "1rem",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid currentColor",
            outline: "none",
            width: "3.5rem",
            fontFamily: "inherit",
            textAlign: "center",
            opacity: 0.8,
          }}
        />
        <button
          type="submit"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            opacity: 0.6,
            fontFamily: "inherit",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            padding: "0"
          }}
          aria-label="Go"
        >
          &rarr;
        </button>
      </form>

      <div ref={topSentinelRef} style={{ height: "1px" }} />

      {years.map(year => (
        <section
          key={year}
          id={`year-${year}`}
          ref={year === currentYear ? currentYearRef : null}
          style={{ marginBottom: "4rem", scrollMarginTop: "1rem" }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "1.5rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              marginBottom: "2rem",
              opacity: year === currentYear ? 0.9 : 0.5
            }}
          >
            <ScrollYearSelector currentYear={year} />

            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0.5
              }}
            >
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