"use client";

import { useEffect, useRef } from "react";
import { differenceInCalendarYears } from "date-fns";
import MonthGrid from "@/components/monthGrid";
import { MONTHS } from "@/utils/constants";
import YearDetails from "@/components/yearDetails";
import MonthSelector from "@/components/monthSelector";
import YearSelector from "@/components/yearSelector";
import HomeButton from "@/components/homeButton";

function yearLabel(year: number, currentYear: number) {
    const diff = differenceInCalendarYears(new Date(year, 0, 1), new Date(currentYear, 0, 1));
    let relativeText = "";
    if (diff === 0) relativeText = "this year";
    else if (diff === 1) relativeText = "next year";
    else if (diff === -1) relativeText = "last year";
    else if (diff > 0) relativeText = `${diff} years from now`;
    else relativeText = `${Math.abs(diff)} years ago`;

    let milestone = "";
    if (year % 1000 === 0) milestone = "Millennium";
    else if (year % 100 === 0) milestone = "Turn of the Century";
    else if (year % 100 === 75) milestone = "Diamond Jubilee";
    else if (year % 100 === 50) milestone = "Golden Jubilee";
    else if (year % 100 === 25) milestone = "Silver Jubilee";
    else if (year % 10 === 0) milestone = "New Decade";

    return milestone ? `— ${milestone} • ${relativeText}` : `— ${relativeText}`;
}

export default function YearPageClient({ year, today }: { year: number; today: Date }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const monthRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const isCurrentYear = year === today.getFullYear();
        const currentMonthIndex = today.getMonth();

        if (isCurrentYear && monthRefs.current[currentMonthIndex]) {
            // Small timeout ensures the grid has fully rendered before calculating position
            const timer = setTimeout(() => {
                monthRefs.current[currentMonthIndex]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start", // Changes alignment from center to top
                });
            }, 150);

            return () => clearTimeout(timer);
        }
    }, [year, today]);

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <style>{`
                .header-wrapper { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
                .left-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .year-row { display: flex; align-items: center; gap: 0.75rem; margin: 0; font-size: 1.5rem; font-weight: 300; letter-spacing: 0.2em; opacity: 0.9; }
                .label-text { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.5; }
                .right-group { display: flex; align-items: center; gap: 0.5rem; }
                .main-layout { display: flex; flex-direction: column; gap: 2rem; }
                .calendar-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }

                @media (min-width: 768px) {
                    .header-wrapper { flex-direction: row; justify-content: space-between; align-items: center; }
                    .left-group { flex-direction: row; align-items: center; gap: 1rem; }
                    .main-layout { flex-direction: row; height: calc(100dvh - 8rem); overflow: hidden; }
                    .calendar-grid { grid-template-columns: repeat(2, 1fr); }
                }
            `}</style>

            <header className="header-wrapper">
                <div className="left-group">
                    <h1 className="year-row">
                        <HomeButton />
                        <YearSelector currentYear={year} />
                    </h1>
                    <span className="label-text">{yearLabel(year, today.getFullYear())}</span>
                </div>
                <div className="right-group">
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>Jump to Month</span>
                    <MonthSelector />
                </div>
            </header>

            <div className="main-layout">
                {/* Left side: month grids */}
                <div
                    ref={scrollContainerRef}
                    style={{ flex: "2", overflowY: "auto", paddingRight: "0.5rem", scrollBehavior: "smooth" }}
                >
                    <div className="calendar-grid">
                        {Array.from({ length: 12 }, (_, mi) => (
                            <div
                                key={mi}
                                ref={(el) => { monthRefs.current[mi] = el; }}
                            >
                                <MonthGrid
                                    month={mi + 1}
                                    monthName={MONTHS[mi]}
                                    year={year}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side: year details */}
                <div style={{ flex: "3", overflowY: "auto", paddingLeft: "1rem", borderLeft: "1px solid rgba(0,0,0,0.1)" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 300, letterSpacing: "0.2em", marginBottom: "1.5rem", opacity: 0.8 }}>
                        {year} — Overview
                    </h3>
                    <YearDetails year={year} />
                </div>
            </div>
        </div>
    );
}